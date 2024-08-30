from django.db import models

# Create your models here.

class Booking(models.Model):
  title = models.CharField(max_length=200)
  completed = models.BooleanField(default=False, blank=True, null=True)
      
  def __str__(self):
    return self.title
  

class Laboratory(models.Model):
  LabName = models.CharField(max_length=150)
  collegeCourse = models.ManyToManyField('CollegeCourse', related_name='collegeCourse')
  status = models.CharField(max_length=50)
  Block = models.CharField(max_length=15)
  Capacity = models.CharField(max_length=50)
  
  
  def __str__(self):
    return self.LabName

class CollegeCourse(models.Model):
  course = models.CharField(max_length=20)
  
  def __str__(self):
    return self.course

class CollegeHour(models.Model):
  hour= models.TimeField()
  
  def __str__(self):
    return self.hour


class Institute(models.Model):
  name = models.CharField(max_length=120)
  logo = models.ImageField(upload_to='media/uploads', blank=True)