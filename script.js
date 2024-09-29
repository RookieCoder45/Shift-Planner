const prevBtn = document.querySelector(".prev-month");
const nextBtn = document.querySelector(".next-month");
const calendarContainer = document.querySelector(".calendar-container");
const monthYearLabel = document.getElementById("monthYear");
const shiftSelectionBtn = document.querySelector(".shift-selector")

const shiftSchedule = {
  "i": [],
  "j": ["day", "day", "day", "night", "night", "night", "day off", "day off", "day off", "day off", "day off", "day off"],
  "k": [],
  "l": []
}

const jShiftScedule = ["day", "day", "day", "night", "night", "night", "day-off", "day-off", "day-off", "day-off", "day-off", "day-off"]

const startDate = new Date("2024-01-02"); // Jan 2, 2024

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const data = new Date();
let year = data.getFullYear();
let month = data.getMonth();
let day = data.getDate();

console.log(shiftSelectionBtn)


monthYearLabel.innerHTML = `${months[month]} ${year}`;

function renderCalendar() {
  calendarContainer.innerHTML = "";
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthNumOfDays = new Date(year, month, 0).getDate();
  let scheduleIndex = getScheduleIndex(jShiftScedule) % 12;
  
  for (let i= 0; i < firstDayOfMonth + daysInMonth; i++) {
    if (i < firstDayOfMonth){
      const dayCell = document.createElement("div")
      dayCell.classList.add("inactive")
      dayCell.innerHTML = (prevMonthNumOfDays - firstDayOfMonth) + i + 1
      calendarContainer.append(dayCell)
    }
    else  {
      if (scheduleIndex > 11){scheduleIndex = 0}
      const dayCell = document.createElement("div")
      console.log(scheduleIndex)
      dayCell.classList.add(`${jShiftScedule[scheduleIndex]}`)
      scheduleIndex++;
      dayCell.innerText = i - firstDayOfMonth + 1
      calendarContainer.append(dayCell)
    }
  }

  
   
}
  




renderCalendar()


nextBtn.addEventListener("click", () => {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  monthYearLabel.innerHTML = `${months[month]} ${year}`;
  renderCalendar();
});


prevBtn.addEventListener("click", () => {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  monthYearLabel.innerHTML = `${months[month]} ${year}`;
  renderCalendar();
})



// write  functions section


function getScheduleIndex(schedule){
  const startDate = new Date("2024-01-02"); // Jan 2, 2024
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const endDate = new Date(year, month -1, daysInPrevMonth); 
  return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
}