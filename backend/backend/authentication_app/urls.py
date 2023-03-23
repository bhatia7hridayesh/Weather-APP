from django.urls import path, include
from .views import AddToFavourites, UserRegistration, GetWeatherReport, GetFavourites
urlpatterns = [
    path("registration/", UserRegistration.as_view()),
    path("get-weather/<str:query>/", GetWeatherReport.as_view()),
    path("add-favourite/", AddToFavourites.as_view()),
    path("favourites/", GetFavourites.as_view())
]
