// Declaring variables/constructing arrays
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Setting the day for the date displayed in the jumbotron
let varDay = moment().day();
let day = days[varDay];

// Setting the month for the date displayed in the jumbotron
let varMonth = moment().month();
let month = months[varMonth];

// Setting the suffix for the numerical value of time or date (i.e. 1st, 2nd, 3rd, etc.) in the jumbotron
let date = moment().date();
switch (date) {
  case 1:
    date += 'st';
    break;
  case 2:
    date += 'nd';
    break;
  case 3:
    date += 'rd';
    break;
  case 21:
    date += 'st';
  case 22:
    date += 'nd';
    break;
  case 23:
    date += 'rd';
    break;
  default:
    date += 'th';
    break;
}

let today = `${day}, ${month} ${date}`;
$('#currentDay').text(today);

// Function that checks the past, present, or future
 
const coloredTextArea = (hour, savedAppts) => {

  const currentHR = moment().hour();
  let textBlock = '';
  let item = '';

  savedAppts ? savedAppts[hour] ? item = savedAppts[hour] : item : item;

  currentHR > hour ?
    textBlock = `<textarea id="${hour}" class="col-10 row past" rows="3">${item}</textarea>`
    :
    currentHR === hour ?
      textBlock = `<textarea id="${hour}" class="col-10 row present" rows="3">${item}</textarea>`
      :
      textBlock = `<textarea id="${hour}" class="col-10 row future" rows="3">${item}</textarea>`

  return textBlock;
}

// Accessing/getting localStorage
const items = JSON.parse(localStorage.getItem('items'));

// Div with rows 
const row = $('<div>');
row.addClass('row time-slot');

let am = '';
let noon = '';
let afternoon = '';

// for loop to establish time of day (i.e. am, noon, or pm)
for (let index = 9; index < 18; index++) {

// AM
  index < 12 ?
    am += 
    `<div class="col-1 hour">${index}AM</div>
    ${coloredTextArea(index, items)}
    <button class="col-1 saveBtn" data-target="${index}"><i class="fas fa-save"></i></button>`
// Noon
  : (index === 12) ?
    noon = 
    `<div class="col-1 hour">12PM</div>
    ${coloredTextArea(index, items)}
    <button class="col-1 saveBtn" data-target="${index}"><i class="fas fa-save"></i></button>`
  :
// PM
  afternoon +=
  `<div class="col-1 hour">${index - 12}PM</div>
  ${coloredTextArea(index - 12, items)}
  <button class="col-1 saveBtn" data-target="${index - 12}"><i class="fas fa-save"></i></button>`
}

// appended time slots with am, pm, and noon
row.append(am);
row.append(noon);
row.append(afternoon);
$('.container').append(row);

// add event listners to buttons so that they save scheduled items to localStorage
$('.saveBtn').on('click', function(event) {
  event.preventDefaultTime();
  console.log('clicked');
  const id = $(this).attr('data-target');
  const item = $('#' + id).val();
  saveToLocalStorage(id, item);
})


// saves schedule to localStorage
const saveToLocalStorage = (id, item) => {

  if(localStorage.items) {
    const items = JSON.parse(localStorage.getItem('items'));
    items[id] = item;
    localStorage.setItem('items', JSON.stringify(items));
  } else {
    const items = {};
    items[id] = item;
    localStorage.setItem('items', JSON.stringify(items));
  }

}