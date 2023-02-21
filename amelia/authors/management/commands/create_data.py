from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'create test data for GB project'

    def handle(self, *args, **options):
        print('hello world')