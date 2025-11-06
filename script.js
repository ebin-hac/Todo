 document.querySelectorAll('.month').forEach((month, index) => {
  const checkboxes = month.querySelectorAll('input[type="checkbox"]');
  const progressFill = month.querySelector('.progress-fill');
  const key = `month${index + 1}_progress`;

  // Load saved progress
  const saved = JSON.parse(localStorage.getItem(key)) || [];
  checkboxes.forEach((cb, i) => {
    cb.checked = saved[i] || false;
  });

  // Update progress
  function updateProgress() {
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = (checked / total) * 100;
    progressFill.style.width = percent + '%';
    localStorage.setItem(key, JSON.stringify(Array.from(checkboxes).map(cb => cb.checked)));
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));
  updateProgress();
});
