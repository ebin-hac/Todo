  const tracker = document.getElementById("tracker");
let storage = JSON.parse(localStorage.getItem("ebinWeekly")) || {};

const roadmap = [
  {
    month: "December 2025 — Frontend + DSA Basics",
    weeks: [
      {
        name: "Week 1 — HTML & Forms",
        tasks: ["Revise HTML structure, forms, tables"],
      },
      {
        name: "Week 2 — CSS Layouts",
        tasks: ["Learn Flexbox, Grid, media queries"],
      },
      {
        name: "Week 3 — JavaScript Basics",
        tasks: ["Arrays, Objects, DOM manipulation"],
      },
      {
        name: "Week 4 — Fetch API + GitHub",
        tasks: ["Use Fetch API with JSON", "Push project to GitHub"],
      },
    ],
    projects: [
      "🌦️ Weather App — Fetch API + DOM",
      "🎵 Music Mood Visualizer — CSS Animations + Events",
      "🧠 Typing Speed Tracker — JS Timers + Random Text",
      "📖 Interactive Resume Page — Responsive CSS Grid",
    ],
  },
  {
    month: "January 2026 — React + Advanced Arrays",
    weeks: [
      {
        name: "Week 1 — React Setup",
        tasks: ["Initialize project, folder structure"],
      },
      {
        name: "Week 2 — Components & Props",
        tasks: ["Build re-usable UI elements"],
      },
      {
        name: "Week 3 — Hooks & Effects",
        tasks: ["Practice useState, useEffect"],
      },
      {
        name: "Week 4 — Tailwind & LocalStorage",
        tasks: ["Apply Tailwind CSS", "Save app data locally"],
      },
    ],
    projects: [
      "🧠 Quote Generator — Fetch + React State",
      "🎬 Movie Explorer — API integration + pagination",
      "📊 Expense Tracker — useState + localStorage",
      "⚡ Flashcards Tool — CRUD + Props",
    ],
  },
  {
    month: "February 2026 — React Advanced + Linked Lists",
    weeks: [
      { name: "Week 1 — Context API", tasks: ["Manage global state"] },
      { name: "Week 2 — Routing", tasks: ["Navigate with React Router"] },
      { name: "Week 3 — Axios", tasks: ["API requests with Axios"] },
      { name: "Week 4 — Forms & Validation", tasks: ["Build controlled forms"] },
    ],
    projects: [
      "📚 Study Planner — Context API + Router",
      "🎧 Podcast Library — API + CRUD",
      "🎯 Productivity Tracker — Charts + State Management",
    ],
  },
  {
    month: "March 2026 — Backend + Stack/Queue",
    weeks: [
      { name: "Week 1 — Node & Express", tasks: ["Basic setup, routing"] },
      { name: "Week 2 — CRUD APIs", tasks: ["Create REST endpoints"] },
      { name: "Week 3 — MongoDB", tasks: ["Schemas, models, queries"] },
      { name: "Week 4 — Auth", tasks: ["JWT, bcrypt, Middleware"] },
    ],
    projects: [
      "💬 Auth API — JWT + bcrypt",
      "🗒️ Notes Backend — CRUD + Auth",
      "📦 File Share API — Upload + Share Links",
    ],
  },
  {
    month: "April 2026 — MERN Integration + Trees",
    weeks: [
      { name: "Week 1 — Connect Frontend & Backend", tasks: ["Axios integration"] },
      { name: "Week 2 — CRUD + Auth Merge", tasks: ["Connect APIs to React"] },
      { name: "Week 3 — Deployment", tasks: ["Host frontend + backend"] },
      { name: "Week 4 — Final Polish", tasks: ["Add docs, fix UI"] },
    ],
    projects: [
      "🎓 SkillSync — Study Resource Tracker (MERN)",
      "💬 CodeTalk — Developer Forum + Comments",
      "📈 HabitFlow — Productivity Dashboard",
    ],
  },
];

function createWeek(week, mIndex, wIndex) {
  const weekDiv = document.createElement("div");
  weekDiv.className = "week";

  const header = document.createElement("div");
  header.className = "week-header";
  header.innerHTML = `${week.name} <i class="lucide lucide-chevron-down"></i>`;

  const content = document.createElement("div");
  content.className = "week-content";

  week.tasks.forEach((t, tIndex) => {
    const key = `${mIndex}-${wIndex}-${tIndex}`;
    const checked = storage[key] || false;

    const item = document.createElement("div");
    item.className = `task-item ${checked ? "completed" : ""}`;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = checked;

    const label = document.createElement("span");
    label.textContent = t;

    cb.addEventListener("change", () => {
      storage[key] = cb.checked;
      localStorage.setItem("ebinWeekly", JSON.stringify(storage));
      item.classList.toggle("completed");
      updateProgress(weekDiv.parentElement.parentElement);
    });

    item.append(cb, label);
    content.appendChild(item);
  });

  header.addEventListener("click", () => {
    const open = content.style.display === "block";
    content.style.display = open ? "none" : "block";
    header.querySelector("i").classList.toggle("lucide-chevron-up");
  });

  weekDiv.append(header, content);
  return weekDiv;
}

function createMonth(month, mIndex) {
  const monthDiv = document.createElement("div");
  monthDiv.className = "month";

  const header = document.createElement("div");
  header.className = "month-header";
  header.innerHTML = `${month.month} <i class="lucide lucide-chevron-down"></i>`;

  const tasks = document.createElement("div");
  tasks.className = "tasks";

  month.weeks.forEach((w, wIndex) => {
    tasks.appendChild(createWeek(w, mIndex, wIndex));
  });

  const projLabel = document.createElement("div");
  projLabel.className = "week-header";
  projLabel.style.marginTop = "1rem";
  projLabel.innerHTML = "💻 Projects";
  const projList = document.createElement("div");
  projList.className = "week-content";
  projList.style.display = "block";
  month.projects.forEach((p) => {
    const item = document.createElement("div");
    item.className = "task-item";
    item.innerHTML = `<span>${p}</span>`;
    projList.appendChild(item);
  });

  const progressBox = document.createElement("div");
  progressBox.className = "progress-container";
  progressBox.innerHTML = `
    <div class="progress-info">
      <span>Progress</span>
      <span class="progress-percent">0%</span>
    </div>
    <div class="progress-bar"><div class="progress-fill"></div></div>
  `;

  tasks.append(projLabel, projList, progressBox);

  header.addEventListener("click", () => {
    const open = tasks.style.display === "block";
    tasks.style.display = open ? "none" : "block";
  });

  monthDiv.append(header, tasks);
  tracker.appendChild(monthDiv);

  updateProgress(monthDiv);
}

function updateProgress(monthDiv) {
  const checks = monthDiv.querySelectorAll(".tasks input[type='checkbox']");
  const fill = monthDiv.querySelector(".progress-fill");
  const percentText = monthDiv.querySelector(".progress-percent");
  const total = checks.length;
  const done = Array.from(checks).filter((c) => c.checked).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  fill.style.width = `${percent}%`;
  percentText.textContent = `${percent}%`;
}

roadmap.forEach((m, i) => createMonth(m, i));
