
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_alter_event_fecha_fin_alter_event_fecha_inicio_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='userevent',
            name='date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
