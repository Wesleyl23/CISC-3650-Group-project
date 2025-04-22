let countdownInterval;
let paused = false;
let remainingTime = 0;
let endTimestamp = 0;

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    if (params.has("name")) {
        document.getElementById("timerName").value = params.get("name");
    }
    if (params.has("time")) {
        document.getElementById("startTime").value = params.get("time");
    }

    document.getElementById("startBtn").addEventListener("click", startCountUp);
    document.getElementById("pauseBtn").addEventListener("click", pauseCountUp);
    document.getElementById("saveBtn").addEventListener("click", saveCountUpTimer);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startBtn").addEventListener("click", startCountdown);
    document.getElementById("pauseBtn").addEventListener("click", pauseCountdown);
    document.getElementById("saveBtn").addEventListener("click", saveCountdownTimer);
});

function startCountdown() {
    clearInterval(countdownInterval);
    const input = document.getElementById("endTime");
    const nameInput = document.getElementById("timerName");

    if (!input.value || !nameInput.value.trim()) {
        alert("Please enter a timer name and end time.");
        return;
    }

    endTimestamp = new Date(input.value).getTime();
    remainingTime = endTimestamp - new Date().getTime();
    paused = false;
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    if (paused) return;

    const now = new Date().getTime();
    const timeLeft = endTimestamp - now;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdownDisplay").textContent = "Time's up!";
        return;
    }

    const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
    document.getElementById("countdownDisplay").textContent = `${hours}:${minutes}:${seconds}`;
}

function pauseCountdown() {
    if (!paused) {
        paused = true;
        clearInterval(countdownInterval);
        remainingTime = endTimestamp - new Date().getTime();
        document.getElementById("pauseBtn").textContent = "Resume";
    } else {
        paused = false;
        endTimestamp = new Date().getTime() + remainingTime;
        countdownInterval = setInterval(updateCountdown, 1000);
        document.getElementById("pauseBtn").textContent = "Pause";
    }
}

function saveCountdownTimer() {
    const name = document.getElementById("timerName").value.trim();
    const endTime = document.getElementById("endTime").value;
    if (!name || !endTime) {
        alert("Please fill out the name and end time before saving.");
        return;
    }

    const timers = JSON.parse(localStorage.getItem("timers")) || [];
    timers.push({
        name,
        type: "Countdown",
        target: endTime
    });
    localStorage.setItem("timers", JSON.stringify(timers));
    alert("Timer saved!");
}
