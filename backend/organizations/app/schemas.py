from pydantic import BaseModel
from typing import Optional, List
from models import Organization, GarbageType, Address
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise import Tortoise

Tortoise.init_models(["models"], "models")

OrganizationPydanticFull = pydantic_model_creator(Organization,
                                                  name='OrganizationFull')
OrganizationPydantic = pydantic_model_creator(Organization,
                                              name="Organization",
                                              exclude={'password', 'login'})

GarbageTypePydantic = pydantic_model_creator(GarbageType,
                                             name="GarbageType",
                                             exclude={'organizations'})
GarbageTypeInPydantic = pydantic_model_creator(GarbageType,
                                               name="GarbageTypeIn",
                                               exclude={'id', 'organizations'})

AddressPydantic = pydantic_model_creator(
    Address, name="Address", exclude={'organization', 'organization_id'})


class OrganizationInPydantic(BaseModel):
    name: str
    login: str
    password: str
    site: Optional[str] = None
    phone_number: Optional[str] = None
    description: Optional[str] = None
    rating: float
    address: AddressPydantic
    garbage_type_ids: Optional[List[int]] = []

class OrganizationPydanticPatchScheme(BaseModel):
    name: Optional[str] = None
    login: Optional[str] = None
    password: Optional[str] = None
    site: Optional[str] = None
    phone_number: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    address: Optional[AddressPydantic] = None
    garbage_type_ids: Optional[List[int]] = None
