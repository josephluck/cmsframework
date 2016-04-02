import Handlebars from 'libs/handlebars';

function getPageData(source) {
  let page_id = source.dataset.airPage,
      api_url = window.API_ROOT + 'pages/' + page_id;

  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', api_url, true);
    request.setRequestHeader("Authorization", window.auth_token);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        resolve(JSON.parse(request.responseText));
      } else {
        reject(err);
      }
    };
    request.onerror = function() {
      reject()
    };

    request.send();
  });
}

function renderPage(source, context) {
  var template = Handlebars.compile(source.innerHTML),
      html = template(context);

  source.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function(event) {
  let sources = document.querySelectorAll("#entry-template");

  for (let i = 0, x = sources.length; i < x; i++) {
    let source = sources[i];
    getPageData(source).then(function(resp) {
      renderPage(source, resp);
      source.style.visibility = "visible";
    }, function() {
      console.warn('Show an API error here');
    })
  }
});