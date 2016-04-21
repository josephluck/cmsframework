/* ======================================================
  Utils
====================================================== */
export function getData(api_url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', api_url, true);
    request.setRequestHeader("Authorization", window.auth_token);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        resolve(JSON.parse(request.responseText));
      } else {
        reject();
      }
    };
    request.onerror = function() {
      reject()
    };

    request.send();
  });
}