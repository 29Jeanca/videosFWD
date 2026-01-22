
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0005_event_fecha_fin_event_fecha_inicio_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='fecha_fin',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='fecha_inicio',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='userevent',
            name='fecha_fin',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='userevent',
            name='fecha_inicio',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
