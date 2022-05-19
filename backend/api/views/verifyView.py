from api.verify import check
from rest_framework import authentication
from rest_framework.views import APIView
from api.serializers import VerifyCodeSerializer
from rest_framework.response import Response
from rest_framework.status import *

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
