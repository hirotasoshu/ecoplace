import os
from typing import List

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from tortoise.contrib.fastapi import HTTPNotFoundError, register_tortoise

from models import Address, GarbageType, Organization
from schemas import (GarbageTypeInPydantic, GarbageTypePydantic,
                     OrganizationInPydantic, OrganizationPydantic,
                     OrganizationPydanticFull, OrganizationPydanticPatchScheme)

DB_URL = os.environ.get('DATABASE_URI')
app = FastAPI(docs_url="/docs/organizations",
              redoc_url="/redoc/organizations",
              openapi_url='/api/organizations/openapi.json')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/organizations/token")


# this doesn't provide any security at all
# TODO: replace this with jwt token
async def fake_decode_token(token):
    return await Organization.get_or_none(login=token)


async def get_current_organization(token: str = Depends(oauth2_scheme)):
    organization = await fake_decode_token(token)
    if not organization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return organization


@app.post('/api/organizations/token')
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    organization = await Organization.get_or_none(login=form_data.username)
    if not organization:
        raise HTTPException(status_code=400, detail="Incorrect login")
    if not form_data.password == organization.password:
        raise HTTPException(status_code=400, detail="Incorrect password")

    return {"access_token": organization.login, "token_type": "bearer"}


@app.get("/api/organizations/me", response_model=OrganizationPydanticFull)
async def read_organizations_me(current_organization: Organization = Depends(
    get_current_organization)):
    return await OrganizationPydanticFull.from_tortoise_orm(
        current_organization)


@app.post('/api/organizations/garbage_types',
          response_model=GarbageTypePydantic)
async def create_garbage_type(garbage_type: GarbageTypeInPydantic):
    data = garbage_type.dict()
    garbage_type_obj = await GarbageType.create(**data)
    return await GarbageTypePydantic.from_tortoise_orm(garbage_type_obj)


@app.post("/api/organizations/register", response_model=OrganizationPydantic)
async def create_organization(organization: OrganizationInPydantic):
    garbage_types = []
    for id in organization.garbage_type_ids:
        garbage_type = await GarbageType.get(id=id)
        garbage_types.append(garbage_type)
    data = organization.dict(exclude_unset=True,
                             exclude={'address', 'garbage_type_ids'})
    org_obj = await Organization.create(**data)
    await org_obj.garbage_types.add(*garbage_types)
    await Address.create(**organization.address.dict(),
                         organization_id=org_obj.id)

    return await OrganizationPydantic.from_tortoise_orm(org_obj)


@app.patch("/api/organizations/me", response_model=OrganizationPydanticFull)
async def update_organizations_me(
    patch_scheme: OrganizationPydanticPatchScheme,
    current_organization: Organization = Depends(get_current_organization)):
    if patch_scheme.garbage_type_ids is not None:
        await current_organization.garbage_types.clear()

        garbage_types = []
        for id in patch_scheme.garbage_type_ids:
            garbage_type = await GarbageType.get(id=id)
            garbage_types.append(garbage_type)
            await current_organization.garbage_types.add(*garbage_types)

    if patch_scheme.address:
        await current_organization.address.update(
            **patch_scheme.address.dict())

    data = patch_scheme.dict(exclude_unset=True,
                             exclude={'garbage_type_ids', 'address'})

    await current_organization.update_from_dict(data)
    return await OrganizationPydanticFull.from_tortoise_orm(
        current_organization)


@app.get("/api/organizations", response_model=List[OrganizationPydantic])
async def list_organizations():
    return await OrganizationPydantic.from_queryset(Organization.all())


@app.get("/api/organizations/{organization_id}",
         response_model=OrganizationPydantic,
         responses={404: {
             "model": HTTPNotFoundError
         }})
async def get_user(organization_id: int):
    return await OrganizationPydantic.from_queryset_single(
        Organization.get(id=organization_id))


register_tortoise(
    app,
    db_url=DB_URL,
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
