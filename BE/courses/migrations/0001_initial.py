
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('teacher', models.CharField(max_length=100)),
                ('module', models.CharField(choices=[('backend', 'Backend'), ('frontend', 'Frontend'), ('fullstack', 'Fullstack')], max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('tags', models.CharField(max_length=200)),
                ('video_url', models.URLField()),
            ],
        ),
    ]
