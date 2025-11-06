    const tracker = document.getElementById("tracker");

const data = [
  {
    month: "December 2025: Frontend + DSA Basics",
    devTasks: [
      "Revise HTML structure, forms, tables",
      "Learn CSS Flexbox, Grid, media queries",
      "Add animations using CSS transitions",
      "Practice JS Arrays, Objects, DOM",
      "Explore Fetch API with JSON data",
      "Use Git & GitHub for version control",
    ],
    projects: [
      "🌦️ Weather App – Fetch API + DOM",
      "🎵 Music Visualizer – CSS Animations + Events",
      "🧠 Typing Speed Tracker – Timers, Random Text",
      "📖 Interactive Resume – Responsive HTML/CSS",
    ],
    dsaTasks: [
      "Arrays Basics – Reverse, Max/Min",
      "Sorting/Searching – Selection + Binary Search",
      "Strings – Palindrome, Anagram",
      "Recursion – Factorial, Power",
    ],
  },
  {
    month: "January 2026: React + Advanced Arrays",
    devTasks: [
      "React setup + folder structure",
      "Learn Components, Props, State",
      "Master useState & useEffect hooks",
      "Conditional rendering, lists, keys",
      "Tailwind CSS setup",
      "LocalStorage practice in React",
    ],
    projects: [
      "🧠 Quote Generator – Async fetch + React state",
      "🎬 Movie Explorer – API integration + pagination",
      "📊 Expense Tracker – Hooks + localStorage",
      "⚡ Flashcards Tool – CRUD + props",
    ],
    dsaTasks: [
      "Kadane’s Algorithm",
      "Merge Intervals",
      "Sliding Window",
      "Two Pointer Problems",
    ],
  },
];

let stored = JSON.parse(localStorage.getItem("ebinProgress")) || {};

function createSection(title, tasks, monthIndex, type) {
  const sectionTitle = document.createElement("div");
  sectionTitle.className = "category";
  sectionTitle.textContent = title;

  const container = document.createElement("div");

  tasks.forEach((task, i) => {
    const key = `${monthIndex}-${type}-${i}`;
    const checked = stored[key] || false;

    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${checked ? "completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;

    const label = document.createElement("span");
    label.textContent = task;

    checkbox.addEventListener("change", () => {
      stored[key] = checkbox.checked;
      localStorage.setItem("ebinProgress", JSON.stringify(stored));
      taskItem.classList.toggle("completed");
      updateProgress(container.parentElement.parentElement);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    container.appendChild(taskItem);
  });

  return { sectionTitle, container };
}

function createMonth(monthData, monthIndex) {
  const monthDiv = document.createElement("div");
  monthDiv.className = "month";

  const header = document.createElement("div");
  header.className = "month-header";
  header.innerHTML = `<span>${monthData.month}</span><i class="lucide lucide-chevron-down"></i>`;

  const tasksDiv = document.createElement("div");
  tasksDiv.className = "tasks";

  const dev = createSection("Development Tasks", monthData.devTasks, monthIndex, "dev");
  const proj = createSection("Projects", monthData.projects, monthIndex, "proj");
  const dsa = createSection("DSA Tasks", monthData.dsaTasks, monthIndex, "dsa");

  const progressBox = document.createElement("div");
  progressBox.className = "progress-container";
  progressBox.innerHTML = `
    <div class="progress-info">
      <span>Progress</span>
      <span class="progress-percent">0%</span>
    </div>
    <div class="progress-bar"><div class="progress-fill"></div></div>
  `;

  tasksDiv.append(
    dev.sectionTitle,
    dev.container,
    proj.sectionTitle,
    proj.container,
    dsa.sectionTitle,
    dsa.container,
    progressBox
  );

  header.addEventListener("click", () => {
    const expanded = tasksDiv.style.display === "block";
    tasksDiv.style.display = expanded ? "none" : "block";
    header.querySelector("i").classList.toggle("lucide-chevron-down");
    header.querySelector("i").classList.toggle("lucide-chevron-up");
  });

  monthDiv.append(header, tasksDiv);
  tracker.appendChild(monthDiv);

  updateProgress(monthDiv);
}

function updateProgress(monthDiv) {
  const checkboxes = monthDiv.querySelectorAll(".tasks input[type='checkbox']");
  const fill = monthDiv.querySelector(".progress-fill");
  const percentText = monthDiv.querySelector(".progress-percent");
  const total = checkboxes.length;
  const done = Array.from(checkboxes).filter((c) => c.checked).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  fill.style.width = `${percent}%`;
  percentText.textContent = `${percent}%`;
}

// Render
data.forEach((m, i) => createMonth(m, i));
