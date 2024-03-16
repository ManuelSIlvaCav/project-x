package custom_validator

import (
	"errors"
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

type CustomValidator interface {
	ValidateStruct(s interface{}) (errs error)
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

func (cv *customValidator) ValidateStruct(obj interface{}) (errs error) {
	o := obj

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in Validate:", r)
			errs = fmt.Errorf("can't validate %+v", r)
		}
	}()

	if err := cv.validator.Struct(o); err != nil {
		errorValid := err.(validator.ValidationErrors)
		for _, e := range errorValid {
			// snp  X.Y.Z
			snp := e.StructNamespace()
			errmgs := errorTagFunc(obj, snp, e.Field(), e.ActualTag())

			if errmgs != nil {
				errs = errors.Join(errs, fmt.Errorf("%w", errmgs))
			} else {
				errs = errors.Join(errs, fmt.Errorf("%w", e))
			}
		}
	}

	if errs != nil {
		return errs
	}

	return nil
}

const tagCustom = "errormgs"

func errorTagFunc(obj interface{}, snp string, fieldname, actualTag string) error {
	o := obj

	if !strings.Contains(snp, fieldname) {
		return nil
	}

	fieldArr := strings.Split(snp, ".")
	rsf := reflect.TypeOf(o)

	for i := 1; i < len(fieldArr); i++ {
		field, found := rsf.FieldByName(fieldArr[i])
		if found {
			if fieldArr[i] == fieldname {
				customMessage := field.Tag.Get(tagCustom)
				if customMessage != "" {
					return fmt.Errorf("%s: %s", actualTag, customMessage) //Here is where we return the error, we could abstract and return a custom Error
				}
				return nil
			} else {
				if field.Type.Kind() == reflect.Ptr {
					// If the field type is a pointer, dereference it
					rsf = field.Type.Elem()
				} else {
					rsf = field.Type
				}
			}
		}
	}
	return nil
}
