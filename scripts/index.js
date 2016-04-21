import Handlebars from 'libs/handlebars';
import * as Utils from 'utils';


/* ======================================================
  Render pages lists
====================================================== */
function renderAllPagesElms() {
  let pages_elms = document.querySelectorAll("[data-pages]");

  for (let i = 0, x = pages_elms.length; i < x; i++) {
    let pages_elm = pages_elms[i],
        api_url = `${window.API_ROOT}sites/${window.site_id}/pages`;

    Utils.getData(api_url).then(function(context) {
      context.pages = context;

      var template = Handlebars.compile(pages_elm.innerHTML),
          html = template(context);

      pages_elm.innerHTML = html;
      pages_elm.style.visibility = "visible";
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

    Utils.getData(api_url).then(function(context) {
      var template = Handlebars.compile(page_elm.innerHTML),
          html = template(context);

      page_elm.innerHTML = html;
      page_elm.style.visibility = "visible";
    })
  }
}


/* ======================================================
  Render section elements
====================================================== */
function renderAllSectionElms() {
  let section_elms = document.querySelectorAll("[data-section]");

  for (let i = 0, x = section_elms.length; i < x; i++) {
    let section_elm = section_elms[i],
        section_id = section_elm.dataset.section,
        api_url = window.API_ROOT + 'sections/' + section_id;

    Utils.getData(api_url).then(function(context) {
      var template = Handlebars.compile(section_elm.innerHTML),
          html = template(context);

      section_elm.innerHTML = html;
      section_elm.style.visibility = "visible";
    })
  }
}

/* ======================================================
  Render all elements on the page
====================================================== */
function render() {
  renderAllPagesElms()
  renderAllPageElms();
  renderAllSectionElms();
}

/* ======================================================
  When the document is loaded
====================================================== */
document.addEventListener("DOMContentLoaded", function(event) {
  render();
});