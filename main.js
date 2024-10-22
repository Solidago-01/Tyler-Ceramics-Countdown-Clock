// Edit and Save Button Functions
function update_messages_and_datetime() {
  let message_one_input = document.getElementById("message-1-input");
  document.getElementById("message-1").innerHTML = message_one_input.value;
  let message_two_input = document.getElementById("message-2-input");
  document.getElementById("message-2").innerHTML = message_two_input.value;
  
  let datetime_input = document.getElementById("cutoff").value;
  let current_user_datetime = new Date(datetime_input).toString();
  document.getElementById("cutoff-datetime-text").innerHTML = current_user_datetime.split('GMT')[0];
}

function make_input_fields_invisible() {
  document.getElementById("message-1-input").style.display = "none";
  document.getElementById("message-2-input").style.display = "none";
  document.getElementById("cutoff").style.display = "none";
}

function make_input_fields_visible() {
  document.getElementById("message-1-input").style.display = "block";
  document.getElementById("message-2-input").style.display = "block";
  document.getElementById("cutoff").style.display = "block";
}

function make_message_fields_invisible() {
  document.getElementById("message-1").style.display = "none";
  document.getElementById("message-2").style.display = "none";
  document.getElementById("cutoff-datetime-text").style.display = "none";
}

function make_message_fields_visible() {
  document.getElementById("message-1").style.display = "block";
  document.getElementById("message-2").style.display = "block";
  document.getElementById("cutoff-datetime-text").style.display = "block";
}

//Edit and Save Button
const menu_button = document.getElementById("menu-button");
menu_button.addEventListener("click", function() {
    if (menu_button.innerText == "edit") {
      menu_button.innerText = "save";
      make_input_fields_visible();
      make_message_fields_invisible();
    } else {
      menu_button.innerText = "edit";
      update_messages_and_datetime();
      make_input_fields_invisible();
      make_message_fields_visible();
    };
});

// Update min & max datetime for input field from current datetime
function update_datetime_min_max_and_value() {
    // Reformat current date and time
    let current = new Date();
    let current_year = current.getFullYear();
    let current_month = current.getMonth() + 1;
    let current_adjusted_month = current_month.toString().padStart(2,"0");
    let current_day = current.getDate().toString().padStart(2,"0");
    let current_hours = current.getHours().toString().padStart(2,"0");
    let current_minutes = current.getMinutes().toString().padStart(2,"0");
    let min_day_time = (current_year+"-"+current_adjusted_month+"-"+current_day+"T"+current_hours+":"+current_minutes);
    let future_year = current.getFullYear() + 1;
    let max_day_time = (future_year+"-"+current_adjusted_month+"-"+current_day+"T"+current_hours+":"+current_minutes);
    let starting_value = (current_year+"-"+current_adjusted_month+"-"+(Number(current_day)+1)+"T"+current_hours+":"+current_minutes);
    
    // Set values for HTML input field
    document.getElementById("cutoff").min = min_day_time;
    document.getElementById("cutoff").value = starting_value;
    document.getElementById("cutoff").max = max_day_time;
}   
// Countdown Clock Handler
function update_countdown_clock() {

    let user_input = new Date(document.getElementById("cutoff").value);
    let user_set_deadline = (user_input.toDateString() + " " + 
        user_input.getHours().toString().padStart(2,"0")
        + ":" + user_input.getMinutes().toString().padStart(2,"0") + ":00");
    
    // Converting string to required date format 
    let deadline = new Date(user_set_deadline).getTime();
    
    // Getting current time in required format
    let now = new Date().getTime();
    
    // Calculating the difference
    let t = deadline - now;
    
    // Getting value of days, hours, minutes, seconds
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
    (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor(
    (t % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor(
    (t % (1000 * 60)) / 1000);
    
    // Output the remaining time
    document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + 
    minutes + "m " + seconds + "s ";
    
    // Output for over time
    if (t < 0) {
    clearInterval();
    document.getElementById("countdown").innerHTML = "Time's Up!";
    }
}

// On Load
update_datetime_min_max_and_value();
update_messages_and_datetime();
// On Loop
setInterval(update_countdown_clock, 1000);
