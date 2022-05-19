import os
from os.path import join, dirname
from dotenv import load_dotenv
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

client = Client(os.environ.get('TWILIO_ACCOUNT_SID'),
                os.environ.get('TWILIO_AUTH_TOKEN'))
verify = client.verify.services(os.environ.get('TWILIO_VERIFY_SERVICE_SID'))


def send(phone):
    verify.verifications.create(to=phone, channel='sms')


def check(phone, code):
    try:
        result = verify.verification_checks.create(to=phone, code=code)
    except TwilioRestException:
        print('no')
        return False
    return result.status == 'approved'
