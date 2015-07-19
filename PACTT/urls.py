from django.conf.urls import patterns, url, include

from rest_framework_nested import routers

from PACTT.views import IndexView
from authentication.views import AccountViewSet, LoginView, LogoutView
from posts.views import AccountPostsViewSet, PostViewSet
from planner.views import *

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)
router.register(r'events', EventViewSet)
router.register(r'test_phases', TestPhaseViewSet)
router.register(r'apps', AppViewSet)
router.register(r'scopes', ScopeViewSet)
router.register(r'test_results', TestResultViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)
accounts_router.register(r'assignments', AccountAssignmentsViewSet)

events_router = routers.NestedSimpleRouter(
    router, r'events', lookup='event'
)
events_router.register(r'test_phases', EventTestPhasesViewSet)

scopes_router = routers.NestedSimpleRouter(
    router, r'events', lookup='event'
)
scopes_router.register(r'scopes', EventScopesViewSet)

testResults_router = routers.NestedSimpleRouter(
    router, r'test_phases', lookup='testPhase'
)
testResults_router.register(r'test_results', TestPhaseTestResultsViewSet)

urlpatterns = patterns(
    '',
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/', include(events_router.urls)),
    url(r'^api/v1/', include(scopes_router.urls)),
    url(r'^api/v1/', include(testResults_router.urls)),
    
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    url('^.*$', IndexView.as_view(), name='index'),
)
