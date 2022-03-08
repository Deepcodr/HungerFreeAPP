from django.shortcuts import render 
from django.contrib.auth.models import User
from django.http import HttpResponse

def home(request,id=0):
    if request.method=='GET':
        return render(request,'index.html')

def userprofile(request,id=0):
    if request.method=='GET':
        return render(request,'userprofile.html')

def about(request,id=0):
    if request.method=='GET':
        return render(request,'about.html')

def signup(request,id=0):
    if request.method=='GET':
        return render(request,'registration/signup.html')
    elif request.method=='POST':
        firstname=request.POST.get('firstname',None)
        lastname=request.POST.get('lastname',None)
        username=request.POST.get('username',None)
        password=request.POST.get('password',None)
        email=request.POST.get('email',None)
        user=User.objects.create_user(username,email=email,password=password)
        user.first_name=firstname
        user.last_name=lastname
        user.save()
        return render(request,'index.html') 