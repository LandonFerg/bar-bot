import sys

from adafruit_servokit import ServoKit
import time
kit = ServoKit(channels=16)
# PourShot.py
# takes 4 arguments and opens corresponding servo valve
# waits for a corresponding amount of time for each amount of liquor (in shots)
# e.x: input "-v 0 1 0 0" means 1 shot of tequila

# remove script name and -v from list
arguments = sys.argv[2:] # 0 1 0 0 - (our shot amounts)

LIGHT_RUM = kit.servo[3]
DARK_RUM = kit.servo[4]
VODKA = kit.servo[5]
TEQUILA = kit.servo[6]
GIN = kit.servo[7]
TRIPLE_SEC = kit.servo[8]

DRINKLABELS = ['LIGHT_RUM', 'DARK_RUM', 'VODKA', 'TEQUILA', 'GIN', 'TRIPLE_SEC']
DRINKS = [LIGHT_RUM, DARK_RUM, VODKA, TEQUILA, GIN, TRIPLE_SEC]

pourTimers = [0] * 6
pourStartTime = 0
timePassed = 0
shotStrength = 9 # seconds to wait per shot

TotalWaitTime = 0

def SilenceServos():
        for d in DRINKS:
                d.angle = 0
                time.sleep(2)
                d.angle = None


# accepts index of drink and opens corresponding valve for seconds as compared to X
def PourLiquor(x, index):
        i = 0
        print("start PourLiquor")
        for a in arguments:
                TotalWaitTime = 0
                if(int(a) > 0):
                        DRINKS[i].angle = 160
                        print("dispensing " + str(a)+ " shots of " + DRINKLABELS[i])
                        timeToWait = int(a) * shotStrength
                        pourTimers[i] = timeToWait # start timer for arg * shotStrength

                
                if (timeToWait >= TotalWaitTime):
                        TotalWaitTime = timeToWait

                i = i + 1
        pourStartTime = time.perf_counter() # start timer after pouring shots
        StopLiquor()


def StopLiquor():
        print("start stopLiquor")
        timeElapsed = time.perf_counter() - pourStartTime
        i = 0
        while(timeElapsed < TotalWaitTime):
                for a in arguments:
                        if (int(a) > 0 and timeElapsed >= pourTimers[i]):
                                DRINKS[i].angle = 0
                        i = i + 1
                timeElapsed = time.perf_counter - pourStartTime # update time
        SilenceServos() # please
        



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


