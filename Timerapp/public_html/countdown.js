let countdownInterval;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startBtn").addEventListener("click", startCountdown);
    document.getElementById("saveBtn").addEventListener("click", saveCountdownTimer);
});

function startCountdown() {
    clearInterval(countdownInterval);
    const input = document.getElementById("endTime");
    const endTime = new Date(input.value);
    if (isNaN(endTime)) {
        alert("Please select a valid future date and time.");
        return;
    }

    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdownDisplay").textContent = "Time's up!";
            return;
        }

        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        document.getElementById("countdownDisplay").textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function saveCountdownTimer() {
    const input = document.getElementById("endTime");
    const endTime = input.value;
    if (!endTime) {
        alert("Please choose an end time before saving.");
        return;
    }

    const timers = JSON.parse(localStorage.getItem("timers")) || [];
    timers.push({
        name: "Custom Countdown",
        type: "Countdown",
        target: endTime
    });
    localStorage.setItem("timers", JSON.stringify(timers));
    alert("Timer saved successfully!");
}
