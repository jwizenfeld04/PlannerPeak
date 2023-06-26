from django.shortcuts import redirect, render
from api.verify import check
from rest_framework import authentication
from rest_framework.views import APIView
from api.serializers import VerifyCodeSerializer
from rest_framework.response import Response
from rest_framework.status import *
from api.verify import send
from dj_rest_auth.views import LoginView
from api.models import CustomUser
from rest_framework.authtoken.models import Token
from django.views.generic.edit import FormView
from django.views.generic.base import TemplateView
from dj_rest_auth.views import PasswordResetConfirmView
from api.forms import ResetPasswordForm
from rest_framework.renderers import TemplateHTMLRenderer
from django.http import HttpResponse


# Send a boolean with phone_verified to redirect to right nav page in frontend
class PhoneVerificationLoginView(LoginView):
    def get_response(self):
        orginal_response = super().get_response()
        tokens = Token.objects.get(key=orginal_response.data['key'])
        user = CustomUser.objects.get(email=tokens.user)
        mydata = {"verified": user.verified}
        orginal_response.data.update(mydata)
        return orginal_response


class VerifyPhoneView(APIView):
    serializer_class = VerifyCodeSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            code = serializer.data.get('code')
            if check(request.user.phone, code):
                request.user.verified = True
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


class CustomPasswordResetConfirmView(PasswordResetConfirmView, FormView):

    template_name = "password_reset_form.html"
    renderer_classes = [TemplateHTMLRenderer]
    form_class = ResetPasswordForm

    def get(self, request, **kwargs):
        return Response({'uid': kwargs['uidb64'], 'token': kwargs['token'], 'form': self.form_class})

    # def post(self, request, **kwargs):
    #     print(request.__dict__)
    #     super().post(request)
    #     return render('password_reset_done.html')
