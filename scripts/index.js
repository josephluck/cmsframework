import Handlebars from 'libs/handlebars';

/* ======================================================
  Utils
====================================================== */

function getData(api_url) {
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

/* ======================================================
  Render pages lists
====================================================== */
function renderAllPagesElms() {
  let pages_elms = document.querySelectorAll("[data-pages]");

  for (let i = 0, x = pages_elms.length; i < x; i++) {
    let pages_elm = pages_elms[i],
        api_url = window.API_ROOT + 'pages';

    getData(api_url).then(function(context) {
      context.pages = context;

      var template = Handlebars.compile(pages_elm.innerHTML),
          html = template(context);

      pages_elm.innerHTML = html;
      pages_elm.style.visibility = "visible";
    }, function() {
      console.warn('Show an API error here');
    })
  }
}


/* ======================================================
  Render page elements
====================================================== */
function renderAllPageElms() {
  let page_elms = document.querySelectorAll("[data-page]");

  for (let i = 0, x = page_elms.length; i < x; i++) {
    let page_elm = page_elms[i],
        page_id = page_elm.dataset.page,
        api_url = window.API_ROOT + 'pages/' + page_id;

    getData(api_url).then(function(context) {
      var template = Handlebars.compile(page_elm.innerHTML),
          html = template(context);

      page_elm.innerHTML = html;
      page_elm.style.visibility = "visible";
    }, function() {
      console.warn('Show an API error here');
    })
  }
}

/* ======================================================
  Render all elements on the page
====================================================== */

document.addEventListener("DOMContentLoaded", function(event) {
  renderAllPagesElms()
  renderAllPageElms();
});