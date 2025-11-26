from django.urls import path
from .views import EventListCreateView, UserEventListCreateView, UserEventsAllEventsView

urlpatterns = [
    path('create-event/', EventListCreateView.as_view(), name='event-list-create'),
    path('user-events/', UserEventListCreateView.as_view(), name='user-event-list-create'),
    path('all-events/', UserEventsAllEventsView.as_view(), name='user-events-all-events'),
]