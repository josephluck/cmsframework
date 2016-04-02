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

function prepareAndRenderPage(source, context) {
  var template = Handlebars.compile(source.innerHTML),
      html = template(context);

  renderPage(source, html);
}

function renderPage(source, html) {
  source.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function(event) {
  let source = document.getElementById("entry-template");

  getPageData(source).then(function(resp) {
    prepareAndRenderPage(source, resp);
  }, function() {
    debugger
  })
});