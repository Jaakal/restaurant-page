require('../css/reset.css');
require('../css/utility-functions.scss');
require('../css/style.scss');
require('../css/index.scss');

/**
 * JavaScript module requirers have to be below the stylesheet imports.
 * Otherwise stylesheets which will come with other modules
 * will be added before the main stylesheets. 
 * **/ 

// Make JQuery globally available before the other module calls,
// then it's available in the other modules without having to require it. 
window.$ = window.JQuery = require('jquery');

const tabBar = require('./tab-bar');
const tabs = []
tabs.push(require('./home'));
tabs.push(require('./menu'));
tabs.push(require('./contact'));

const refreshPage = () => {
  $('#content').html(tabBar.getHTML());
  $('#content').append(tabs[tabBar.getCurrentTab()]);
  tabBar.setEventHandlers(refreshPage);

  if (tabBar.getCurrentTab() === 1) {
    setTimeout(() => {
      $('.menu-page').addClass('start-animation');
    }, 0);
  }
}

$(document).ready(() => {
  tabBar.setTabs('Home', 'Menu', 'Contact');
  refreshPage();
});

