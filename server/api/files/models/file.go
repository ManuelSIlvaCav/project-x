package files_model

type (
	File struct {
		ID   string `json:"id" bson:"_id,omitempty"`
		Name string `json:"name" bson:"name"`
		Size int64  `json:"size" bson:"size"`
		Type string `json:"type" bson:"type,omitempty"`
		URL  string `json:"url" bson:"url"`
	}
)
