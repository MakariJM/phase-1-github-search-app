document.addEventListener("DOMContentLoaded", function () {
    const githubForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    githubForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm) {
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(username) {
      const apiUrl = `https://api.github.com/search/users?q=${username}`;
      fetch(apiUrl, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  
    function displayUsers(users) {
      userList.innerHTML = "";
  
      users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" />
          <span>${user.login}</span>
          <a href="#" data-username="${user.login}">View Repositories</a>
        `;
        userList.appendChild(listItem);
      });
  
      userList.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
          event.preventDefault();
          const username = event.target.getAttribute("data-username");
          getUserRepos(username);
        }
      });
    }
  
    function getUserRepos(username) {
      const apiUrl = `https://api.github.com/users/${username}/repos`;
      fetch(apiUrl, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          displayRepos(data);
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
        });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = "";
  
      repos.forEach((repo) => {
        const listItem = document.createElement("li");
        listItem.textContent = repo.name;
        reposList.appendChild(listItem);
      });
    }
  });