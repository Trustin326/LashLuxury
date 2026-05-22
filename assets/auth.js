async function login(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if(!email || !password){
    alert("Please enter your email and password.");
    return;
  }

  try{
    const res = await api("login", { email, password });
    if(res.status === "ok"){
      localStorage.setItem("user", JSON.stringify(res.user));
      if(email.toLowerCase() === CONFIG.OWNER_EMAIL.toLowerCase()){
        window.location = "admin.html";
      }else{
        window.location = "dashboard.html";
      }
    }else{
      alert("Login failed. Please check your email and password.");
    }
  }catch(error){
    alert("Login service is not connected yet.");
  }
}

async function register(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if(!email || !password){
    alert("Please complete all fields.");
    return;
  }

  try{
    const res = await api("register", { email, password });
    if(res.status === "ok"){
      alert("Account created successfully.");
      window.location = "login.html";
    }else if(res.status === "exists"){
      alert("An account with that email already exists.");
    }else{
      alert("Registration failed.");
    }
  }catch(error){
    alert("Registration service is not connected yet.");
  }
}
