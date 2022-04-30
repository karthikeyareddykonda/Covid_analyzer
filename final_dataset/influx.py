from datetime import datetime
import csv
import matplotlib.pyplot as plt
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# You can generate an API token from the "API Tokens Tab" in the UI
token = "W4ss50DPEs72tw-DmwTbs17HiwEr2Ywfc7Q8PmXY5b0xBu-gB3qmCf5rzexHDLf8duoDNycZLX5fb5lgqNC9Pg=="
org = "dblab"
bucket = "bucket"

with InfluxDBClient(url="http://127.0.0.1:8086", token=token, org=org) as client:
    write_api = client.write_api(write_options=SYNCHRONOUS)
    f=open('medical.csv')
    temp=csv.reader(f)
    i=0
    for line in temp:
        if(i==0):
            i=1
            continue
        point=Point("Medic").tag("continent",line[0]).tag("country",line[1]).tag('equipment',line[3]).field('demand',int(line[5])).field('supply',int(line[6])).time(line[2])  
        #point=Point("CovidStats").tag('variant',line[9]).tag("continent",line[0]).tag("country",line[1]).tag('state',line[2]).field('new_cases',int(line[4])).field('new_deaths',int(line[5])).field('icu_patients',int(line[6])).field('hosp_patients',int(line[7])).field('new_tests',int(line[8])).time(line[3])
        
        write_api.write(bucket,org,point)    
        print(i)
        i+=1
       # if(i>1000):
        #    break
    #data = "mem,host=host1 used_percent=23.43234543 2262-04-11T23:47:16.854775806Z"
    #point=Point("CovidStats").tag("country","India").field('deaths',23).field('cases',200).time("2022-04-11T23:47:16.854775806Z")
    #write_api.write(bucket, org, point)
    '''
    query_api=client.query_api()
    query='from(bucket: "bucket")\
        |> range(start:0)\
        |> filter(fn:(r)=>r._measurement=="CovidStats")\
        |> filter(fn:(r)=>r.country=="Argentina" and r.variant=="alpha")'
    res=query_api.query(org=org,query=query)
    results = []
    for table in res:
        for record in table.records:
            results.append((record.get_value(), record.get_field()))
    temp=[]
    for i in results:
        if(i[1]=="new_tests"):
            temp.append(i[0])
    plt.plot(temp)
    plt.show()'''
    
    
