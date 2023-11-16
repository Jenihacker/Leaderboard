from django.db import models

# Create your models here.
class Board(models.Model):
    TeamNumber = models.IntegerField(primary_key=True)
    Name = models.CharField(max_length=30)
    Points  = models.IntegerField()
    Credits = models.IntegerField()