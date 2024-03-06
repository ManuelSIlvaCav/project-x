package jwt

import (
	"fmt"
	"net/http"
	"server/container"
	"time"

	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

// jwtCustomClaims are custom claims extending default ones.
// See https://github.com/golang-jwt/jwt for more examples
type JwtCustomClaims struct {
	Name  string `json:"name"`
	Admin bool   `json:"admin"`
	jwt.RegisteredClaims
}

func GetJWTConfig() echojwt.Config {
	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(JwtCustomClaims)
		},
		SigningKey: []byte("secret"), //TODO Get secret from config
		Skipper: func(c echo.Context) bool {
			// Skip authentication for health check and login
			if c.Path() == "/health" ||
				c.Path() == "/api/v1/auth/login" ||
				c.Path() == "/api/v1/users/register" {
				return true
			}
			return false
		},
	}
	return config
}

func AuthMiddleware(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtCustomClaims)
	name := claims.Name
	return c.String(http.StatusOK, "Welcome "+name+"!")
}

func CreateJwtToken(firstName string, lastName string) (t string, err error) {
	// Set custom claims
	claims := &JwtCustomClaims{
		fmt.Sprintf("%s %s", firstName, lastName),
		true,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 5)),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	return token.SignedString([]byte("secret"))

}

func verifyToken(container container.Container, tokenString string) error {
	//config := container.GetConfig()
	secretKey := "secret" // Implement from config

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil {
		return err
	}

	if !token.Valid {
		return fmt.Errorf("invalid token")
	}

	return nil
}
