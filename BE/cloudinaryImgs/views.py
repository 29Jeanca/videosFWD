from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import cloudinary.uploader

@api_view(["POST"])
def upload_image(request):
    if "image" not in request.FILES:
        return Response(
            {"error": "No image provided"},
            status=status.HTTP_400_BAD_REQUEST
        )

    result = cloudinary.uploader.upload(
        request.FILES["image"],
        folder="uploads"
    )

    return Response(
        {
            "url": result["secure_url"],
            "public_id": result["public_id"]
        },
        status=status.HTTP_200_OK
    )
