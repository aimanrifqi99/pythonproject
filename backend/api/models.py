from django.db import models
from django.contrib.auth.models import User


class AimGameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=150)
    email = models.EmailField()
    score = models.IntegerField()
    date_and_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"AimGameScore: {self.username} - {self.score}"


class TypingGameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=150)
    email = models.EmailField()
    score = models.FloatField()
    date_and_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"TypingGameScore: {self.username} - {self.score}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Additional fields like bio, avatar, etc.

    def __str__(self):
        return f"Profile: {self.user.username}"
