async function getAuthors() {
  let accessToken = localStorage.getItem("accessToken");
  console.log("accessToken:", accessToken);
  const accessTokenExpTime = getTokenExpiration(accessToken);
  console.log("accessTokenExpTime:", accessTokenExpTime);
  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accessTokenExpTime) {
      console.log("Access token faol!");
    } else {
      console.log("Access tokenni vaqti chiqib ketdi.");
      accessToken = await refreshTokenFunc();
      console.log("NewAccessToken:", accessToken);
      // const refreshToken = getTokenFromCookie("refreshToken");
      // console.log("refreshToken:", refreshToken);
    }
  } else {
    console.log("Invalid access token format.");
  }

  fetch("http://localhost:3000/api/author", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status: " + response.status);
      }
    })
    .then((author) => {
      console.log(author.data);
      displayAuthors(author.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getTokenExpiration(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  if (decodedToken && decodedToken.exp) {
    return new Date(decodedToken.exp * 1000); // Convert expiration time from seconds to milliseconds
  }
  return null;
}

function getTokenFromCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}

async function refreshTokenFunc() {
  const loginUrl = "/login";
n
  try {
    const response = await fetch("http://localhost:3000/api/author/refresh", {
      method: "POST",
      credentials: "include", 
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.error && data.error === "jwt expired") {
      console.log("Refresh token vaqti chiqib ketdi.");
      return window.location.replace(loginUrl);
    }
    console.log("Tokenlar Refresh token orqali muvaffaqiyatli yangilandi");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log(error);
    return window.location.replace(loginUrl);
  }
}

function displayAuthors(authors) {
  const listContainer = document.getElementById("author-list");

  listContainer.innerHTML = "";

  authors.forEach((author) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${author.author_first_name} ${author.author_last_name} \
    - ${author.author_email}`;
    listContainer.appendChild(listItem);
  });
}
