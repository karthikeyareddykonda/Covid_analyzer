import csv

file = open("data_m.csv")
reader = csv.reader(file)
f = open("updated_data.csv", "w")
write = csv.writer(f)

i = 0
next(reader)

fields = ['continent', 'country', 'state', 'date', 'new_cases', 'icu_patients', 'hosp_patients', 'new_tests', 'variant']
write.writerow(fields)
for row in reader:
    i +=1
    
    #print(row[1], row[2])
    new_case = int(row[3])
    new_deaths = int(row[4])
    icu = int(row[5])
    hosp = int(row[6])
    test = int(row[7])

    r1 = [row[0], row[1],row[1],  row[2], int(new_case*0.35), int(new_deaths*0.32), int(icu*0.2), int(hosp*0.3), int(test*0.3), "alpha"]
    r2 = [row[0], row[1], row[1], row[2],  int(new_case*0.15), min(int(new_case*0.15), int(new_deaths*0.18)), int(icu*0.3), int(hosp*0.2), int(test*0.2), "beta"]
    r3 = [row[0], row[1], row[1], row[2], int(new_case*0.25), int(new_deaths*0.39), int(icu*0.3), int(hosp*0.3), int(test*0.3), "delta"]
    r4 = [row[0], row[1], row[1], row[2], new_case - r1[4]-r2[4]-r3[4], new_deaths - r1[5]-r2[5]-r3[5], icu - r1[6]-r2[6]-r3[6], hosp - r1[7]-r2[7]-r3[7], \
        test - r1[8]-r2[8]-r3[8], "omicron"]
    

    write.writerows([r1,r2,r3,r4])




    