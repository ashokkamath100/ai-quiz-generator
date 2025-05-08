from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from starlette import status
from backend.db import get_database 
#from .models import Users
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

# Constants
SECRET_KEY = '197b2c37c391bed93fe80344fe73b806947a65e36206e05a1a23c2fa12702fe3'
ALGORITHM = 'HS256'
MONGO_URI = "mongodb://localhost:27017"
COLLECTION_NAME = "users"

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')


class CreateUserRequest(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str


def get_db():
    db = get_database() 
    return db 

async def get_users_collection():
    db = await get_db()
    return db[COLLECTION_NAME]


#db_dependency = Annotated[Session, Depends(get_db)]


async def authenticate_user(email: str, password: str):
    print("authenticate_user called")  # Log that the function was called
    print(f"Attempting to authenticate user with email: {email}")

    users_collection = await get_users_collection()
    print("Connected to users collection in the database")

    # Find the user with the provided email
    user = await users_collection.find_one({"email": email})
    if not user:
        print(f"No user found with email: {email}")
        return False

    print(f"User found: {user}")  # Log the user document (sensitive fields can be removed in production)

    # Compare the provided password with the stored hashed password
    if not bcrypt_context.verify(password, user['hashed_password']):
        print("Password check failed: Provided password does not match stored password")
        print('provided password: ' + password) 
        return False

    print("Password check passed: User authenticated successfully")
    return user




def create_access_token(email: str, expires_delta: timedelta):
    encode = {'sub': email}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get('sub')
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
        user = await get_users_collection().find_one({"email": email})
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User not found.')
        return user
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')




@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(create_user_request: CreateUserRequest):
    users_collection = (await get_database())['users']
    print('users_collection: ' + str(users_collection))
    print('createuserrequest: email: ' + str(create_user_request.email) + ' password: ' + create_user_request.password)
    existing_user = await users_collection.find_one({"email": create_user_request.email})
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_password = bcrypt_context.hash(create_user_request.password)
    user_doc = {
        "email": create_user_request.email,
        "hashed_password": hashed_password,
        "is_active": True
    }
    await users_collection.insert_one(user_doc)
    return {"message": "User created successfully"}


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid email or password.')

    token = create_access_token(user['email'], timedelta(minutes=20))
    return {'access_token': token, 'token_type': 'bearer'}







