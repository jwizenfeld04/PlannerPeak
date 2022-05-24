from api.verify import check
from rest_framework import authentication
from rest_framework.views import APIView
from api.serializers import VerifyCodeSerializer
from rest_framework.response import Response
from rest_framework.status import *
from api.verify import send

# ... no changes to index() and register() view functions


class VerifyPhoneView(APIView):
    serializer_class = VerifyCodeSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            code = serializer.data.get('code')
            if check(request.user.phone, code):
                request.user.is_phone_verified = True
                request.user.save()
                return Response({"Success": "Verified Code"}, status=HTTP_201_CREATED)
        return Response({"Error": "Invalid Verify Code"}, status=HTTP_400_BAD_REQUEST)


class ResendVerifyView(APIView):
    serializer_class = VerifyCodeSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        try:
            send(request.user.phone)
            return Response({"Success": "Verified Code"}, status=HTTP_200_OK)
        except:
            return Response({"Error": "Resend Code Error"}, status=HTTP_400_BAD_REQUEST)
