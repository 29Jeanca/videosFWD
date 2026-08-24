from django.shortcuts import render
from .models import Event, UserEvent
from .serializers import EventSerializer, UserEventSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from users.authentication import CookieJWTAuthentication


class EventListCreateView(ListCreateAPIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class UserEventListCreateView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request):
       user = request.user
       title = request.data.get('title')
       description = request.data.get('description')
       date = request.data.get('date')
       color = request.data.get('color')

       user_event = UserEvent.objects.create(
           user=user,
           title=title,
           description=description,
           date=date,
           color=color
       )
       serializer = UserEventSerializer(user_event)
       return Response(serializer.data, status=status.HTTP_201_CREATED) 

    
    def get(self, request):
        user_events = UserEvent.objects.filter(user=request.user)
        serializer = UserEventSerializer(user_events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserEventDetailView(APIView):
    # Editar/borrar un evento personal — solo el dueño puede tocarlo (mismo
    # patrón de ownership que EditPostView/DeletePostView en community).
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):
        return UserEvent.objects.filter(id=pk, user=request.user).first()

    def patch(self, request, pk):
        user_event = self.get_object(request, pk)
        if user_event is None:
            return Response({"error": "Evento no encontrado o no autorizado"}, status=404)

        for field in ('title', 'description', 'date', 'color', 'fecha_inicio', 'fecha_fin'):
            if field in request.data:
                setattr(user_event, field, request.data.get(field))
        user_event.save()

        serializer = UserEventSerializer(user_event)
        return Response(serializer.data)

    def delete(self, request, pk):
        user_event = self.get_object(request, pk)
        if user_event is None:
            return Response({"error": "Evento no encontrado o no autorizado"}, status=404)

        user_event.delete()
        return Response({"message": "Evento eliminado correctamente"})


class UserEventsAllEventsView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_events = UserEvent.objects.filter(user=request.user)
        events = Event.objects.all()
        user_events_serializer = UserEventSerializer(user_events, many=True)
        events_serializer = EventSerializer(events, many=True)
        return Response(user_events_serializer.data + events_serializer.data, status=status.HTTP_200_OK)

