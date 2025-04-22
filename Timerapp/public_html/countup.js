let interval;

document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startBtn");
    const saveBtn = document.getElementById("saveBtn");

    startBtn.addEventListener("click", startCountUp);
    saveBtn.addEventListener("click", saveCountUpTimer);
});

function startCountUp() {
    clearInterval(interval);
    const input = document.getElementById("startTime");
    const startTime = new Date(input.value);
    if (isNaN(startTime)) {
        alert("Please select a valid date and time.");
        return;
    }

    interval = setInterval(() => {
        const now = new Date();
        const diff = new Date(now - startTime);
        const hours = String(diff.getUTCHours()).padStart(2, '0');
        const minutes = String(diff.getUTCMinutes()).padStart(2, '0');
        const seconds = String(diff.getUTCSeconds()).padStart(2, '0');
        document.getElementById('countupDisplay').textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function saveCountUpTimer() {
    const input = document.getElementById("startTime");
    const startTime = input.value;
    if (!startTime) {
        alert("Please choose a start time before saving.");
        return;
    }

    const timers = JSON.parse(localStorage.getItem("timers")) || [];
    timers.push({
        name: "Custom Count Up",
        type: "Count Up",
        target: startTime
    });
    localStorage.setItem("timers", JSON.stringify(timers));
    alert("Timer saved successfully!");
}
