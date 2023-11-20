const config = {

    TargetDate: "11/22/2023 12:00 AM GMT",
    CountActive: true,
    CountStepper: -1,
    LeadingZero: true,
    DisplayFormat: "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.",
    FinishMessage: "CS 2 xp cap has been reset!"
};

function GetnextDropDate(CurrentDate, TargetDay) {
    const DaysLeft = (TargetDay - CurrentDate.getDay() + 7) % 7;
    const Nextdate = new Date(CurrentDate);
    Nextdate.setDate(CurrentDate.getDate() + DaysLeft);
    return Nextdate;
}

const today = new Date();
const initialTargetDate = new Date(config.TargetDate);
const TargetDayOfWeek = initialTargetDate.getDay();
const Nextdate = GetnextDropDate(today, TargetDayOfWeek);
Nextdate.setUTCHours(0, 0, 0, 0);
config.TargetDate = Nextdate.toISOString().slice(0, 19).replace("T", " ") + " GMT";


function calcage(secs, num1, num2) {
    let s = ((Math.floor(secs / num1)) % num2).toString();
    if (config.LeadingZero && s.length < 2) {
        s = "0" + s;
    }
    return "<b>" + s + "</b>";
}

function updateTimerDisplay(secs) {
    if (secs < 0) {
        document.getElementById("timer").innerHTML = config.FinishMessage;
        return;
    }

    let displayStr = config.DisplayFormat.replace(/%%D%%/g, calcage(secs, 86400, 100000))
        .replace(/%%H%%/g, calcage(secs, 3600, 24))
        .replace(/%%M%%/g, calcage(secs, 60, 60))
        .replace(/%%S%%/g, calcage(secs, 1, 60));

    document.getElementById("timer").innerHTML = displayStr;

    if (config.CountActive) {
        setTimeout(() => {
            updateTimerDisplay(secs + config.CountStepper);
        }, config.SetTimeOutPeriod);
    }
}

config.CountStepper = Math.ceil(config.CountStepper);
if (config.CountStepper === 0) {
    config.CountActive = false;
}
config.SetTimeOutPeriod = (Math.abs(config.CountStepper) - 1) * 1000 + 990;

const initialDiff = config.CountStepper > 0 ? today - initialTargetDate : initialTargetDate - today;
const initialSecs = Math.floor(initialDiff.valueOf() / 1000);
updateTimerDisplay(initialSecs);