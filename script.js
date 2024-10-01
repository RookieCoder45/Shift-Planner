const prevBtn = document.querySelector(".prev-month");
const nextBtn = document.querySelector(".next-month");
const calendarContainer = document.querySelector(".calendar-container");
const monthYearLabel = document.getElementById("monthYear");
const shiftSelectionBtn = document.querySelectorAll(".shift-selector button")

const shiftSchedule = {
  "i": [ "night", "night", "night","dayoff", "dayoff", "dayoff", "dayoff", "dayoff", "dayoff", "day", "day", "day"],
  "j": ["day", "day", "day", "night", "night", "night", "dayoff", "dayoff", "dayoff", "dayoff", "dayoff", "dayoff"],
  "k": ["dayoff", "dayoff", "dayoff", "day", "day", "day", "night", "night", "night", "dayoff", "dayoff", "dayoff" ],
  "l": ["dayoff", "dayoff", "dayoff", "dayoff", "dayoff", "dayoff", "day", "day", "day", "night", "night", "night"]
}

const jShiftScedule = ["day", "day", "day", "night", "night", "night", "day-off", "day-off", "day-off", "day-off", "day-off", "day-off"]

const startDate = new Date("2024-01-02"); // Jan 2, 2024

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const data = new Date();
let year = data.getFullYear();
let month = data.getMonth();
let day = data.getDate();

let selectedShift = "j"

console.log(shiftSelectionBtn)

for (btn of shiftSelectionBtn) {
  btn.addEventListener("click", (e)=> {
    selectedShift = e.target.id
    
    renderCalendar(selectedShift)
  })
  
}



monthYearLabel.innerHTML = `${months[month]} ${year}`;

function renderCalendar(shift) {
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
      if (scheduleIndex > 11){scheduleIndex = 0};
      const dayCell = document.createElement("div")
      
      dayCell.classList.add(`${shiftSchedule[shift][scheduleIndex]}`)
      scheduleIndex++;
      dayCell.innerText = i - firstDayOfMonth + 1
      if (dayCell.classList.contains("day")) {
        dayCell.style.backgroundColor = colorForDayShift(shift)
        
      }
      drawHolidays(month, i - firstDayOfMonth + 1, dayCell)
      addPayrollDates(new Date(year, month, i - firstDayOfMonth + 1), dayCell)
      calendarContainer.append(dayCell)
    }
  }

  
   
}
  

renderCalendar(selectedShift)





nextBtn.addEventListener("click", () => {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  monthYearLabel.innerHTML = `${months[month]} ${year}`;
  renderCalendar(selectedShift);
});


prevBtn.addEventListener("click", () => {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  monthYearLabel.innerHTML = `${months[month]} ${year}`;
  renderCalendar(selectedShift);
})



// write  functions section


function getScheduleIndex(schedule){
  const startDate = new Date("2024-01-02"); // Jan 2, 2024
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const endDate = new Date(year, month -1, daysInPrevMonth); 
  return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
}


function colorForDayShift (shifName) {
  switch (shifName) {
    case "i": return "#95d5b2";break;
    case "j": return "#0ca5f3";break;
    case "k": return "#ff34ce";break;
    case "l": return "#daec13";break;
  }
}


function drawHolidays(month, date, obj) {
  if (month === 0 && date === 1){
    obj.classList.add("holiday")
  } else if (month === 1 && date === 19){
    obj.classList.add("holiday")
  }else if (month === 2 && date === 29){
    obj.classList.add("holiday")
  }else if (month === 4 && date === 20){
    obj.classList.add("holiday")
  }else if (month === 6 && date === 1){
    obj.classList.add("holiday")
  }else if (month === 8 && date === 2 || month === 8 && date=== 30){
    obj.classList.add("holiday")
  }else if (month === 9 && date === 14){
    obj.classList.add("holiday")
  }else if (month === 10 && date === 11){
    obj.classList.add("holiday")
  }else if (month === 11 && date === 25){
    obj.classList.add("holiday")
  }
}


function addPayrollDates(currentDate, obj) {
  const startDate = new Date("2024-06-26"); // June 25, 2024
  const differenceInDays = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));
  if (differenceInDays % 14 === 0) {
    obj.classList.add("payroll-date");
  }
}

const shiftData = {
  "i": {
    "shiftSchedule":[ "night", "night", "night","dayoff", "dayoff", "dayoff", "dayoff", "dayoff", "dayoff", "day", "day", "day"],
    "day-color": "#95d5b2",
    "night-color": "#2d6a4f"
  }
}