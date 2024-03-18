package emails_model

import "time"

type (
	EmailTemplate struct {
		ID            string      `json:"id" bson:"_id,omitempty"`
		Name          string      `json:"name" bson:"name,omitempty" validate:"required" errormgs:"Name is required"`
		Subject       string      `json:"subject" bson:"subject,omitempty" validate:"required" errormgs:"Subject is required"`
		DesignContent interface{} `json:"designContent" bson:"designContent,omitempty" validate:"required" errormgs:"Design content is required"`
		HtmlContent   string      `json:"htmlContent" bson:"htmlContent,omitempty" validate:"required" errormgs:"Html content is required"`
		CreatedAt     time.Time   `json:"createdAt" bson:"createdAt,omitempty"`
	}
)
