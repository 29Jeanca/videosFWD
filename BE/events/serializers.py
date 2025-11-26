from .models import Event, UserEvent
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class UserEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEvent
        fields = "__all__"