from adafruit_servokit import ServoKit
import time
import sys

kit = ServoKit(channels=16)



kit.servo[15].actuation_range = 160
kit.servo[15].angle = 160
kit.servo[14].angle = 160
print("setting open")
time.sleep(2)
print("setting closed")
kit.servo[15].angle = 0
kit.servo[14].angle = 0
print("disabling..")
time.sleep(2)
kit.servo[15].angle = None
kit.servo[14].angle = None
