function renderCoursesPage(){
  const grid = document.getElementById("coursesGrid");
  if(!grid) return;
  grid.innerHTML = "";

  COURSE_LIBRARY.forEach((course, index) => {
    const locked = index > 1;
    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <div class="course-thumb"><img src="images/hero.jpg" alt="${escapeHtml(course.title)}"></div>
      <div class="course-body">
        <h3>${escapeHtml(course.title)}</h3>
        <p>${escapeHtml(course.description)}</p>
        <div class="course-meta">
          <span>${escapeHtml(course.level)}</span>
          <span>${course.lessons.length} Lessons</span>
        </div>
        <div class="card-actions">
          ${locked
            ? `<a class="btn btn-dark" href="pricing.html">Locked</a>`
            : `<a class="btn btn-gold" href="course-player.html?course=${encodeURIComponent(course.id)}">Open</a>`}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function escapeHtml(value){
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
