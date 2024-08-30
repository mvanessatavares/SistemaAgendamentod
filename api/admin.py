from django.contrib import admin

# Register your models here.

from .models import Booking, Laboratory, CollegeCourse, CollegeHour, Institute

admin.site.register(Booking)

admin.site.register(Laboratory)

admin.site.register(CollegeCourse)

admin.site.register(CollegeHour)

admin.site.register(Institute)