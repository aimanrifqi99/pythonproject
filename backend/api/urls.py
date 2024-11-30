from django.urls import path, include
from rest_framework import routers
from .views import AimGameScoreViewSet, TypingGameScoreViewSet, CurrentUserView

router = routers.DefaultRouter()
router.register(r'aim-game-scores', AimGameScoreViewSet)
router.register(r'typing-game-scores', TypingGameScoreViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/me/', CurrentUserView.as_view(), name='current-user'),
]
