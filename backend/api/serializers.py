from rest_framework import serializers
from .models import AimGameScore, TypingGameScore
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class AimGameScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = AimGameScore
        fields = '__all__'
        read_only_fields = ('user', 'username', 'email')


class TypingGameScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypingGameScore
        fields = '__all__'
        read_only_fields = ('user', 'username', 'email')
