function loadCertificates() {
  const certificates = [
    { title: "Classic Lash Certification", status: "Ready to download", action: "Download Certificate", unlocked: true },
    { title: "Volume Lash Mastery", status: "In progress", action: "Finish Course", unlocked: false },
    { title: "Lash Business Bootcamp", status: "Locked", action: "Upgrade Access", unlocked: false }
  ];

  const container = document.getElementById("certificateGrid");
  container.innerHTML = "";

  certificates.forEach(item => {
    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <div class="certificate-preview">
        <div class="certificate-paper">
          <div class="certificate-brand">LASH LUXURY ACADEMY</div>
          <div class="certificate-heading">Certificate of Completion</div>
          <div class="certificate-student">Luxury Student</div>
          <div class="certificate-course">${escapeHtml(item.title)}</div>
        </div>
      </div>
      <div class="course-body">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.status)}</p>
        <div class="card-actions">
          ${item.unlocked
            ? `<button class="btn btn-gold" onclick="downloadCertificate('${escapeJs(item.title)}')">${item.action}</button>`
            : `<a class="btn btn-dark" href="${item.status === 'Locked' ? 'pricing.html' : 'courses.html'}">${item.action}</a>`}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function downloadCertificate(courseTitle) {
  const student = getStudentName();
  const printable = window.open("", "_blank", "width=1000,height=700");
  printable.document.write(`
    <html><head><title>Certificate</title><style>
      body{font-family:Georgia,serif;background:#0f1417;margin:0;padding:40px;color:#111;}
      .cert{max-width:900px;margin:0 auto;background:#fff8ea;border:14px solid #c99a3d;padding:60px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.25);}
      .brand{font-size:18px;letter-spacing:.25em;color:#8a6522;margin-bottom:24px;}
      .title{font-size:56px;font-style:italic;margin:0 0 20px;}
      .copy{font-size:20px;margin:16px 0;}
      .name{font-size:42px;margin:28px 0 14px;font-weight:700;}
      .course{font-size:30px;color:#234;margin-top:12px;}
      .line{margin:36px auto 18px;width:220px;border-top:2px solid #c99a3d;}
    </style></head>
    <body><div class="cert">
      <div class="brand">LASH LUXURY ACADEMY</div>
      <h1 class="title">Certificate of Completion</h1>
      <div class="copy">This certifies that</div>
      <div class="name">${student}</div>
      <div class="copy">has successfully completed</div>
      <div class="course">${courseTitle}</div>
      <div class="line"></div>
      <div class="copy">Awarded for excellence in luxury beauty education.</div>
    </div></body></html>
  `);
  printable.document.close();
  printable.focus();
  printable.print();
}

function getStudentName() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.email || "Luxury Student";
  } catch (e) {
    return "Luxury Student";
  }
}

function escapeHtml(value){ return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"); }
function escapeJs(value) { return String(value).replace(/'/g, "\\'"); }
