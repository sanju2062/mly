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
  } catch (_) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-zA-Z0-9$-_@.&+!*(),]|%[0-9a-fA-F]{2})+(:([a-zA-Z0-9$-_@.&+!*(),]|%[0-9a-fA-F]{2})+)?@)?" + // username:password@
        "(([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}|" + // domain name
        "((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))" + // OR ip (v4) address
        "(:[0-9]{1,5})?" + // port
        "(\\/[-a-zA-Z0-9$-_@.&+!*(),%;:]*)*" + // path
        "(\\?[;&a-zA-Z0-9$-_.+!*\\(\\),%=]*)?" + // query string
        "(#[-a-zA-Z0-9$-_@.&+!*(),]*)?$",
      "i"
    ); // fragment locator

    return pattern.test(string);
  }
}

async function onClickHandler() {
  const longUrl = document.getElementById("longUrl").value;
  const data = await shortenUrl(longUrl);

  const tag = document.getElementById("anchortag");
  tag.innerText = data;
  isValidURL(data) ? (tag.href = data) : (tag.href = "");
}
