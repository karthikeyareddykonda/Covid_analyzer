import csv

file = open("debt-relief-covid.csv")
reader = csv.reader(file)
f = open("m_debt-relief-covid.csv", "w")
write = csv.writer(f)

i = 0
next(reader)

fields = ['Country', 'Day', 'debt_relief', 'debt_relief_code']
write.writerow(fields)
for row in reader:
    codes = {'0':'no relief',\
        '1': 'narrow relief',\
        '2': 'broad relief',\
        '3': 'ban on high risk',\
        '4': 'total border closure'}    
    write.writerow([row[0], row[2], codes[row[3]], row[3]])
    



    