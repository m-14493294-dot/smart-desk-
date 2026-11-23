// TEKAN BUTANG A UNTUK MULAKAN SEMULA PEMASA
input.onButtonPressed(Button.A, function () {
    masaMula = control.millis()
    masaBelajarTamat = false
    basic.showIcon(IconNames.Yes)
})
let masaBelajarTamat = false
let masaMula = 0
// MULA SISTEM
rekabitUltrasonic.setUltrasonicTrigEcho(RekabitUltrasonicIOPins.p2_p12)
rekabitRgbStick.create(RekabitPortYellowPin.P0)
rekabitRgbStick.setBrightness(60)
// Servo bermula pada kedudukan biasa
rekabit.setServoPosition(ServoChannel.S1, 0)
// Mulakan pemasa belajar
masaMula = control.millis()
basic.showString("SMART")
// ON START
// Initialize ESP8266
esp8266.init(SerialPin.P16, SerialPin.P15, BaudRate.BaudRate115200)
// Cuba initialize sehingga berjaya
while (!(esp8266.isESP8266Initialized())) {
    esp8266.init(SerialPin.P16, SerialPin.P15, BaudRate.BaudRate115200)
    basic.pause(1000)
}
// Paparkan ikon berjaya
basic.showIcon(IconNames.Happy)
// Sambungkan kepada WiFi
esp8266.connectWiFi("Grove wifi 8266", "PASSWORD_WIFI")
// Cuba sambung sehingga berjaya
while (!(esp8266.isWifiConnected())) {
    esp8266.connectWiFi("Grove wifi 8266", "PASSWORD_WIFI")
    basic.pause(1000)
}
// Paparkan ikon berjaya
basic.showIcon(IconNames.Happy)
// SISTEM UTAMA
basic.forever(function () {
    // Semak sama ada sudah 25 minit belajar
    if (control.millis() - masaMula >= 300000) {
        masaBelajarTamat = true
    }
    // KEADAAN 1: MASA UNTUK BEREHAT
    // KEADAAN 2: JARAK TERLALU DEKAT
    // KEADAAN 3: JARAK PERLU DIBETULKAN
    // KEADAAN 4: JARAK DALAM JULAT SASARAN
    if (masaBelajarTamat) {
        rekabitRgbStick.showColor(0xff0000)
        rekabit.setServoPosition(ServoChannel.S1, 180)
        basic.showIcon(IconNames.Asleep)
    } else if (rekabitUltrasonic.compareDistance(RekabitAnalogCompareType.LessThan, 5)) {
        rekabitRgbStick.showColor(0xff0000)
        rekabit.setServoPosition(ServoChannel.S1, 141)
        basic.showIcon(IconNames.No)
    } else if (rekabitUltrasonic.compareDistance(RekabitAnalogCompareType.LessThan, 20)) {
        rekabitRgbStick.showColor(0xffff00)
        rekabit.setServoPosition(ServoChannel.S1, 90)
        basic.showIcon(IconNames.Sad)
    } else {
        rekabitRgbStick.showColor(0x00ff00)
        rekabit.setServoPosition(ServoChannel.S1, 0)
        basic.showIcon(IconNames.Happy)
    }
    basic.pause(500)
})
