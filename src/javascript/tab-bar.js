import '../css/tab-bar.scss';

/* eslint-disable import/no-unresolved */
import $ from 'jquery';
/* eslint-enable import/no-unresolved */

const tabBar = (() => {
  let tabsArray;
  let currentTab;
  let callBack;

  const getCookie = cname => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];

      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  };

  const setTabs = (...tabs) => {
    tabsArray = tabs;

    const cookieValue = getCookie('currentTab');

    if (cookieValue === '') {
      currentTab = 0;
      document.cookie = `currentTab=${currentTab}`;
    } else {
      currentTab = tabsArray.findIndex(element => element === cookieValue);
    }
  };

  const getCurrentTab = () => currentTab;

  const getHTML = () => {
    let htmlString = '<div class="tab-bar">';

    for (let i = 0; i < tabsArray.length; i += 1) {
      const active = i === currentTab ? ' class="active"' : '';

      htmlString += `
        <div class="tab ${tabsArray[i].toLowerCase()}">
          <div class="black-pepper"></div>
          <div${active}>${tabsArray[i]}</div>
          <span></span>
        </div>
      `;

      if (i + 1 < tabsArray.length) {
        htmlString += '<div class="gap"></div>';
      }
    }

    return `${htmlString}</div>`;
  };

  const tabClickedClosure = (event) => {
    const tabString = $(event.target)[0].innerText;
    const oldTab = currentTab;

    currentTab = tabsArray.findIndex(element => element === tabString);
    document.cookie = `currentTab=${tabString}`;

    $(`.${tabsArray[oldTab].toLowerCase()}`).children('div:nth-of-type(2)').removeClass('active');
    $(`.${tabsArray[currentTab].toLowerCase()}`).children('div:nth-of-type(2)').addClass('active');

    callBack();
  };

  const setEventHandlers = (refreshPage) => {
    $('.tab').click(tabClickedClosure);
    callBack = refreshPage;
  };

  return {
    setTabs, getCurrentTab, getHTML, setEventHandlers,
  };
})();

export { tabBar as default };