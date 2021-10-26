# Mixer dispenser script
# GPIO.output(port_or_pin, 1) 1 = high

# high = pump off?

import sys
import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

m1 = 5
m2 = 6
m3 = 13
m4 = 19

motors = [m1, m2, m3, m4]

# setup motors and initialize as off
for m in motors:
    GPIO.setup(m, GPIO.OUT)
    GPIO.output(m, GPIO.HIGH)

drinkStrength = 1
maxDrink = 5 # Max drink amount in ounces
drinkAmount = 0 # current poured drink amount

# remove script name and -v from list
arguments = sys.argv[2:]

def PourMixers():
    i = 0
    for a in arguments:
        dArg = float(a) # drink argument ("-v 0 1 0 6 0")
        if(dArg > 0):
            GPIO.output(motors[i], GPIO.LOW) # turn on motor
            time.sleep(drinkStrength * dArg)
            GPIO.output(motors[i], GPIO.HIGH) # turn off motor
        i = i + 1
    GPIO.cleanup()


if(sys.argv[1] == '-v' and len(arguments) > 0):
        PourMixers()