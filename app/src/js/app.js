// Edit Clock Box Elements
let { editClockButton, editClockBox } = editClockElements();

function editClockElements() {
  let editClockBox = document.querySelector(".edit-clock-box");
  const editClockButton = document.querySelector(".edit-clock-btn");
  return {
    editClockButton,
    editClockBox,
  };
}

let overLayer = document.querySelector(".overlayer");

editClockButton.addEventListener("click", () => {
  editClockBox.classList.add("show");
  overLayer.classList.add("show");
});
// Arrow Elements
let { secondArrow, minArrow, hourArrow } = Arrows();

function Arrows() {
  let secondArrow = document.querySelector(".sec-arrow");
  let minArrow = document.querySelector(".min-arrow");
  let hourArrow = document.querySelector(".hour-arrow");
  return {
    secondArrow,
    minArrow,
    hourArrow,
  };
}

// Calculation Numbers
let {
  clockDegresNumber,
  secondsMinutesNumber,
  HoursNumber,
  secondsMeliSecondsNumber,
  minutesMeliSecondsNumber,
  hoursMeliSecondsNumber,
  rotatePerSecondMinute,
  rotatePerHour,
} = clockCalculationsNumbers();

function clockCalculationsNumbers() {
  const clockDegresNumber = 360;
  const secondsMinutesNumber = 60;
  const HoursNumber = 12;
  const secondsMeliSecondsNumber = 1000;
  const minutesMeliSecondsNumber = 60000;
  const hoursMeliSecondsNumber = 600000;
  let rotatePerSecondMinute = clockDegresNumber / secondsMinutesNumber;
  let rotatePerHour = clockDegresNumber / HoursNumber;
  return {
    clockDegresNumber,
    secondsMinutesNumber,
    HoursNumber,
    secondsMeliSecondsNumber,
    minutesMeliSecondsNumber,
    hoursMeliSecondsNumber,
    rotatePerSecondMinute,
    rotatePerHour,
  };
}

// Number Clock
// Elements
let { houresTimeBoxText, minutesTimeBoxText, secondsTimeBoxText, time } =
  textBoxes();

function textBoxes() {
  let houresTimeBoxText = document.querySelector(".hours");
  let minutesTimeBoxText = document.querySelector(".minutes");
  let secondsTimeBoxText = document.querySelector(".seconds");
  let time = document.querySelector(".time");
  return {
    houresTimeBoxText,
    minutesTimeBoxText,
    secondsTimeBoxText,
    time,
  };
}

let { startingSecondsNumber, startingMinutesNumber, startingHoursNumber } =
  startingUnitsNumbers();

function startingUnitsNumbers() {
  let startingSecondsNumber = 0;
  let startingMinutesNumber = 0;
  let startingHoursNumber = 0;
  return {
    startingSecondsNumber,
    startingMinutesNumber,
    startingHoursNumber,
  };
}
// Function
setInterval(function clocksMainFunction() {
  startingSecondsNumber++;
  secondsTimeBoxText.textContent = startingSecondsNumber;
  secondArrow.style.transform += `rotate(${rotatePerSecondMinute}deg)`;

  if (startingSecondsNumber === 60) {
    startingMinutesNumber++;
    minutesTimeBoxText.textContent = startingMinutesNumber;
    minArrow.style.transform += `rotate(${rotatePerSecondMinute}deg)`;
  }
  if (startingSecondsNumber === 60) {
    startingSecondsNumber = 0;
    secondsTimeBoxText.textContent = startingSecondsNumber;
  }
  if (startingMinutesNumber === 60) {
    startingMinutesNumber = 0;
    minutesTimeBoxText.textContent = startingMinutesNumber;
    startingHoursNumber++;
    houresTimeBoxText.textContent = startingHoursNumber;
    hourArrow.style.transform += `  rotate(${rotatePerHour}deg)`;
    dayNightStatment();
  }
  if (startingHoursNumber === 24) {
    startingHoursNumber = 0;
    houresTimeBoxText.textContent = startingHoursNumber;
  }
}, secondsMeliSecondsNumber);

// Change Region
let changeRegionBox = document.querySelector(".regions");
const allRegions = document.querySelectorAll(".region");
allRegions.forEach((region) => {
  region.addEventListener("click", () => {
    changeRegionBox.classList.remove("show");
    overLayer.classList.remove("show");

    let howMuchRegionHoursDifferentFromDefault =
      region.getAttribute("data-hrs");

    // Circle Clock Calculations
    let hourArrowRotationRegion =
      howMuchRegionHoursDifferentFromDefault * rotatePerHour;
    hourArrow.style.transform += `rotate(${hourArrowRotationRegion}deg)`;
    // Number Clcok Calculations
    startingHoursNumber += parseInt(howMuchRegionHoursDifferentFromDefault);
    houresTimeBoxText.textContent = startingHoursNumber;

    dayNightStatment();
  });
});

// Edit Colck Input
//Selector
const $ = (selector) => document.querySelector(selector);

//Elements
const input = $("#input"),
  eraser = $("#eraser"),
  pencil = $("#pencil");

// Pencil animation
input.addEventListener("input", () => {
  pencil.animate(
    [
      {
        transform: "rotate(8deg)",
        offset: 0,
      },
      {
        transform: "rotate(0deg)",
        offset: 0.2,
      },
      {
        transform: "rotate(8deg)",
        offset: 0.5,
      },
      {
        transform: "rotate(0deg)",
        offset: 1,
      },
    ],
    {
      easing: "ease",
      duration: 1000,
    }
  );
});

//Eraser
eraser.addEventListener("click", () => {
  const loop = () => {
    setTimeout(() => {
      input.readOnly = true;
      const value = input.value,
        erased = String(value).substring(0, value.length - 1);
      input.value = erased;
      value.length ? loop() : (input.readOnly = false);
    }, 25);
  };
  loop();
});

// Day Night Statments
function dayNightStatment() {
  if (startingHoursNumber <= 12 && startingHoursNumber > 0) {
    time.textContent = "AM";
  }
  if (startingHoursNumber > 12) {
    time.textContent = "PM";
  }
  if (startingHoursNumber === 24) {
    time.textContent = "AM";
  }
  if (startingHoursNumber === 0) {
    time.textContent = "AM";
  }
}

// Edit Clock
let editClockTimeBox = document.querySelector(".edit-clock-time-box");
let hourNumberInput = document.querySelector(".hours-input");
let minutesNumberInput = document.querySelector(".minutes-input");
const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", () => {
  let hourIntNumberInput = parseInt(hourNumberInput.value);
  let minutesIntNumberInput = parseInt(minutesNumberInput.value);
  if (
    hourIntNumberInput === "" ||
    minutesIntNumberInput === "" ||
    isNaN(hourIntNumberInput) === true ||
    isNaN(minutesIntNumberInput) === true ||
    hourIntNumberInput > 24 ||
    minutesIntNumberInput > 60
  ) {
    alertBox.classList.add("show");
    hourNumberInput.value = "";
    minutesNumberInput.value = "";
  } else {
    hourArrow.style.transform = `rotate(${
      hourIntNumberInput * rotatePerHour
    }deg)`;
    minArrow.style.transform = `rotate(${
      minutesIntNumberInput * rotatePerSecondMinute
    }deg)`;
    houresTimeBoxText.textContent = hourIntNumberInput;
    startingHoursNumber = hourIntNumberInput;
    minutesTimeBoxText.textContent = minutesIntNumberInput;
    startingMinutesNumber = minutesIntNumberInput;
    hourNumberInput.value = "";
    minutesNumberInput.value = "";
    editClockTimeBox.classList.remove("show");
    editClockBox.classList.remove("show");
    overLayer.classList.remove("show");
    dayNightStatment();
  }
});

// Close Icon
const closeIcons = document.querySelectorAll(".close-icon");
closeIcons.forEach((closeIcon) => {
  closeIcon.addEventListener("click", () => {
    editClockBox.classList.remove("show");
    editClockTimeBox.classList.remove("show");
    overLayer.classList.remove("show");
  });
});

let changeRegion = document.querySelector(".change-region");
changeRegion.addEventListener("click", () => {
  changeRegionBox.classList.add("show");
  editClockBox.classList.remove("show");
});

const closeAlertButton = document.querySelector(".close-alert");
let alertBox = document.querySelector(".alert");
closeAlertButton.addEventListener("click", () => {
  alertBox.classList.remove("show");
  hourNumberInput.value = "";
  minutesNumberInput.value = "";
});

let editClockTime = document.querySelector(".edit-clock-time");
editClockTime.addEventListener("click", () => {
  editClockTimeBox.classList.add("show");
  overLayer.classList.add("show");
});
