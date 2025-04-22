const timers = JSON.parse(localStorage.getItem("timers")) || [];
const container = document.getElementById("savedTimers");

if (timers.length === 0) {
    container.innerHTML = "<p class='text-muted'>No saved timers.</p>";
}

timers.forEach((timer, index) => {
    const div = document.createElement("div");
    div.className = "saved-timer-card";

    const link = timer.type === "Count Up" ? "countup.html" : "countdown.html";
    const query = `?name=${encodeURIComponent(timer.name)}&time=${encodeURIComponent(timer.target)}`;

    div.innerHTML = `
        <strong>${timer.name}</strong><br>
        Type: ${timer.type}<br>
        Time: ${timer.target}<br>
        <div class="mt-2 d-flex gap-2">
            <a href="${link}${query}" class="btn btn-sm btn-outline-success">Use</a>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteTimer(${index})">Delete</button>
        </div>
    `;
    container.appendChild(div);
});

function deleteTimer(index) {
    if (confirm("Are you sure you want to delete this timer?")) {
        timers.splice(index, 1);
        localStorage.setItem("timers", JSON.stringify(timers));
        location.reload();
    }
}
