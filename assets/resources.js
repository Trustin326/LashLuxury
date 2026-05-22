function loadResources() {
  const resources = [
    { title: "Luxury Client Intake Form", desc: "A polished intake form for new lash clients.", action: "Download" },
    { title: "Lash Pricing Guide", desc: "Starter, premium, and luxury pricing examples.", action: "Download" },
    { title: "Instagram Caption Vault", desc: "Beauty brand caption prompts and hooks.", action: "Download" },
    { title: "Aftercare Card Template", desc: "Client-friendly aftercare copy for your brand.", action: "Download" },
    { title: "Content Planner", desc: "A monthly post planner for booking growth.", action: "Download" },
    { title: "Luxury Brand Checklist", desc: "Simple steps to elevate your client experience.", action: "Download" }
  ];

  const grid = document.getElementById("resourceGrid");
  grid.innerHTML = "";

  resources.forEach(resource => {
    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <div class="resource-icon-wrap">
        <div class="resource-icon">✦</div>
      </div>
      <div class="course-body">
        <h3>${resource.title}</h3>
        <p>${resource.desc}</p>
        <div class="card-actions">
          <button class="btn btn-gold" type="button" onclick="downloadResource('${escapeJs(resource.title)}')">${resource.action}</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function downloadResource(title) {
  const content = `${title}\n\nThis is a starter downloadable resource from Lash Luxury Academy. Customize this file for your live production content.`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".txt";
  a.click();
  URL.revokeObjectURL(url);
}
function escapeJs(value) { return String(value).replace(/'/g, "\\'"); }
