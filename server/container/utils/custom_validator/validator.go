package custom_validator

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

type CustomValidator interface {
	ValidateStruct(s interface{}) (errs []ValidationError)
	GetValidator() *validator.Validate
}

type customValidator struct {
	validator *validator.Validate
}

func NewCustomValidator() *customValidator {
	customValidator := &customValidator{validator: validator.New()}
	return customValidator
}

func (cv *customValidator) GetValidator() *validator.Validate {
	return cv.validator
}

func (cv *customValidator) ValidateStruct(obj interface{}) (errs []ValidationError) {
	o := obj

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in Validate:", r)
			//errs = fmt.Errorf("can't validate %+v", r)
		}
	}()

	validationErrors := []ValidationError{}

	if err := cv.validator.Struct(o); err != nil {
		errorValid := err.(validator.ValidationErrors)
		for _, e := range errorValid {
			// snp  X.Y.Z
			snp := e.StructNamespace()
			errorMessage := errorTagFunc(obj, snp, e.Field(), e.ActualTag())

			println("Error message:", errorMessage)

			if errorMessage != nil {
				//errs = errors.Join(errs, fmt.Errorf("%w", errmgs))
				validationErrors = append(validationErrors, *errorMessage)
				continue
			}

			newValidationError := ValidationError{Field: e.Field(), Message: e.Error()}
			//errs = errors.Join(errs, fmt.Errorf("%w", e))
			validationErrors = append(validationErrors, newValidationError)
		}
	}

	if validationErrors != nil {
		return validationErrors
	}

	return nil
}

const tagCustom = "errormgs"

type ValidationError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

func errorTagFunc(obj interface{}, snp string, fieldname, actualTag string) *ValidationError {
	o := obj

	if !strings.Contains(snp, fieldname) {
		return nil
	}

	fieldArr := strings.Split(snp, ".")
	rsf := reflect.TypeOf(o)

	for i := 1; i < len(fieldArr); i++ {
		field, found := rsf.FieldByName(fieldArr[i])
		if !found {
			continue
		}
		if fieldArr[i] == fieldname {
			customMessage := field.Tag.Get(tagCustom)
			if customMessage != "" {
				// Save in a variable actualTag or fieldName if actualTag is empty
				tag := actualTag
				if tag == "" || tag == "required" {
					tag = fieldname
				}
				//return fmt.Errorf("%s: %s", tag, customMessage) //Here is where we return the error, we could abstract and return a custom Error
				return &ValidationError{Field: tag, Message: customMessage}
			}
			return nil
		}
		if field.Type.Kind() == reflect.Ptr {
			// If the field type is a pointer, dereference it
			rsf = field.Type.Elem()
		} else {
			rsf = field.Type
		}
	}
	return nil
}
