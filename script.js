const tracker = document.getElementById('tracker');

const data = [
  {
    month: "December 2025: Frontend + DSA Basics",
    tasks: [
      "Revise HTML structure, forms, tables",
      "Learn CSS Flexbox, Grid, media queries",
      "Add animations using CSS transitions",
      "Practice JS Arrays, Objects, DOM",
      "Explore Fetch API with JSON data",
      "Use Git & GitHub for version control",
      "DSA: Arrays Basics - Reverse, Max/Min",
      "DSA: Sorting/Searching - Selection + Binary Search",
      "DSA: Strings - Palindrome, Anagram",
      "DSA: Recursion Basics - Factorial, Power"
    ]
  },
  {
    month: "January 2026: React Basics + Arrays Advanced",
    tasks: [
      "React setup + folder structure",
      "Learn Components, Props, State",
      "Master useState, useEffect hooks",
      "Conditional rendering, lists, keys",
      "Use Tailwind CSS for styling",
      "LocalStorage practice in React",
      "DSA: Kadane's Algorithm",
      "DSA: Merge Intervals",
      "DSA: Sliding Window",
      "DSA: Two Pointer"
    ]
  },
  {
    month: "February 2026: React Advanced + Linked List",
    tasks: [
      "useContext, useRef, custom hooks",
      "Routing with React Router",
      "Controlled forms + validation",
      "Reusable components",
      "Axios for API calls",
      "DSA: Linked List Basics",
      "DSA: Reverse LL",
      "DSA: Detect Loop",
      "DSA: Merge LLs"
    ]
  },
  {
    month: "March 2026: Backend + Stack/Queue",
    tasks: [
      "Node.js basics, npm, express setup",
      "REST routes + CRUD operations",
      "MongoDB + Mongoose models",
      "JWT auth + bcrypt",
      "Middleware & error handling",
      "DSA: Stack Basics",
      "DSA: Valid Parentheses",
      "DSA: Queue Basics",
      "DSA: Monotonic Stack"
    ]
  },
  {
    month: "April 2026: MERN Integration + Trees + Deployment",
    tasks: [
      "Connect frontend ↔ backend (Axios)",
      "CRUD + Auth integration",
      "Deploy backend (Render) + frontend (Vercel)",
      "Use MongoDB Atlas cloud DB",
      "DSA: Recursion - Subsets, Power Set",
      "DSA: Tree Traversals",
      "DSA: BST - Insert, Search, Min/Max",
      "DSA: Tree Height"
    ]
  }
];

// Load tasks from localStorage
let storedTasks = JSON.parse(localStorage.getItem('trackerTasks')) || {};

function createMonth(monthData, monthIndex){
  const monthDiv = document.createElement('div');
  monthDiv.className = 'month';

  const header = document.createElement('div');
  header.className = 'month-header';
  header.innerHTML = `<span>${monthData.month}</span><span>▼</span>`;
  monthDiv.appendChild(header);

  const tasksDiv = document.createElement('div');
  tasksDiv.className = 'tasks';

  monthData.tasks.forEach((task, i) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = storedTasks[monthIndex]?.[i] || false;
    if(checkbox.checked) taskItem.classList.add('completed');

    const label = document.createElement('span');
    label.textContent = task;

    checkbox.addEventListener('change', () => {
      taskItem.classList.toggle('completed');
      storedTasks[monthIndex] = storedTasks[monthIndex] || [];
      storedTasks[monthIndex][i] = checkbox.checked;
      localStorage.setItem('trackerTasks', JSON.stringify(storedTasks));
      updateProgress(monthIndex, tasksDiv);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    tasksDiv.appendChild(taskItem);
  });

  // Progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const progressFill = document.createElement('div');
  progressFill.className = 'progress-fill';
  progressBar.appendChild(progressFill);
  tasksDiv.appendChild(progressBar);

  // Initial progress
  updateProgress(monthIndex, tasksDiv);

  header.addEventListener('click', () => {
    tasksDiv.style.display = tasksDiv.style.display === 'block' ? 'none' : 'block';
  });

  monthDiv.appendChild(tasksDiv);
  tracker.appendChild(monthDiv);
}

function updateProgress(monthIndex, tasksDiv){
  const checkboxes = tasksDiv.querySelectorAll('input[type="checkbox"]');
  const fill = tasksDiv.querySelector('.progress-fill');
  const completed = [...checkboxes].filter(cb => cb.checked).length;
  const total = checkboxes.length;
  const percent = total ? (completed / total) * 100 : 0;
  fill.style.width = percent + '%';
}

// Initialize tracker
data.forEach((month, index) => createMonth(month, index));
