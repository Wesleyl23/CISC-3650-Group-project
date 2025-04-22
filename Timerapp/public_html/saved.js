const timers = [
    { name: "Project Due", type: "Countdown", target: "2025-05-01T12:00" },
    { name: "Contract Tracker", type: "Count Up", target: "2023-08-28T00:00" }
];

const container = document.getElementById("savedTimers");
timers.forEach(timer => {
    const div = document.createElement("div");
    div.className = "mb-3 p-3 border rounded bg-white shadow-sm";
    div.innerHTML = `<strong>${timer.name}</strong><br>Type: ${timer.type}<br>Time: ${timer.target}`;
    container.appendChild(div);
});
