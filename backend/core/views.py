from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework import status
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from .models import *
from .serializer import *
from django.conf import settings
from django.http import FileResponse
import os,subprocess
token = "ioka1J8wcPhq5aWk8sC9OvZNOb7Jzf7LEgDQlAk7W1Zrm9bwm_0pQMzrur8igXPk42XDlE5T4QXMDNpGlgEQFA=="
org = "dblab"
bucket = "bucket"
# Create your views here.
  
class ReactView(APIView):
    
    serializer_class = ReactSerializer
  
    def get(self, request):
        detail = [ {"name": detail.name,"detail": detail.detail} for detail in React.objects.all()]
        return Response(detail)
  
    def post(self, request):
  
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)

class AbcdView(APIView):

    def get(self, request, id):
        print(id)
        return Response(status=status.HTTP_200_OK)

class DetailView(APIView):
    def get(self,request,country,type,variant,start,end):
        with InfluxDBClient(url="http://127.0.0.1:8086", token=token, org=org) as client:
            query_api=client.query_api()
            query='from(bucket: "bucket")\
                |> range(start:{})\
                |> filter(fn:(r)=>r._measurement=="CovidStats")\
                |> filter(fn:(r)=>r.country=="{}" and r.variant=="{}" and r._field=="{}")'.format(start,country,variant,type)
            res=query_api.query(org=org,query=query)
            results = []
            for table in res:
                for record in table.records:
                    results.append((record.get_value(), record.get_field()))
            print(results)
        return Response(status=status.HTTP_200_OK)

