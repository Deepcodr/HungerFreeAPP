from django.urls import path,include,re_path
from requests import views
from django.conf.urls.static import static
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

urlpatterns=[
    path('',views.requestpage),
    path('donations/',views.donations),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('imgdata/favicon.ico')))
]