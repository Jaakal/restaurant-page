import '../css/reset.css';
import '../css/utility-functions.scss';
import '../css/style.scss';
import '../css/index.scss';

/**
 * JavaScript module requirers have to be below the stylesheet imports.
 * Otherwise stylesheets which will come with other modules
 * will be added before the main stylesheets.
 * * */

/* eslint-disable import/no-unresolved */
import $ from 'jquery';
/* eslint-enable import/no-unresolved */

import tabBar from './tab-bar';

import home from './home';
import menu from './menu';
import contact from './contact';

const tabs = [home, menu, contact];

const refreshPage = () => {
  $('#content').html(tabBar.getHTML());
  $('#content').append(tabs[tabBar.getCurrentTab()]);
  tabBar.setEventHandlers(refreshPage);

  if (tabBar.getCurrentTab() === 1) {
    setTimeout(() => {
      $('.menu-page').addClass('start-animation');
    }, 0);
  }
};

$(document).ready(() => {
  tabBar.setTabs('Home', 'Menu', 'Contact');
  refreshPage();
});
