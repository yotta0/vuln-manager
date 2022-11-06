import jwt
from datetime import datetime, timedelta

from django.conf import settings

def get_access_token(payload, expire_days):
    token = jwt.encode(
        {
            'exp': datetime.now() + timedelta(days=expire_days),
            **payload,
        },
        settings.SECRET_KEY,
        algorithm='HS256'
    )
    return token
