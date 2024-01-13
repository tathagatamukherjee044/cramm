package route

import "StraightAceServer/internal/server"

func RegisterFiberRoutes(s *server.FiberServer) {

	publicRouter := s.App.Group("")
	AddAuthRouter(publicRouter)
	AddQuizRouter(publicRouter)
	AddSwaggerRoutes(publicRouter)

}
