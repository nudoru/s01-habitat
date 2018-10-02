import React from 'react';
import ReactDOM from 'react-dom';
import {curry, compose} from 'ramda';

export const NOOP = () => {
};

// Given props from a component, iterate over propTypes and matches in the props
// Create clean props that are safe to attach to DOM node
export const omit = (blacklist, props) => {
  let keys = Array.isArray(blacklist) ? blacklist : Object.keys(blacklist);

  keys.forEach(p => {
    if (props.hasOwnProperty(p)) {
      delete props[p];
    }
  });
  return props;
};

export const getDOMElements = a => a.map(ReactDOM.findDOMNode); //eslint-disable-line react/no-find-dom-node

export const removeNulls    = array => array.filter(i => !!i);
export const joinStrings    = delim => arry => arry.join(delim);
export const joinWithSpaces = joinStrings(' ');

export const joinClasses = (...classes) => compose(joinWithSpaces, removeNulls)([...classes]);
// export const joinClasses = (...classes) => cx([...classes].reverse());

export const clamp = curry((min, max, val) => {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
});

export const clamp01 = clamp(0, 1);