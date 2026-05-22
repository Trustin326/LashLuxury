function loadArtistProfiles(){
  const grid = document.getElementById("artistDirectoryGrid");
  if(!grid) return;

  const seeded = [
    {
      name: "Jasmine Luxe Lashes",
      city: "Atlanta, GA",
      service: "Classic, hybrid, and wispy sets",
      price: "$95+",
      bio: "Luxury lash experience with soft glam styling and premium retention-focused application.",
      email: "artist@example.com",
      verified: true,
      initials: "JL"
    },
    {
      name: "Mila Beauty Studio",
      city: "Charlotte, NC",
      service: "Volume and mega volume",
      price: "$120+",
      bio: "Known for full, fluffy sets and client-focused aftercare support.",
      email: "artist@example.com",
      verified: true,
      initials: "MB"
    },
    {
      name: "Amber Lash Atelier",
      city: "Houston, TX",
      service: "Classic fills, brow add-ons, luxury sets",
      price: "$85+",
      bio: "Elegant beauty studio experience with refined mapping and premium brand presentation.",
      email: "artist@example.com",
      verified: true,
      initials: "AL"
    },
    {
      name: "Nina Lash House",
      city: "Miami, FL",
      service: "Hybrid, wet sets, and wispy styling",
      price: "$110+",
      bio: "Soft luxury looks designed for modern beauty clients and consistent retention.",
      email: "artist@example.com",
      verified: true,
      initials: "NH"
    }
  ];

  let pending = null;
  try{
    pending = JSON.parse(localStorage.getItem("pendingArtistListing") || "null");
  }catch(e){
    pending = null;
  }

  const profiles = pending ? [pendingToProfile(pending), ...seeded] : seeded;

  grid.innerHTML = "";
  profiles.forEach(profile => {
    const card = document.createElement("article");
    card.className = "course-card artist-card";
    const imageHtml = profile.logoDataUrl
      ? `<div class="artist-photo-wrap"><img class="artist-photo" src="${profile.logoDataUrl}" alt="${escapeHtml(profile.name)} logo or profile photo"></div>`
      : `<div class="artist-avatar">${escapeHtml(profile.initials || getInitials(profile.name))}</div>`;

    card.innerHTML = `
      <div class="artist-card-top">
        ${imageHtml}
        <div>
          <h3>${escapeHtml(profile.name)}</h3>
          <p class="artist-location">${escapeHtml(profile.city)}</p>
          <div class="verified-pill ${profile.verified ? "verified" : "pending"}">${profile.verified ? "Verified Documents" : "Pending Review"}</div>
        </div>
      </div>
      <div class="course-body artist-body">
        <p>${escapeHtml(profile.bio)}</p>
        <div class="artist-meta">
          <span>${escapeHtml(profile.service)}</span>
          <span>${escapeHtml(profile.price)}</span>
        </div>
        <div class="artist-doc-line">
          <span>BPP: ${profile.bppProvided ? "Submitted" : "Missing"}</span>
          <span>License: ${profile.licenseProvided ? "Submitted" : "Missing"}</span>
        </div>
        <div class="card-actions">
          <a class="btn btn-gold" href="mailto:${encodeURIComponent(profile.email || 'artist@example.com')}">Contact</a>
          <a class="btn btn-dark" href="#">View Services</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function pendingToProfile(data){
  return {
    name: data.artistName || "Featured Artist",
    city: data.artistCity || "Local Area",
    service: data.artistService || "Luxury lash services",
    price: data.artistPrice || "Custom pricing",
    bio: data.artistBio || "Luxury beauty artist profile submitted for premium local directory placement.",
    email: data.artistEmail || "artist@example.com",
    initials: getInitials(data.artistName || "Featured Artist"),
    logoDataUrl: data.logoDataUrl || "",
    verified: false,
    bppProvided: !!data.bppFileName,
    licenseProvided: !!data.licenseFileName
  };
}

function getInitials(name){
  return String(name || "LA")
    .split(" ")
    .filter(Boolean)
    .slice(0,2)
    .map(part => part[0].toUpperCase())
    .join("");
}

function escapeHtml(value){
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
