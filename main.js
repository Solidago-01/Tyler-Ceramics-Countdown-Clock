//Menu Button
const menu_button = document.getElementById("menu-button");

menu_button.addEventListener("click", function() {
    console.log("clicked");
});

// Menu
// 

// Update min & max datetime for input field from current datetime
function update_date_time_min() {
    let current = new Date();
    let current_year = current.getFullYear();
    let current_month = current.getMonth() + 1;
    let current_adjusted_month = current_month.toString().padStart(2,"0");
    let current_day = current.getDate().toString().padStart(2,"0");
    let current_hours = current.getHours().toString().padStart(2,"0");
    let current_minutes = current.getMinutes().toString().padStart(2,"0");
    let min_day_time = (current_year+"-"+current_adjusted_month+"-"+current_day+"T"+current_hours+":"+current_minutes);
    document.getElementById("cutoff").min = min_day_time;
    let future_year = current.getFullYear() + 1;
    let max_day_time = (future_year+"-"+current_adjusted_month+"-"+current_day+"T"+current_hours+":"+current_minutes);
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

// Event Handler
update_date_time_min();
setInterval(update_countdown_clock, 1000);
