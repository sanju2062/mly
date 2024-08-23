async function shortenUrl(longUrl) {
  try {
    const baseUrl = window.location.origin;
    const response = await fetch(baseUrl + "/api/url/shorten", {
      method: "POST",
      body: JSON.stringify({ longUrl: longUrl }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.status == 200) {
      const data = await response.json();
      return data.shortUrl;
    } else if (response.status == 401) {
      return "Please Enter a valid Url";
    } else {
      return "Check your Internet Connection";
    }
  } catch (error) {
    console.log(error);
    return "Check Internet Connection";
  }
}

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

function preventDefaultAction(event) {
  event.preventDefault();
}

function disableLink(idOfAnchorTag) {
  const link = document.getElementById(idOfAnchorTag);
  link.href = "";

  // Prevent default action
  link.addEventListener("click", preventDefaultAction);

  // Optionally add disabled style
  link.style.pointerEvents = "none"; // Disables clicking
  link.style.color = "gray"; // Optional: change color to indicate it's disabled
  link.style.cursor = "not-allowed"; // Optional: change cursor to indicate it's disabled
}

function enableLink(idOfAnchorTag) {
  const link = document.getElementById(idOfAnchorTag);
  link.removeEventListener("click", preventDefaultAction);

  // Re-enable clicking
  link.style.pointerEvents = "auto";
  link.style.color = "blue"; // Reset to original color
  link.style.cursor = "pointer"; // Reset to original cursor
}

async function onClickHandler() {
  const longUrl = document.getElementById("longUrl").value;
  const tag = document.getElementById("anchortag");
  if (isValidURL(longUrl)) {
    const data = await shortenUrl(longUrl);
    tag.innerText = data;
    if (isValidURL(data)) {
      enableLink("anchortag");
      tag.href = data;
    } else {
      disableLink("anchortag");
    }
  } else {
    tag.innerText = "Enter the correct url";
    disableLink("anchortag");
  }
}
