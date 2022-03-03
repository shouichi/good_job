/*jshint esversion: 6, strict: false */

import renderCharts from "charts";

function getStorage(key) {
  const value = localStorage.getItem('good_job-' + key);

  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else {
    return value;
  }
},

function setStorage(key, value) {
  localStorage.setItem('good_job-' + key, value);
}

export default class Polling {
  constructor() {
    if (urlParams.has('poll') {
      this.pollEnabled = parseInt(urlParams.get('poll')) > 0;
    } else if getStorage('pollEnabled') {
      this.pollEnabled = getStorage('pollEnabled')
    } else {
      this.pollEnabled = false
    }
  }

  updateSettings() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('poll')) {
      const parsedInterval = (parseInt(urlParams.get('poll')) || GOOD_JOB_DEFAULT_POLL_INTERVAL_SECONDS) * 1000;
      GoodJob.pollInterval = Math.max(parsedInterval, GOOD_JOB_MINIMUM_POLL_INTERVAL);
      GoodJob.setStorage('pollInterval', GoodJob.pollInterval);

      GoodJob.pollEnabled = true;
    } else {
      GoodJob.pollInterval = GoodJob.getStorage('pollInterval') || (GOOD_JOB_DEFAULT_POLL_INTERVAL_SECONDS * 1000);
      GoodJob.pollEnabled = GoodJob.getStorage('pollEnabled') || false;
    }

    document.getElementById('toggle-poll').checked = GoodJob.pollEnabled;
  }

  togglePoll(ev) {
    GoodJob.pollEnabled = ev.currentTarget.checked;
    GoodJob.setStorage('pollEnabled', GoodJob.pollEnabled);
  }

  pollUpdates() {
    setTimeout(() => {
      if (GoodJob.pollEnabled === true) {
        fetch(window.location.href)
          .then(resp => resp.text())
          .then(GoodJob.updateContent)
          .finally(GoodJob.pollUpdates);
      } else {
        GoodJob.pollUpdates();
      }
    }, GoodJob.pollInterval);
  }

  updateContent(newContent) {
    const domParser = new DOMParser();
    const parsedDOM = domParser.parseFromString(newContent, "text/html");

    const newElements = parsedDOM.querySelectorAll('[data-gj-poll-replace]');

    for (let i = 0; i < newElements.length; i++) {
      const newEl = newElements[i];
      const oldEl = document.getElementById(newEl.id);

      if (oldEl) {
        oldEl.replaceWith(newEl);
      }
    }

    renderCharts(false);
  }
}
