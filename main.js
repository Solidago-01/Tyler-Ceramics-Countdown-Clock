// // Sidebar Button Handler
// const resize_button = document.getElementById("resize");

// resize_button.addEventListener("click", function(e) {
//     e.preventDefault();
//     document.body.classList.toggle("sb-expand");
// });

// Update min date/time in input field to current 
function update_date_time_min() {
    let current = new Date();
    let current_year = current.getFullYear();
    let current_month = current.getMonth() + 1;
    let current_adjusted_month = current_month.toString().padStart(2,"0");
    let current_day = current.getDate().toString().padStart(2,"0");
    let current_hours = current.getHours().toString().padStart(2,"0");
    let current_minutes = current.getMinutes().toString().padStart(2,"0");
    let min_day_time = (current_year+"-"+current_adjusted_month+"-"+current_day+"T"+current_hours+":"+current_minutes);
    document.getElementById("cutoff").value = min_day_time;
    document.getElementById("cutoff").min = min_day_time;
}
update_date_time_min();


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

setInterval(update_countdown_clock, 1000);
