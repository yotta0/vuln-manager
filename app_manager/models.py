from django.db import models
from users.models import CustomUser
from users.views import add_user_activity

class HostsGroup(models.Model):
    created_by = models.ForeignKey(CustomUser, null=True, related_name='hosts_group', on_delete=models.SET_NULL)
    name = models.CharField(max_length=100, unique=True)
    belongs_to = models.ForeignKey('self', null=True, related_name='group_relations', on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at', )
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.old_name = self.name

    def save(self, *args, **kwargs):
        action = f'added new group - "{self.name}"'
        if self.pk is not None:
            action = f'updated group from - "{self.old_name}" to "{self.name}"'
        super().save(*args, **kwargs)
        add_user_activity(self.created_by, action)
    
    def delete(self, *args, **kwargs):
        created_by = self.created_by
        action = f'deleted group - "{self.name}"'
        super().delete(*args, **kwargs)
        add_user_activity(created_by, action)
    
    def __str__(self):
        return self.name


class Hosts(models.Model):
    created_by = models.ForeignKey(
        CustomUser, null=True, related_name='hosts_grou´', on_delete=models.SET_NULL
    )
    code = models.CharField(max_length=10, unique=True, null=True)
    group = models.ForeignKey(HostsGroup, null=True, related_name='hosts', on_delete=models.SET_NULL)
    total = models.PositiveIntegerField()
    remaining = models.PositiveIntegerField(null=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at', )

    def save(self, *args, **kwargs):
        is_new = self.pk is None

        if is_new:
            self.remaining = self.total
        
        super().save(*args, **kwargs)

        if is_new:
            id_length = len(str(self.id))
            code_length = 6 - id_length
            zeros = "".join('0' for i in range(code_length))
            self.code = f'HOST{zeros}{self.id}'
            self.save()
        
        action = f'added new host - "{self.code}"'
        if not is_new:
            action = f'updated host - "{self.code}"'
        
        add_user_activity = self.created_by, action

    def delete(self, *args, **kwargs):
        created_by = self.created_by
        action = f'deleted host - "{self.code}"'
        super().delete(*args, **kwargs)
        add_user_activity(created_by, action)
    
    def __str__(self):
        return f'{self.name} - {self.code}'