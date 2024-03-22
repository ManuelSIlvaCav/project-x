package job_invites

import (
	interfaces "server/api/interfaces"
	"server/api/job_invites/handlers"
	"server/api/job_invites/repository"
	"server/container"
	"server/router"
)

type JobInvitesModule struct {
	JobInviteRepository               repository.JobInvitesRepository
	CandidateRecommendationRepository repository.CandidateRecommendationRepository
}

func NewJobInvitesModule(
	container *container.Container,
	router *router.Router) *JobInvitesModule {
	jobInviteRepository := repository.NewJobInvitesRepository(container)
	candidateRecommendationRepository := repository.NewCandidateRecommendationRepository(container)

	setJobInvitesRoutes(container, router, jobInviteRepository)
	setCandidateRecommendationRoutes(container, router, candidateRecommendationRepository)

	return &JobInvitesModule{
		JobInviteRepository:               jobInviteRepository,
		CandidateRecommendationRepository: candidateRecommendationRepository,
	}
}

func setJobInvitesRoutes(
	container *container.Container,
	router *router.Router,
	jobInviteRepository repository.JobInvitesRepository,
) {
	routes := []interfaces.Route{}

	routes = append(routes,
		router.BuildRoute("POST", "", handlers.CreateJobInvite(container, jobInviteRepository)),
	)

	router.SetRoutes("/job-invites", routes)
}

func setCandidateRecommendationRoutes(
	container *container.Container,
	router *router.Router,
	candidateRecommendationRepository repository.CandidateRecommendationRepository,
) {
	routes := []interfaces.Route{}

	routes = append(routes,
		router.BuildRoute("POST", "", handlers.RecommendCandidate(container, candidateRecommendationRepository)),
		router.BuildRoute("GET", "", handlers.CandidateRecommendations(container, candidateRecommendationRepository)),
	)

	router.SetRoutes("/candidate-recommendation", routes)
}
