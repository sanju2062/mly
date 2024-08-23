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
      return "Error";
    }
  } catch (error) {
    console.log(error);
    return "Error";
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

async function onClickHandler() {
  const longUrl = document.getElementById("longUrl").value;
  const tag = document.getElementById("anchortag");
  if (isValidURL(longUrl)) {
    const data = await shortenUrl(longUrl);
    tag.innerText = data;
    isValidURL(data) ? (tag.href = data) : (tag.href = "");
  } else {
    tag.innerText = "Enter the url in box";
  }
}
