import logging
import time
import RPi.GPIO as GPIO

logging.basicConfig(level=logging.DEBUG)

OUT_GPIO_PIN = 4
GPIO.setmode(GPIO.BCM)
GPIO.setup(OUT_GPIO_PIN, GPIO.OUT)

def pushSwitch(pinNum):
    print("pushSwitch ", pinNum)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pinNum, GPIO.OUT)
    GPIO.cleanup()
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pinNum, GPIO.OUT)
    GPIO.output(pinNum, GPIO.LOW)
    time.sleep(0.3)
    GPIO.output(pinNum, GPIO.HIGH)

class light:
    def on(self):
        pushSwitch(17)

    def off(self):
        pushSwitch(2)

if __name__ == "__main__":
    l = light()
    l.on()
    time.sleep(6)
    l.off()
