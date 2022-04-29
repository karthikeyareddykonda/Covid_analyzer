import csv 
import random

file = open("covid_data.csv")
reader = csv.reader(file)
header = next(reader)

f = open("medical.csv", "w")
write = csv.writer(f)
write.writerow(['Continent', 'Country', 'Month', 'equipment', 'equipment_code', 'demand', 'supply'])

countries = set()

for row in reader:
    if row[0] == '' or row[1] == '' or row[2] == '':
        continue
    countries.add((row[1], row[2]))

date = []
for i in range(12):
    if (i+1) >=10:
        date.append('2020-{month}-01T01:01:01Z'.format(month =i+1))    
    else:
        date.append('2020-0{month}-01T01:01:01Z'.format(month =i+1))
for i in range(12):
    if (i+1) >=10:
        date.append('2021-{month}-01T01:01:01Z'.format(month =i+1))    
    else:
        date.append('2021-0{month}-01T01:01:01Z'.format(month =i+1))
for i in range(4):
    date.append('2022-0{month}-01T01:01:01Z'.format(month =i+1))

for country in sorted(countries):
    i = 0
    for month in date:
        i = i+1
        r1 = [country[0], country[1], month, 'oxygen cylinder', 0, int(random.random()*1000*i), int(random.random()*800*i) ]
        r2 = [country[0], country[1], month, 'O2 Generator', 1, int(random.random()*400*i), int(random.random()*200*i) ]
        r3 = [country[0], country[1], month, 'Mask', 2, int(random.random()*1000*i**3), int(random.random()*800*i**(2.5)) ]
        r4 = [country[0], country[1], month, 'Ventilators', 3, int(random.random()*100*i**(1.5)), int(random.random()*100*i) ]
        r5 = [country[0], country[1], month, 'O2 Concentrators', 4, int(random.random()*400*i), int(random.random()*250*i) ]
        r6 = [country[0], country[1], month, 'Testing Units', 5, int(random.random()*1000*i**2), int(random.random()*800*i**2) ]
        r7 = [country[0], country[1], month, 'Pulse Oxymeters', 6, int(random.random()*1000*i), int(random.random()*800*i) ]
        r8 = [country[0], country[1], month, 'General Medicines', 7, int(random.random()*2000*i**3), int(random.random()*1000*i**(2.5)) ]
        r9 = [country[0], country[1], month, 'PPE Kit', 8, int(random.random()*1000*i), int(random.random()*800*i) ]

        write.writerows([r1, r2, r3, r4, r5, r6, r7, r8, r9])









