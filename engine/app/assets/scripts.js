/*jshint esversion: 6, strict: false */

import renderCharts from "charts";

const GOOD_JOB_DEFAULT_POLL_INTERVAL_SECONDS = 30;
const GOOD_JOB_MINIMUM_POLL_INTERVAL = 1000;

const GoodJob = {
  // Register functions to execute when the DOM is ready
  ready: (callback) => {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  },

  init: () => {
    GoodJob.updateSettings();
    GoodJob.addListeners();
    GoodJob.pollUpdates();
    renderCharts(true);
  },

  addListeners: () => {
    const gjActionEls = document.querySelectorAll('[data-gj-action]');

    for (let i = 0; i < gjActionEls.length; i++) {
      const el = gjActionEls[i];
      const [eventName, func] = el.dataset.gjAction.split('#');

      el.addEventListener(eventName, GoodJob[func]);
    }
  },
};

GoodJob.ready(GoodJob.init);
