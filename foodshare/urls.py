from django.urls import path,include
from foodshare import views
from django.conf.urls.static import static
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

urlpatterns=[
    path('',views.sharepage),
    path('requests/',views.requests),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('imgdata/favicon.ico')))
]