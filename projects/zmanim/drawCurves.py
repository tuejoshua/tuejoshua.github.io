# NOTE: This script is my first working Python script. 
# It does the job I have for it, although not very beautifully.
# After spending some time trying to identify areas that could benefit refactoring,
# I realized that 1) to do it properly, I should COMPLETELY re-think the whole data flow,
# and 2) I don't really want to spend ANY time (at this point) improving on it since: it functionally already works as intended.
# (there might be a whole point there when "prototyping" that you SHOULDN'T spend time optimizing on something that already works...)
# So - sorry; I'm not usually like that ;)


## Import relevant libraries
# For reading CSV files:
import csv
# For working with arrays:
import numpy as np # w3schools: "NumPy is usually imported under the np alias."
# Plotting toolbox
import matplotlib.pyplot as plt # w3schools: "(...) usually imported under the plt alias"


# Initialize arrays
alot 			= np.empty(0)
shejakir 		= np.empty(0)
netz 			= np.empty(0)
shema_magena 		= np.empty(0)
shema_gaon 		= np.empty(0)
chatzot 		= np.empty(0)
plag 			= np.empty(0)
skia 			= np.empty(0)
tzeit 			= np.empty(0)
rabTam 			= np.empty(0)

monthSplits		= np.empty(0)
monthLabels		= np.empty(0)

# Create list of (csv) file names to be read below
monthList = ["april 001", "maj 001", "juni 001", "juli 001", "august 001", "september 001", "oktober 001", "november 001", "december 001", "jan", "febrero 001", "marts 001"];

for month in monthList:

	# load file
	csvfile = open(month + ".csv")
	# Source: https://docs.python.org/3/library/csv.html
	readerObject = csv.reader(csvfile, delimiter=',')

	for row in readerObject:
		# There must be a better (faster) way than this, since .append is making A COPY of the array every time(!)
		alot 			= np.append(alot, 			(float(row[2] )+(float(row[3] )/60)))
		shejakir 		= np.append(shejakir, 		(float(row[4] )+(float(row[5] )/60)))
		netz 			= np.append(netz, 			(float(row[6] )+(float(row[7] )/60)))
		shema_magena 	= np.append(shema_magena, 	(float(row[8] )+(float(row[9] )/60)))
		shema_gaon 		= np.append(shema_gaon, 	(float(row[10])+(float(row[11])/60)))
		chatzot 		= np.append(chatzot, 		(float(row[12])+(float(row[13])/60)))
		plag 			= np.append(plag, 			(float(row[14])+(float(row[15])/60)))
		skia 			= np.append(skia, 			(float(row[16])+(float(row[17])/60)))
		tzeit 			= np.append(tzeit, 			(float(row[18])+(float(row[19])/60)))
		rabTam 			= np.append(rabTam, 		(float(row[20])+(float(row[21])/60)))

	csvfile.close()

	monthSplits			= np.append(monthSplits, 	len(alot))

	monthLabels			= np.append(monthLabels, 	month[0:3])

	print(month)

# print(rabTam)

# print(monthSplits)


## PLOT:

# - horizontal (grid) lines: primary lines at every 6 hours; 2ndary at every 3 hours; and tertiary at the remaining hours
for hour in range(25): # 0-24 incl.
	if hour in [0,6,12,18,24]:
		plt.hlines(hour, 0, monthSplits[-1])
	if hour in [3,9,15,21]:
		plt.hlines(hour, 0, monthSplits[-1], linestyles='dashed')
	if hour in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23]:
		plt.hlines(hour, 0, monthSplits[-1], linestyles='dotted')
plt.yticks(range(25))

# - vertical lines to indicate where (Gregorian) months split
for monthSplit in monthSplits:
	plt.vlines(monthSplit-.5, 0, 24.50, linestyles='dashed')# e.g. 31 -> between days 31 (jan) and 32 (1 feb); MINUS because plotting is 0-based
# - label months with their names
plt.xticks(monthSplits-15, monthLabels) # "-15" is a quick hack; more or less at center of each month

# - Plot midNIGHT chatzot lines at top AND bottom of "day span"
# It is found that the CHATZOT curve further down will get color='y'; therefore we match it here
plt.plot(chatzot-12, color='y')
plt.plot(chatzot+12, color='y')

# - Plot each signal
plt.plot(alot, label='alot')
plt.plot(shejakir, label='shejakir')
plt.plot(netz, label='netz')
plt.plot(shema_magena, label='shema_magena')
plt.plot(shema_gaon, label='shema_gaon')
plt.plot(chatzot, label='chatzot')
plt.plot(plag, label='plag')
plt.plot(skia, label='skia')
plt.plot(tzeit, label='tzeit')
plt.plot(rabTam, label='rabTam')
plt.ylim([0, 24.5])
plt.xlim([0, monthSplits[-1]])

#plt.legend(bbox_to_anchor=(1,1), loc="upper left") # source: https://www.statology.org/matplotlib-legend-outside-plot/

# We want time to progress DOWN the plot/page, not UP (as per conventional plot)
plt.gca().invert_yaxis() # source: https://stackoverflow.com/questions/2051744/reverse-y-axis-in-pyplot

# Optimize plot window (minimal waste/whitespace, but relevant axes still readable
plt.subplots_adjust(left=0.02, bottom=0.04, right=0.93, top=0.99) # values by trial-and-error

plt.text(monthSplits[-1],alot[-1],'alot', va='baseline')
plt.text(monthSplits[-1],shejakir[-1],'shejakir', va='baseline')
plt.text(monthSplits[-1],netz[-1],'netz', va='baseline')
plt.text(monthSplits[-1],shema_magena[-1],'shema_magena', va='baseline')
plt.text(monthSplits[-1],shema_gaon[-1],'shema_gaon', va='baseline')
plt.text(monthSplits[-1],chatzot[-1],'chatzot', va='baseline')
plt.text(monthSplits[-1],plag[-1],'plag', va='baseline')
plt.text(monthSplits[-1],skia[-1],'skia', va='baseline')
plt.text(monthSplits[-1],tzeit[-1],'tzeit', va='baseline')
plt.text(monthSplits[-1],rabTam[-1],'rabTam', va='baseline')
plt.text(monthSplits[-1],chatzot[-1]-12,'chatzot', va='baseline')
plt.text(monthSplits[-1],chatzot[-1]+12,'chatzot', va='baseline')


plt.show() # program pauses here; control -> plot window


print("End of script")
