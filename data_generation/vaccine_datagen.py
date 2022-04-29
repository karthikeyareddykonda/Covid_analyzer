import csv
from math import ceil
import random

file = open("covid_data.csv")
reader = csv.reader(file)

f = open("data_vaccine.csv", "w")
write = csv.writer(f)
row = next(reader)
#vaccines are 1. covaxin, 'astragenica' , 'sputnik', 'pfizer'
fields = ['continent', 'state','date','below_18_partial_vaccinated', 'below_18_fully_vaccinated', 'below_18_booster', \
    '18_60_partial_vaccinated', '18_60_fully_vaccinated', '18_60_booster',\
    'above_60_partial_vaccinated', 'above_60_fully_vaccinated', 'above_60_booster', 'vaccine']
write.writerow(fields)
i = 0
for row in reader:
    if i == 0:
        country = row[2]
        i = 1
    else:
        print(country, row[2])
        if country == row[2]:
            i+=1
        else: i = 0
    #print(i)

    if i<200:
        r1 = [row[1], row[2], row[3], int(i*random.random()/50), int(i*random.random()/80), int(i*random.random()/90),\
            int(i*random.random()/10), int(i*random.random()/20), int(i*random.random()/30),\
            int(i*random.random()/10), int(i*random.random()/18), int(i*random.random()/30), 'covaxin']
        r2 = [row[1], row[2], row[3], int(i*random.random()/50), int(i*random.random()/80), int(i*random.random()/90),\
        int(i*random.random()/10), int(i*random.random()/18), int(i*random.random()/40), int(i*random.random()/2), int(i*random.random()/10), int(i*random.random()/30), 'astragenica']
        r3 = [row[1], row[2], row[3], int(i*random.random()/50), int(i*random.random()/80), int(i*random.random()/90),\
        int(i*random.random()/10), int(i*random.random()/18), int(i*random.random()/40),int(i*random.random()/2), int(i*random.random()/10), int(i*random.random()/30), 'sputnik' ]
        r4 = [row[1], row[2], row[3], int(i*random.random()/50), int(i*random.random()/80), int(i*random.random()/90),\
        int(i*random.random()/10), int(i*random.random()/18), int(i*random.random()/40),int(i*random.random()/2), int(i*random.random()/10), int(i*random.random()/30), 'pfizer' ]
    
    else:
        r1 = [row[1], row[2], row[3], int(i*random.random()/23), int(i*random.random()/34), int(i*random.random()/45),\
            int(i*random.random()/15), int(i*random.random()/30), int(i*random.random()/50),\
            int(i*random.random()/10), int(i*random.random()/18), int(i*random.random()/30), 'covaxin']
        r2 = [row[1], row[2], row[3], int(i*random.random()/50), int(i*random.random()/80), int(i*random.random()/60),\
        int(i*random.random()/10), int(i*random.random()/18), int(i*random.random()/40), int(i*random.random()/2), int(i*random.random()/10), int(i*random.random()/30), 'astragenica']
        r3 = [row[1], row[2], row[3], int(i*random.random()/50), int(i*random.random()/80), int(i*random.random()/60),\
        int(i*random.random()/10), int(i*random.random()/18), int(i*random.random()/40),int(i*random.random()/2), int(i*random.random()/10), int(i*random.random()/30), 'sputnik' ]
        r4 = [row[1], row[2], row[3], int(i*random.random()/50), int(i*random.random()/80), int(i*random.random()/60),\
        int(i*random.random()/10), int(i*random.random()/18), int(i*random.random()/40),int(i*random.random()/2), int(i*random.random()/10), int(i*random.random()/30), 'pfizer' ]
    r1[2] = r1[2]+'T23:47:16.854775806Z'
    r2[2] = r2[2]+'T23:47:16.854775806Z'
    r3[2] = r3[2]+'T23:47:16.854775806Z'
    r4[2] = r4[2]+'T23:47:16.854775806Z'
    write.writerows([r1, r2, r3, r4])
    
