import Handlebars from 'libs/handlebars';


const getPageData = new Promise(function(resolve, reject) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://cms-api.dev/pages/28', true);
  request.setRequestHeader("Authorization", "jy2sYnxxHt5xVvNn8wHX");

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

function prepareAndRenderPage(context) {
  let source = document.getElementById("entry-template"),
      template = Handlebars.compile(source.innerHTML),
      html = template(context);

  renderPage(source, html);
}

function renderPage(source, html) {
  source.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function(event) {
  getPageData.then(function(resp) {
    prepareAndRenderPage(resp);
  }, function() {
    debugger
  })
});