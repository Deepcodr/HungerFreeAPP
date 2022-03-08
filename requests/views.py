from django.shortcuts import render
import rest_framework
from django.conf import settings

# Create your views here.
def requestpage(request,id=0):
    if request.method=='GET':
        return render(request,'requestpage.html')

def donations(request,id=0):
    if request.method=='GET':
        return render(request,'donations.html')
