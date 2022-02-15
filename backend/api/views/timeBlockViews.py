from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.serializers import IndividualTimeBlockSerializer, ActiveTimeBlockSerializer, RecurringTimeBlockSerializer, RecurringTimeBlockSettingSerializer
from api.models import IndividualTimeBlock, ActiveTimeBlock, RecurringTimeBlock, RecurringTimeBlockSetting
from rest_framework.response import Response
from rest_framework.status import *


class IndividualTimeBlockView(APIView):
    serializer_class = IndividualTimeBlockSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        pass


class TimeBlocks(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        time_blocks = []
        individual_time_blocks = IndividualTimeBlock.objects.filter(
            user_id=request.user.id)
        recurring_time_blocks = RecurringTimeBlock.objects.filter(
            user_id=request.user.id)
        time_blocks.append(IndividualTimeBlockSerializer(
            individual_time_blocks, many=True).data)
        time_blocks.append(RecurringTimeBlockSerializer(
            recurring_time_blocks, many=True).data)
        return Response(time_blocks, status=HTTP_200_OK)
