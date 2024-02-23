package files_model

type (
	File struct {
		ID   string `json:"id"`
		Name string `json:"name"`
		Size int64  `json:"size"`
		Type string `json:"type"`
		URL  string `json:"url"`
	}
)
