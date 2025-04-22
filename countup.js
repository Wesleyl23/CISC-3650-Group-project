let interval;
let paused = false;
let pausedTime = 0;
let startTimestamp = 0;

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
    document.getElementById("startBtn").addEventListener("click", startCountUp);
    document.getElementById("pauseBtn").addEventListener("click", pauseCountUp);
    document.getElementById("saveBtn").addEventListener("click", saveCountUpTimer);
});

function startCountUp() {
    clearInterval(interval);
    const input = document.getElementById("startTime");
    const nameInput = document.getElementById("timerName");

    if (!input.value || !nameInput.value.trim()) {
        alert("Please enter a timer name and start time.");
        return;
    }

    startTimestamp = new Date(input.value).getTime();
    pausedTime = 0;
    paused = false;

    interval = setInterval(updateCountUp, 1000);
}

function updateCountUp() {
    if (paused) return;
    const now = new Date().getTime();
    const diff = new Date(now - startTimestamp - pausedTime);

    const hours = String(diff.getUTCHours()).padStart(2, '0');
    const minutes = String(diff.getUTCMinutes()).padStart(2, '0');
    const seconds = String(diff.getUTCSeconds()).padStart(2, '0');

    document.getElementById('countupDisplay').textContent = `${hours}:${minutes}:${seconds}`;
}

function pauseCountUp() {
    paused = !paused;
    if (paused) {
        pausedTime += new Date().getTime() - startTimestamp - pausedTime;
        document.getElementById("pauseBtn").textContent = "Resume";
    } else {
        startTimestamp = new Date().getTime() - (pausedTime);
        document.getElementById("pauseBtn").textContent = "Pause";
    }
}

function saveCountUpTimer() {
    const name = document.getElementById("timerName").value.trim();
    const startTime = document.getElementById("startTime").value;
    if (!name || !startTime) {
        alert("Please fill out the name and start time before saving.");
        return;
    }

    const timers = JSON.parse(localStorage.getItem("timers")) || [];
    timers.push({
        name,
        type: "Count Up",
        target: startTime
    });
    localStorage.setItem("timers", JSON.stringify(timers));
    alert("Timer saved!");
}
