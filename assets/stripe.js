function buy(){
  let user = null;
  try{ user = JSON.parse(localStorage.getItem("user") || "null"); }catch(e){ user = null; }
  if(user && user.email){
    localStorage.setItem("pendingUser", user.email);
  }
  window.location = CONFIG.STRIPE_LINK || "#";
}


async function payArtistListing(){
  const form = document.getElementById("artistListingForm");
  if(form){
    const required = ["artistName","artistCity","artistService","artistEmail"];
    for(const id of required){
      const el = document.getElementById(id);
      if(!el || !String(el.value).trim()){
        alert("Please complete all required profile fields before continuing.");
        return;
      }
    }

    const bppFile = document.getElementById("artistBppVerification")?.files?.[0];
    const licenseFile = document.getElementById("artistLicense")?.files?.[0];
    if(!bppFile || !licenseFile){
      alert("BPP verification and a valid license or certificate are required before submission.");
      return;
    }

    const logoFile = document.getElementById("artistLogo")?.files?.[0] || null;
    const photos = Array.from(document.getElementById("artistPhotos")?.files || []).map(f => f.name);

    const profile = {
      artistName: document.getElementById("artistName").value.trim(),
      artistCity: document.getElementById("artistCity").value.trim(),
      artistService: document.getElementById("artistService").value.trim(),
      artistEmail: document.getElementById("artistEmail").value.trim(),
      artistInstagram: document.getElementById("artistInstagram") ? document.getElementById("artistInstagram").value.trim() : "",
      artistPrice: document.getElementById("artistPrice") ? document.getElementById("artistPrice").value.trim() : "",
      artistBio: document.getElementById("artistBio") ? document.getElementById("artistBio").value.trim() : "",
      bppFileName: bppFile.name,
      licenseFileName: licenseFile.name,
      photoFileNames: photos
    };

    if(logoFile){
      profile.logoDataUrl = await fileToDataUrl(logoFile);
    }

    localStorage.setItem("pendingArtistListing", JSON.stringify(profile));
  }

  window.location = CONFIG.ARTIST_LISTING_STRIPE_LINK || "#";
}

function fileToDataUrl(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
