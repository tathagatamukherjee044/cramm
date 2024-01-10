package route

import "StraightAceServer/internal/server"

func RegisterFiberRoutes(s *server.FiberServer) {

	publicRouter := s.App.Group("")
	NewAuthRouter(publicRouter)

}
