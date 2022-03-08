from django.shortcuts import render
import rest_framework

# Create your views here

def sharepage(request,id=0):
    if request.method=='GET':
        return render(request,'sharepage.html')

def requests(request,id=0):
    if request.method=='GET':
        return render(request,'requests.html')