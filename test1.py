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
timePassed = 0

shotDivision = 2 # half shot

shotStrength = 8 / shotDivision # seconds to wait per shot div (half shot)

TotalWaitTime = 0

def SilenceServos():
        print("silencing servos..")
        for d in DRINKS:
                d.angle = 0
                time.sleep(2)
                d.angle = None


# accepts index of drink and opens corresponding valve for seconds as compared to X
def PourLiquor():
        i = 0
        print("start PourLiquor")
        TotalWaitTime = 0
        for a in arguments:
                a = float(a) * shotDivision  # convert to half shot
                if(int(a) > 0):
                        DRINKS[i].angle = 160
                        print("dispensing " + str(a)+ " shots of " + DRINKLABELS[i])
                        timeToWait = int(a) * shotStrength
                        pourTimers[i] = timeToWait # start timer for arg * shotStrength

                if (timeToWait >= TotalWaitTime):
                        TotalWaitTime = timeToWait

                i = i + 1
        pourStartTime = time.time() # start timer after pouring shots
        StopLiquor(pourStartTime, TotalWaitTime)


def StopLiquor(st, wt):
        print("start stopLiquor")
        timeElapsed = time.time() - st
        print("wait time: " + str(wt))
        print("pour timers: ")
        print(pourTimers)

        print("time elapsed: " + str(timeElapsed))

        while(timeElapsed < wt):
                i = 0
                for a in arguments:
                        a = float(a) * shotDivision  # for half shot
                        if (int(a) > 0 and timeElapsed >= pourTimers[i]):
                                DRINKS[i].angle = 0
                                print("stopping the dispenser for " + DRINKLABELS[i])
                        i = i + 1
                timeElapsed = time.time() - st # update time
        SilenceServos() # please
        



if(sys.argv[1] == '-v' and len(arguments) > 0):
        PourLiquor()
                # do something with number of shots here..

else:
        SilenceServos()
        print("no -v or no arguments!")


