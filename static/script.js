async function shortenUrl(longUrl) {
  try {
    const response = await fetch("http://localhost:3000/api/url/shorten", {
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
      return response.status;
    }
  } catch (error) {
    return error;
  }
}

async function onClickHandler() {
  const longUrl = document.getElementById("longUrl").value;
  // const shortUrl = document.getElementById("shortUrl");
  const data = await shortenUrl(longUrl);
  // shortUrl.innerText = data;

  const tag = document.getElementById("anchortag");
  tag.innerText = data;
  tag.href = data;
}
