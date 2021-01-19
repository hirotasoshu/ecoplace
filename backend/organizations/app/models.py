from tortoise import fields, models


class Organization(models.Model):

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=50)
    login = fields.CharField(max_length=20, unique=True)
    site = fields.CharField(max_length=64, null=True)
    phone_number = fields.CharField(max_length=12, null=True)
    description = fields.TextField(null=True)
    password = fields.CharField(max_length=128)
    rating = fields.FloatField(default=0.0)

    garbage_types: fields.ManyToManyRelation[
        "GarbageType"] = fields.ManyToManyField("models.GarbageType",
                                                related_name="organizations")


class Address(models.Model):
    street = fields.CharField(max_length=128)
    house = fields.CharField(max_length=15)
    office = fields.CharField(max_length=15)
    width = fields.FloatField()
    longtitude = fields.FloatField()

    organization: fields.OneToOneRelation[Organization] = fields.OneToOneField(
        'models.Organization',
        on_delete=fields.CASCADE,
        related_name='address',
        pk=True)


class GarbageType(models.Model):
    id = fields.IntField(pk=True)
    code = fields.CharField(max_length=10)
    name = fields.CharField(max_length=64)

    organizations: fields.ManyToManyRelation[Organization]


