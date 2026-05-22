function loadCommunityPosts() {
  const posts = [
    { author: "Jasmine", title: "My first luxury classic set", body: "I finally finished my first full classic set with cleaner isolation and much better symmetry. The mapping lesson helped a lot." },
    { author: "Mila", title: "Retention question", body: "What humidity range do you all prefer when working with faster adhesives? I’m getting better results but still testing my room setup." },
    { author: "Amber", title: "Booked 5 new clients", body: "I used the luxury caption guidance and a simple offer post and booked five new appointments this week." }
  ];

  const feed = document.getElementById("communityFeed");
  feed.innerHTML = "";

  posts.forEach(post => {
    const item = document.createElement("article");
    item.className = "feed-card";
    item.innerHTML = `
      <div class="feed-author">${post.author}</div>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <div class="feed-actions">
        <button class="btn btn-dark" type="button">Reply</button>
        <button class="btn btn-gold" type="button">Support</button>
      </div>
    `;
    feed.appendChild(item);
  });
}
