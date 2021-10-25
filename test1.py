import sys

from adafruit_servokit import ServoKit
import time
kit = ServoKit(channels=16)
# PourShot.py
# takes 4 arguments and opens corresponding servo valve
# waits for a corresponding amount of time for each amount of liquor (in shots)
# e.x: input "-v 0 1 0 0" means 1 shot of tequila

# remove script name and -v from list
arguments = sys.argv[2:]

RUM = kit.servo[3]
TEQUILA = kit.servo[4]
VODKA = kit.servo[5]

# accepts index of drink and opens corresponding valve for seconds as compared to X
def PourLiquor(x, index):
        alcohol = ''
        if(index == 0):
                alcohol = 'RUM'
                RUM.angle = 160
                print("pouring rum")
                time.sleep(9 * x)
                RUM.angle = 0
                time.sleep(2)
                print("stopping rum")
                RUM.angle = None # turn off valve servo
        elif(index == 1):
                alcohol = 'VODKA'
        print("done pouring " + str(x) + " shots of " + alcohol)


if(sys.argv[1] == '-v' and len(arguments) > 0):
        
        print("has values")
        i = 0
        for v in arguments:
                print(v)
                vx = int(v)
                if(int(v) > 0):
                    PourLiquor(vx, i)
                i = i + 1 # iterate
                # do something with number of shots here..

else:
        print("no -v or no arguments!")


