let activeLessonIndex = 0;

function getSelectedCourseId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("course") || "classic-cert";
}

function getCourseById(courseId) {
  return COURSE_LIBRARY.find(course => course.id === courseId) || COURSE_LIBRARY[0];
}

function renderCoursePlayer() {
  const course = getCourseById(getSelectedCourseId());
  activeLessonIndex = 0;
  document.getElementById("playerCourseTitle").textContent = course.title;
  renderLessonList(course);
  renderLesson(course, activeLessonIndex);
}

function renderLessonList(course) {
  const list = document.getElementById("lessonList");
  list.innerHTML = "";

  course.lessons.forEach((lesson, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lesson-item-button" + (index === activeLessonIndex ? " active" : "");
    button.onclick = () => {
      activeLessonIndex = index;
      renderLesson(course, index);
      renderLessonList(course);
    };
    button.innerHTML = `
      <div class="lesson-item">
        <strong>${String(index + 1).padStart(2, "0")}</strong>
        <div>
          <h4>${escapeHtml(lesson.title)}</h4>
          <span>${escapeHtml(lesson.duration)}</span>
        </div>
      </div>
    `;
    list.appendChild(button);
  });
}

function renderLesson(course, index) {
  const lesson = course.lessons[index];
  document.getElementById("lessonTitle").textContent = lesson.title;
  document.getElementById("lessonBody").textContent = lesson.body;
  document.getElementById("lessonDuration").textContent = lesson.duration;
  document.getElementById("lessonProgress").textContent = `${Math.round(((index + 1) / course.lessons.length) * 100)}%`;
}

function markLessonComplete() {
  const course = getCourseById(getSelectedCourseId());
  if (activeLessonIndex < course.lessons.length - 1) {
    activeLessonIndex += 1;
    renderLesson(course, activeLessonIndex);
    renderLessonList(course);
  } else {
    alert("Course complete. Your certificate is ready in the Certificates page.");
  }
}

function downloadLessonNotes() {
  const course = getCourseById(getSelectedCourseId());
  const lesson = course.lessons[activeLessonIndex];
  const blob = new Blob([`${course.title}\n\n${lesson.title}\n\n${lesson.body}`], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${course.id}-${lesson.id}-notes.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value){
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
