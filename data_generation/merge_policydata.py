import csv

f1 = open('me_gathering_transport_stay_income_debt_pevents.csv')
r1 = f1.read()
r1 = r1.split('\n')

f2 = open('m_international-travel-covid.csv')
r2 = f2.read()
r2 = r2.split('\n')
r1 = [i.split(',') for i in r1]
r2 = [i.split(',') for i in r2]


f = open("me_gathering_transport_stay_income_debt_pevents_itravel.csv", "w")
write = csv.writer(f)
row = ['Country','Day', 'restriction_gatherings', 'restriction code', 'close_public_transport', 'close_public_transport_code', 'stay_at_home', 'stay_at_home_code'\
    ,'income_support','income_support_code','debt_relief','debt_relief_code', 'cancel_public_events','restriction_code', \
    'international_travel_controls','international_travel_controls_code']
write.writerow(row)

rows = []
i = 1
for idx, data in enumerate(r1):
    if idx == 0:
        continue
    for j in range(i, len(r2)):
        print(idx, j)
        if data[0] == r2[j][0] and data[1] == r2[j][1]:
            write.writerow([data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9],\
                 data[10], data[11], data[12], data[13], r2[j][2], r2[j][3]])
            i = j+1
            break
        if data[0] < r2[j][0]:
            break



