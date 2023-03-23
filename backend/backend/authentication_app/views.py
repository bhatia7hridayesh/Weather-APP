import json
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer
from rest_framework import permissions
import requests
# Create your views here.


class UserRegistration(CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]


class GetWeatherReport(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, query):
        res = requests.get(f"http://api.openweathermap.org/geo/1.0/direct?q={query}&limit=5&appid=ae11a1003e7a23b30f09b049a8143288")
        if res.json()[0]:
            data = res.json()[0]
            lat = data["lat"]
            lon = data["lon"]
            weather = requests.get(f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=ae11a1003e7a23b30f09b049a8143288")
            
            return Response(weather.json(), status=status.HTTP_200_OK)
        return Response("Enter a valid city/country name", status=status.HTTP_400_BAD_REQUEST)

        

class AddToFavourites(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        user = request.user
        favourite = request.data["Newfavourite"]
        if favourite in user.favourites:
            user.favourites.remove(favourite)
        else :
            user.favourites.append(favourite)
        user.save()
        return Response(user.favourites, status=status.HTTP_200_OK)
        

class GetFavourites(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(user.favourites, status=status.HTTP_200_OK)