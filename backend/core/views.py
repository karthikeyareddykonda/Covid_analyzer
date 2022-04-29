from dataclasses import replace
from http.client import HTTPResponse
import json
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
from django.shortcuts import  render, redirect
from .forms import NewUserForm
from django.contrib.auth.forms import AuthenticationForm 
from django.contrib.auth import login, authenticate
token = "ioka1J8wcPhq5aWk8sC9OvZNOb7Jzf7LEgDQlAk7W1Zrm9bwm_0pQMzrur8igXPk42XDlE5T4QXMDNpGlgEQFA=="
org = "dblab"
bucket = "bucket"
# Create your views here.

def register_request(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful." )
            return redirect("main:homepage")
        messages.error(request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render (request=request, template_name="main/register.html", context={"register_form":form})

def login_request(request):
	if request.method == "POST":
		form = AuthenticationForm(request, data=request.POST)
		if form.is_valid():
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request, user)
				messages.info(request, f"You are now logged in as {username}.")
				return redirect("main:homepage")
			else:
				messages.error(request,"Invalid username or password.")
		else:
			messages.error(request,"Invalid username or password.")
	form = AuthenticationForm()
	return render(request=request, template_name="main/login.html", context={"login_form":form})
  
  
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
        print(end)
        if(end==start):
            end='2052-04-10T18:30:00.000Z'
        else:
            end=end[1:]
            end=end[:-1]
        start=start[1:]
        start=start[:-1]
        coun=country.split(',')
        coun=coun[:-1]
        print(coun)
        fin=dict()
        with InfluxDBClient(url="http://127.0.0.1:8086", token=token, org=org) as client:
            query_api=client.query_api()
            for c in coun:
                if(variant=="all"):
                    query='from(bucket: "bucket")\
                        |> range(start: {}, stop: {})\
                        |> filter(fn: (r) => r["_measurement"] == "CovidStats")\
                        |> filter(fn: (r) => r["_field"] == "{}")\
                        |> filter(fn :(r) => r["country"] == "{}")\
                        |> group(columns: ["_measurement","country","_time"])\
                        |> sum(column: "_value")'.format(start,end,type,c)
                else:
                        query='from(bucket: "bucket")\
                        |> range(start:{},stop:{})\
                        |> filter(fn:(r)=>r._measurement=="CovidStats")\
                        |> filter(fn:(r)=>r.country=="{}" and r.variant=="{}" and r._field=="{}")'.format(start,end,c,variant,type)
                res=query_api.query(org=org,query=query)
                results = []
                for table in res:
                    for record in table.records:
                        results.append(record.get_value())
                fin[c]=results
        obj=json.dumps(fin)    
        return Response(obj)

class MapView(APIView):
    def get(self,request,start):
        with InfluxDBClient(url='http://127.0.0.1:8086',token=token,org=org) as client:
            query_api=client.query_api()
            start=start[1:]
            start=start[:-1]
            query='from(bucket: "bucket")\
                |> range(start: {}, stop: 2052-04-10T18:30:00.000Z)\
                |> filter(fn: (r) => r["_measurement"] == "CovidStats")\
                |> filter(fn: (r) => r["_field"] == "new_cases")\
                |> group(columns: ["_measurement" ,"country", "_field"])\
                |>sum()'.format(start)
            res=query_api.query(org=org,query=query)
            results=[]
            for table in res:
                for record in  table.records:
                    results.append([record.values.get("country"),record.get_value()])
    
        obj=json.dumps(results)
        return Response(obj)

class PieChar(APIView):
    def get(self,request):
        with InfluxDBClient(url='http://127.0.0.1:8086',token=token,org=org) as client:
            query_api=client.query_api()
            query='from(bucket: "bucket")\
                |> range(start: 2002-04-10T18:30:00.000Z, stop: 2052-04-10T18:30:00.000Z)\
                |> filter(fn: (r) => r["_measurement"] == "CovidStats")\
                |> filter(fn: (r) => r["_field"] == "new_cases")\
                |> group(columns: ["_measurement","variant"])\
                |> sum(column: "_value")'
            res=query_api.query(org=org,query=query)
            temp=[]
            for table in res:
                for record in  table.records:
                    temp.append([record.values.get("variant"),record.get_value()])
            query='from(bucket: "bucket")\
                |> range(start: 2022-03-24T23:47:16.854775806Z, stop: 2052-04-10T18:30:00.000Z)\
                |> filter(fn: (r) => r["_measurement"] == "CovidStats")\
                |> filter(fn: (r) => r["_field"] == "new_cases")\
                |> group(columns: ["_measurement"])\
                |> sum(column: "_value")'
            res=query_api.query(org=org,query=query)
            for table in res:
                for record in  table.records:
                    temp1=record.get_value()
            query='from(bucket: "bucket")\
                |> range(start: 2022-03-24T23:47:16.854775806Z, stop: 2052-04-10T18:30:00.000Z)\
                |> filter(fn: (r) => r["_measurement"] == "CovidStats")\
                |> filter(fn: (r) => r["_field"] == "new_deaths")\
                |> group(columns: ["_measurement"])\
                |> sum(column: "_value")'
            res=query_api.query(org=org,query=query)
            for table in res:
                for record in  table.records:
                    temp2=record.get_value()
            r=[temp,temp1,temp2]
        obj=json.dumps(r)
        return Response(obj)


class CountrySumView(APIView):
    def get(self,request,country):
        with InfluxDBClient(url='http://127.0.0.1:8086',token=token,org=org) as client:
            result=dict()
            query_api=client.query_api()
            for i in ["oxygen cylinder","Ventilators","Mask"]:
                query='from (bucket:"bucket")\
                    |> range(start:2022-04-01T01:01:01Z , stop:2022-09-01T01:01:01Z)\
                    |> filter(fn: (r) => r["_measurement"] == "Medic")\
                    |> filter(fn: (r) => r["country"]=="{}")\
                    |> filter(fn: (r) => r["equipment"] == "{}")\
                    |> filter(fn: (r) => r["_field"] == "demand")'.format(country,i)
                res=query_api.query(org=org,query=query)    
                for table in res:
                    for record in  table.records:
                        temp1=record.get_value()
                query='from (bucket:"bucket")\
                    |> range(start:2022-04-01T01:01:01Z , stop:2022-09-01T01:01:01Z)\
                    |> filter(fn: (r) => r["_measurement"] == "Medic")\
                    |> filter(fn: (r) => r["country"]=="{}")\
                    |> filter(fn: (r) => r["equipment"] == "{}")\
                    |> filter(fn: (r) => r["_field"] == "supply")'.format(country,i)
                res=query_api.query(org=org,query=query)    
                for table in res:
                    for record in  table.records:
                        temp2=record.get_value()
                result[i]=[temp1,temp2]
            query='from(bucket: "bucket")\
            |> range(start: 2002-04-10T18:30:00.000Z, stop: 2052-04-10T18:30:00.000Z)\
            |> filter(fn: (r) => r["_measurement"] == "CovidStats")\
            |> filter(fn: (r) => r["_field"] == "new_deaths")\
            |> filter(fn: (r) => r["country"] == "{}")\
            |> group(columns: ["_measurement" ,"country", "_field"])\
            |>sum()'.format(country)
            res=query_api.query(org=org,query=query)    
            for table in res:
                for record in  table.records:
                    temp2=record.get_value()
            result["total_deaths"]=temp2
            query='from(bucket: "bucket")\
                |> range(start: 2002-04-10T18:30:00.000Z, stop: 2052-04-10T18:30:00.000Z)\
                |> filter(fn: (r) => r["_measurement"] == "CovidStats")\
                |> filter(fn: (r) => r["country"] == "{}")\
                |> filter(fn: (r) => r["_field"] == "new_cases")\
                |> group(columns: ["_measurement" ,"country", "_field"])\
                |>sum()'.format(country)
            res=query_api.query(org=org,query=query)
            for table in res:
                for record in  table.records:
                    temp2=record.get_value()
            result["total_cases"]=temp2
            obj=json.dumps(result)
            return Response(obj)
                    
            
            
            
