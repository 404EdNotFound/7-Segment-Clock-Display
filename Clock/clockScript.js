// let hourText = document.getElementById("hour")
// let minText = document.getElementById("min")
// let secondText = document.getElementById("second")

let timeFormat = document.getElementsByName("format")
let DateFormat = document.getElementById("dateFormat")
let currentFormat = "24"
let timePeriod = ""

const digits = {
    0: ["a", "b", "c", "d", "e", "f"],
    1: ["b", "c"],
    2: ["a", "b", "g", "e", "d"],
    3: ["a", "b", "c", "d", "g"],
    4: ["f", "g", "b", "c"],
    5: ["a", "f", "g", "c", "d"],
    6: ["a", "f", "e", "d", "c", "g"],
    7: ["a", "b", "c"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
    9: ["a", "b", "c", "d", "f", "g"]
  }

const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

// Needed help with how to control the multiple choice buttons to update the timer
timeFormat.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.checked) {
            currentFormat = radio.value
            update()
        }
    })
})

// Used to helping with updating the time each time, needing assistance with this 
function update() {
    const currentDate = new Date
    let hours = currentDate.getHours()
    let minutes = currentDate.getMinutes()
    let seconds = currentDate.getSeconds()

    console.log(currentDate)

    let dayName = currentDate.getDay()
    let date = currentDate.getDate().toString().padStart(2, "0")
    let month = (currentDate.getMonth() + 1).toString().padStart(2, "0")
    let year = currentDate.getFullYear().toString().padStart(2, "0")

    if (currentFormat === "12") {
        timePeriod = (hours >= 12) ? "PM" : "AM"
        hours = (hours % 12) || 12 //Used to convert 24-hour into 12 hour format (0 is seen as a false value and rest are truth values)
    }

    const period = document.getElementById("timePeriod")
    if (period) {
        period.textContent = currentFormat === "12" ? " " + timePeriod : ""
    }

    DateFormat.textContent = "Current Date: " + days[dayName] + " " + date + "/" + month + "/" + year

    numberString = hours.toString().padStart(2, "0") + minutes.toString().padStart(2, "0") + seconds.toString().padStart(2, "0")

    for (let i = 0; i < numberString.length; i++) {
        const digit = parseInt(numberString[i])
        const supply = document.querySelector(`#digit-${i+1}`) // Shows all the 6 digits
        const segments = supply.querySelectorAll(".segment") // Triggers all the relevant segmnts

        segments.forEach(segment => {
            segment.classList.remove("on")
        })

        const lights = digits[digit]

        lights.forEach(part => {
            const targetDigit = supply.querySelector(`.segment.${part}`)
            if (targetDigit) {
                targetDigit.classList.add("on")
            }
        })
    }
}

setInterval(update, 1000) //Used as a way to update time every second (required assistance with this)
document.addEventListener("DOMContentLoaded", () => {update()})