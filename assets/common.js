(function () {
  const NAV_HTML = `
    <header class="topbar global-topbar">
      <div class="brand-wrap">
        <a class="brand-link" href="index.html" aria-label="Lash Luxury Academy Home">
          <div class="brand-icon">◜◝</div>
          <div class="brand-text">
            <div>LASH LUXURY</div>
            <div>ACADEMY</div>
          </div>
        </a>
      </div>

      <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open menu" aria-expanded="false">☰</button>

      <nav class="nav-links global-nav-links" id="globalNavMenu">
        <a href="index.html" data-page="home">Home</a>
        <a href="dashboard.html" data-page="dashboard">Dashboard</a>
        <a href="courses.html" data-page="courses">Courses</a>
        <a href="certificates.html" data-page="certificates">Certificates</a>
        <a href="community.html" data-page="community">Community</a>
        <a href="resources.html" data-page="resources">Resources</a>
        <a href="local-artists.html" data-page="artists">Local Artists</a>
        <a href="ai-assistant.html" data-page="ai">AI Coach</a>
        <a href="affiliate.html" data-page="affiliate">Affiliate</a>
        <a href="pricing.html" data-page="pricing">Pricing</a>
        <a href="admin.html" data-page="admin">Admin</a>
      </nav>

      <div class="nav-actions global-nav-actions" id="globalNavActions">
        <a class="btn btn-outline" href="login.html" data-auth="logged-out">Log In</a>
        <a class="btn btn-gold" href="register.html" data-auth="logged-out">Sign Up</a>
        <a class="btn btn-outline" href="dashboard.html" data-auth="logged-in">My Dashboard</a>
        <button class="btn btn-gold nav-logout-btn" type="button" data-auth="logged-in" onclick="logoutUser()">Log Out</button>
      </div>
    </header>
  `;

  function getCurrentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const mapping = {
      "index.html": "home",
      "dashboard.html": "dashboard",
      "courses.html": "courses",
      "course-player.html": "courses",
      "certificates.html": "certificates",
      "community.html": "community",
      "resources.html": "resources",
      "local-artists.html": "artists",
      "ai-assistant.html": "ai",
      "affiliate.html": "affiliate",
      "pricing.html": "pricing",
      "admin.html": "admin"
    };
    return mapping[path] || "";
  }

  function getStoredUser() {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch (e) { return null; }
  }

  function updateAuthUI() {
    const user = getStoredUser();
    const loggedIn = !!(user && user.email);

    document.querySelectorAll("[data-auth='logged-in']").forEach(el => {
      el.style.display = loggedIn ? "" : "none";
    });
    document.querySelectorAll("[data-auth='logged-out']").forEach(el => {
      el.style.display = loggedIn ? "none" : "";
    });

    const current = getCurrentPage();
    document.querySelectorAll(".global-nav-links a").forEach(a => {
      a.classList.toggle("active", a.dataset.page === current);
    });

    const adminLink = document.querySelector('.global-nav-links a[data-page="admin"]');
    if (adminLink && (!user || user.email.toLowerCase() !== (window.CONFIG && CONFIG.OWNER_EMAIL.toLowerCase()))) {
      adminLink.style.display = "none";
    }
  }

  function setupMobileNav() {
    const toggle = document.getElementById("mobileNavToggle");
    const menu = document.getElementById("globalNavMenu");
    const actions = document.getElementById("globalNavActions");
    if (!toggle || !menu || !actions) return;

    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      actions.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  window.logoutUser = function () {
    localStorage.removeItem("user");
    localStorage.removeItem("paid");
    localStorage.removeItem("pendingUser");
    window.location.href = "index.html";
  };

  window.renderGlobalNav = function () {
    const target = document.getElementById("global-nav");
    if (!target) return;
    target.innerHTML = NAV_HTML;
    updateAuthUI();
    setupMobileNav();
  };

  document.addEventListener("DOMContentLoaded", function () {
    window.renderGlobalNav();
  });
})();
