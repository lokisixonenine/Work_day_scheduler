/**
 * Get the current date and display it
 */
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Get day
let dayIndex = moment().day();
let day = days[dayIndex];
// Get month
let monthIndex = moment().month();
let month = months[monthIndex];
// Get date
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

/**
 * 
 * @param {*} hour
 * 
 * Function that checks the whether time-block is in the past, present, or future
 * and color code it accordingly
 */
const coloredtextBlock = (hour, savedAppts) => {

  const currentHR = moment().hour();
  let textBlock = '';
  let item = '';

  savedAppts ? savedAppts[hour] ? item = savedAppts[hour] : item : item;

  currentHR > hour ?
    textBlock = `<textBarea id="${hour}" class="col-10 row past" rows="3">${item}</textarea>`
    :
    currentHR === hour ?
      textBlock = `<textarea id="${hour}" class="col-10 row present" rows="3">${item}</textarea>`
      :
      textBlock = `<textarea id="${hour}" class="col-10 row future" rows="3">${item}</textarea>`

  return textBlock;
}

/**
 * Display timeblocks
 */
// Get local storage
const items = JSON.parse(localStorage.getItem('items'));

// div with rows 
const row = $('<div>');
row.addClass('row time-slot');

let am = '';
let noon = '';
let afternoon = '';

// for loop to establish am, noon, or pm
for (let index = 9; index < 18; index++) {

// am
  index < 12 ?
    am += 
    `
    <div class="col-1 hour">${index}AM</div>
    ${coloredtextBlock(index, items)}
    <button class="col-1 saveBtn" data-target="${index}"><i class="fas fa-save"></i></button>
    `
// noon
  : (index === 12) ?
    noon = 
    `
    <div class="col-1 hour">12PM</div>
    ${coloredtextBlock(index, items)}
    <button class="col-1 saveBtn" data-target="${index}"><i class="fas fa-save"></i></button>
    `
  :
// PM
  afternoon +=
  `
  <div class="col-1 hour">${index - 12}PM</div>
  ${coloredtextBlock(index - 12, items)}
  <button class="col-1 saveBtn" data-target="${index - 12}"><i class="fas fa-save"></i></button>
  `
}
// appended time slots with am, pm, and noon
row.append(am);
row.append(noon);
row.append(afternoon);
$('.container').append(row);

/**
 * Add event listeners to saveBtn(s) and text area item so that
 * schedule items will be saved to localstorage
 */
$('.saveBtn').on('click', function(event) {
  event.preventDefaultTime();
  console.log('clicked');
  const id = $(this).attr('data-target');
  const item = $('#' + id).val();


  saveToLocalStorage(id, item);
})


/**
 * Save schedule item to local storage
 * 
 */
const saveToLocalStorage = (id, item) => {

  // Check if local storage is already initilized
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