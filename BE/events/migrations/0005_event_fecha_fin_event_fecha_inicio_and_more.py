
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_remove_userevent_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='fecha_fin',
            field=models.DateTimeField(default='2025-11-28'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='fecha_inicio',
            field=models.DateTimeField(default='2025-11-28'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userevent',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default='2025-11-28'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userevent',
            name='fecha_fin',
            field=models.DateTimeField(default='2025-11-28'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userevent',
            name='fecha_inicio',
            field=models.DateTimeField(default='2025-11-28'),
            preserve_default=False,
        ),
    ]
