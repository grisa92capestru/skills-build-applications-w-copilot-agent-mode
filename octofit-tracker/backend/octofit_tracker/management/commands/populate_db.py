from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='marvel')
        dc = Team.objects.create(name='dc')

        # Create users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team='marvel')
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team='marvel')
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team='dc')
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team='dc')

        # Create activities
        Activity.objects.create(user=tony.name, type='run', duration=30, date='2023-01-01')
        Activity.objects.create(user=steve.name, type='cycle', duration=45, date='2023-01-02')
        Activity.objects.create(user=bruce.name, type='swim', duration=60, date='2023-01-03')
        Activity.objects.create(user=clark.name, type='run', duration=25, date='2023-01-04')

        # Create leaderboard
        Leaderboard.objects.create(team='marvel', points=150)
        Leaderboard.objects.create(team='dc', points=120)

        # Create workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        Workout.objects.create(name='Squats', description='Do 30 squats', difficulty='medium')
        Workout.objects.create(name='Plank', description='Hold plank for 1 min', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
