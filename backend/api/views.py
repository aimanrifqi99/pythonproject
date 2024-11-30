from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer, AimGameScoreSerializer, TypingGameScoreSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from .models import AimGameScore, TypingGameScore
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import filters
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend


class TenResultsSetPagination(PageNumberPagination):
    page_size = 10


class AimGameScoreViewSet(viewsets.ModelViewSet):
    queryset = AimGameScore.objects.all()
    serializer_class = AimGameScoreSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = LimitOffsetPagination
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['score', 'date_and_time']
    ordering = ['-score']
    filterset_fields = ['user']

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            username=self.request.user.username,
            email=self.request.user.email
        )


class TypingGameScoreViewSet(viewsets.ModelViewSet):
    queryset = TypingGameScore.objects.all()
    serializer_class = TypingGameScoreSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = LimitOffsetPagination
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['score', 'date_and_time']
    ordering = ['-score']
    filterset_fields = ['user']

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            username=self.request.user.username,
            email=self.request.user.email
        )


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
