function setPrompt(text){
  document.getElementById("aiInput").value = text;
  document.getElementById("aiInput").focus();
}

function clearAI(){
  document.getElementById("aiInput").value = "";
  document.getElementById("aiOutput").textContent = "Your answer will appear here. Ask about technique, business, content, or client experience.";
  document.getElementById("aiStatus").textContent = "Ready";
}

async function runAI(){
  const input = document.getElementById("aiInput").value.trim();
  const output = document.getElementById("aiOutput");
  const status = document.getElementById("aiStatus");

  if(!input){
    alert("Please enter a question first.");
    return;
  }

  status.textContent = "Thinking...";
  output.textContent = "Generating your answer...";

  if(!CONFIG.OPENAI_KEY){
    output.textContent =
      "AI is not connected yet. Add your OpenAI API key in assets/config.js under OPENAI_KEY to activate the live AI coach.\n\nSample answer:\nFor better lash retention, check humidity, adhesive freshness, prep thoroughly, and make sure the natural lash is fully isolated before placement.";
    status.textContent = "Demo Mode";
    return;
  }

  try{
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + CONFIG.OPENAI_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a luxury lash training coach and beauty business mentor. Give practical, clear, supportive answers about lash application, retention, styling, business growth, client care, and branding."
          },
          {
            role: "user",
            content: input
          }
        ]
      })
    });

    const data = await res.json();
    if(data.error) throw new Error(data.error.message || "AI request failed");
    output.textContent = data.choices?.[0]?.message?.content || "No response returned.";
    status.textContent = "Complete";
  }catch(error){
    output.textContent = "The AI coach could not respond right now. Check your API key in assets/config.js and try again.";
    status.textContent = "Error";
  }
}
