/*
Different stuff collected over time. Most of it used in one project or another
in the past.
 */

import { memoize, curry } from 'ramda';

export const $ = (selector, context) => {
  return (context || document).querySelector(selector);
};

export const $$ = (selector, context) => {
  return (context || document).querySelectorAll(selector);
};

export const getElStyle = el => window.getComputedStyle(el);

export const getElStyleProp = memoize(curry((el, prop) => getElStyle(el).getPropertyValue(prop)));

// converts a style value from '##px' to '##'
export const pxToInt = str => parseInt(str.substr(0, str.length - 2));

// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
// element must be entirely on screen
export const isElementEntirelyInViewport = el => {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// element may be partially on screen
export const isElementInViewport = el => {
  let rect = el.getBoundingClientRect();
  return rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight);
};

export const isDomObj = (obj) => {
  return !!(obj.nodeType || (obj === window));
};

export const position = el => {
  return {
    left: el.offsetLeft,
    top : el.offsetTop
  };
};

// from http://jsperf.com/jquery-offset-vs-offsetparent-loop
export const offset = el => {
  let ol = 0,
      ot = 0;
  if (el.offsetParent) {
    do {
      ol += el.offsetLeft;
      ot += el.offsetTop;
      el = el.offsetParent;
    } while (el); // jshint ignore:line
  }
  return {
    left: ol,
    top : ot
  };
};

export const removeAllElements = el => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

export const removeElement = el => {
  el.parentNode.removeChild(el);
};

export const wrapElement = (wrapperStr, el) => {
  let wrapperEl = this.HTMLStrToNode(wrapperStr),
      elParent  = el.parentNode;

  wrapperEl.appendChild(el);
  elParent.appendChild(wrapperEl);
  return wrapperEl;
};

// http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
export const closest = (el, selector) => {
  let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.bind(el)(selector)) {
      return el;
    } else {
      el = el.parentElement;
    }
  }
  return false;
};

// from youmightnotneedjquery.com
export const hasClass = (el, className) => {
  if (el.classList) {
    el.classList.contains(className);
  } else {
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

export const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
};

export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

export const toggleClass = (el, className) => {
  if (this.hasClass(el, className)) {
    this.removeClass(el, className);
  } else {
    this.addClass(el, className);
  }
};

// From impress.js
export const applyCSS = (el, props) => {
  let key;
  for (key in props) {
    if (props.hasOwnProperty(key)) {
      el.style[key] = props[key];
    }
  }
  return el;
};

// from impress.js
// `computeWindowScale` counts the scale factor between window size and size
// defined for the presentation in the config.
export const computeWindowScale = config => {
  let hScale = window.innerHeight / config.height,
      wScale = window.innerWidth / config.width,
      scale  = hScale > wScale ? wScale : hScale;

  if (config.maxScale && scale > config.maxScale) {
    scale = config.maxScale;
  }

  if (config.minScale && scale < config.minScale) {
    scale = config.minScale;
  }

  return scale;
};

/**
 * Get an array of elements in the container returned as Array instead of a Node list
 */
export const getQSElementsAsArray = (el, cls) => {
  return Array.prototype.slice.call(el.querySelectorAll(cls), 0);
};

export const centerElementInViewPort = el => {
  let vpH = window.innerHeight,
      vpW = window.innerWidth,
      elR = el.getBoundingClientRect(),
      elH = elR.height,
      elW = elR.width;

  el.style.left = (vpW / 2) - (elW / 2) + 'px';
  el.style.top  = (vpH / 2) - (elH / 2) + 'px';
};

/**
 * Creates an object from the name (or id) attribs and data of a form
 * @param el
 * @returns {null}
 */
export const captureFormData = el => {
  let dataObj = Object.create(null),
      textareaEls, inputEls, selectEls;

  textareaEls = Array.prototype.slice.call(el.querySelectorAll('textarea'), 0);
  inputEls    = Array.prototype.slice.call(el.querySelectorAll('input'), 0);
  selectEls   = Array.prototype.slice.call(el.querySelectorAll('select'), 0);

  textareaEls.forEach(getInputFormData);
  inputEls.forEach(getInputFormData);
  selectEls.forEach(getSelectFormData);

  return dataObj;

  function getInputFormData (formEl) {
    dataObj[getElNameOrID(formEl)] = formEl.value;
  }

  function getSelectFormData (formEl) {
    let sel = formEl.selectedIndex, val = '';
    if (sel >= 0) {
      val = formEl.options[sel].value;
    }
    dataObj[getElNameOrID(formEl)] = val;
  }

  function getElNameOrID (formEl) {
    let name = 'no_name';
    if (formEl.getAttribute('name')) {
      name = formEl.getAttribute('name');
    } else if (formEl.getAttribute('id')) {
      name = formEl.getAttribute('id');
    }
    return name;
  }
};