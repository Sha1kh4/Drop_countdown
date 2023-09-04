function startTimer(duration, output) {
    var timer = duration,
        minutes, seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        output.innerhtml = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
    return output;
}

window.onload = function() {
    const date = new Date();
    var diff = date.getDay() - 3,
        timer = document.getElementById('#timer');
    if (diff > 0) {
        date.setDate(date.getDate() + 3);
    } else if (diff < 0) {
        date.setDate(date.getDate() + ((-1) * diff))
    }
    startTimer(diff, timer);
    console.log
};