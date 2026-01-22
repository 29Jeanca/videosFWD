
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_color_event_userevent_color_event'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='color_event',
            new_name='color',
        ),
        migrations.RenameField(
            model_name='userevent',
            old_name='color_event',
            new_name='color',
        ),
    ]
