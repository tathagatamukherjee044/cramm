package route

import "crammServer/internal/server"

func RegisterFiberRoutes(s *server.FiberServer) {

	publicRouter := s.App.Group("/api")
	AddAuthRouter(publicRouter)
	AddQuizRouter(publicRouter)
	AddUserRouter(publicRouter)
	AddSubjectRouter(publicRouter)
	AddSwaggerRoutes(publicRouter)

}
