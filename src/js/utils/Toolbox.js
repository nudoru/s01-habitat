/*eslint no-undef: "error"*/
/*eslint-env node*/

/*
 Collected utility functions
 */

/*******************************************************************************
 * Determination
 *******************************************************************************/

const existy = (x) => {
  return x != null; // eslint-disable-line eqeqeq
};

const truthy = (x) => {
  return (x !== false) && existy(x);
};

const falsey = (x) => {
  return !truthy(x);
};

module.exports.existy = existy;
module.exports.truthy = truthy;
module.exports.falsey = falsey;

module.exports.isFunction = (object) => {
  return typeof object === "function";
};

module.exports.isObject = (object) => {
  var type = {}.toString;
  return type.call(object) === "[object Object]";
};

module.exports.isString = (object) => {
  var type = {}.toString;
  return type.call(object) === "[object String]";
};

module.exports.isPromise = (promise) => {
  return promise && typeof promise.then === 'function';
};

module.exports.isObservable = (observable) => {
  return observable && typeof observable.subscribe === 'function';
};

/*******************************************************************************
 * Number
 *******************************************************************************/

module.exports.isInteger = (str) => {
  return (/^-?\d+$/.test(str));
};

const rndNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.rndNumber = rndNumber;

module.exports.clamp = (val, min, max) => {
  return Math.max(min, Math.min(max, val));
};

module.exports.inRange = (val, min, max) => {
  return val > min && val < max
};

module.exports.distanceTL = (point1, point2) => {
  var xd = (point2.left - point1.left),
      yd = (point2.top - point1.top);

  return Math.sqrt((xd * xd) + (yd * yd));
};

/*******************************************************************************
 * String
 *******************************************************************************/

module.exports.capitalizeFirstLetterStr = (str) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

module.exports.toTitleCaseStr = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
};

module.exports.removeTagsStr = (str) => {
  return str.replace(/(<([^>]+)>)/ig, '');
};

module.exports.removeEntityStr = (str) => {
  return str.replace(/(&(#?)(?:[a-z\d]+|#\d+|#x[a-f\d]+);)/ig, '');
};

module.exports.ellipsesStr = (str, len) => {
  return (str.length > len) ? str.substr(0, len) + "..." : str;
};

// Removes spaces, tabs and new lines
module.exports.removeWhiteSpace = (str) => {
  return str.replace(/(\r\n|\n|\r|\t|\s)/gm, '').replace(/>\s+</g, '><');
};

module.exports.slugify = str => str.split(' ').map(s => s.toLowerCase()).join('_');
module.exports.unslugify = str => str.split('_').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');

/*******************************************************************************
 * Array
 *******************************************************************************/

module.exports.removeArrDupes = (list) => {
  // Using a normal object instead of a map
  const dupes = {};
  return list.reduce((acc, curr) => {
    // Check if the current object is in the `dupes` object
    if (dupes[curr]) {
      return acc
    }
    // Add the current object as a field to `dupes`
    dupes[curr] = true;
    acc.push(curr);
    return acc
  }, [])
};

// http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
module.exports.uniqueArry = (arry) => {
  var o = {},
      i,
      l = arry.length,
      r = [];
  for (i = 0; i < l; i += 1) {
    o[arry[i]] = arry[i];
  }
  for (i in o) {
    r.push(o[i]);
  }
  return r;
};

module.exports.getArryDifferences = (arr1, arr2) => {
  var dif = [];

  arr1.forEach((value) => {
    var present = false,
        i       = 0,
        len     = arr2.length;

    for (; i < len; i++) {
      if (value === arr2[i]) {
        present = true;
        break;
      }
    }

    if (!present) {
      dif.push(value);
    }

  });

  return dif;
};

module.exports.arryArryToArryObj = (src, keys) => {
  return src.reduce((p, c) => {
    var row = {};
    keys.forEach((col, i) => {
      row[col] = c[i];
    });
    p.push(row);
    return p;
  }, []);
};

module.exports.rndElement = (arry) => {
  return arry[rndNumber(0, arry.length - 1)];
};

module.exports.getRandomSetOfElements = (srcarry, max) => {
  var arry = [],
      i    = 0,
      len  = rndNumber(1, max);

  for (; i < len; i++) {
    arry.push(this.rndElement(srcarry));
  }

  return arry;
};

module.exports.fillIntArray = (start, end) => {
  return Array.apply(null, {length:(end+1) - start}).reduce((p,c,i) => {
    p.push(i+start);
    return p;
  }, []);
};

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
module.exports.shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
  return array;
};

/*******************************************************************************
 * Objects
 *******************************************************************************/

/**
 * Test for
 * Object {"": undefined}
 * Object {undefined: undefined}
 * @param obj
 * @returns {boolean}
 */
module.exports.isNullObj = (obj) => {
  var isnull = false;

  if (falsey(obj)) {
    return true;
  }

  for (var prop in obj) {
    if (prop === undefined || obj[prop] === undefined) {
      isnull = true;
    }
    break;
  }

  return isnull;
};

module.exports.dynamicSortObjArry = (property) => {
  return (a, b) => {
    return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  };
};

/**
 * Turn an object of {paramname:value[,...]} into paramname=value[&...] for a
 * URL rest query
 */
module.exports.getParameterString = (objArry) => {
  return Object.keys(objArry).reduce((p, c, i) => {
    p += (i > 0 ? '&' : '') + c + '=' + encodeURIComponent(objArry[c]);
    return p;
  }, '');
};

module.exports.decodeParameterString = (str) => {
  return str.split('&').reduce((p, c) => {
    let pair   = c.split('=');
    p[pair[0]] = decodeURIComponent(pair[1]);
    return p;
  }, {});
};

/*******************************************************************************
 * Determination
 *******************************************************************************/

module.exports.sleep = (time) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, time);
  });
};

/*******************************************************************************
 * Time
 * Created while working with Moodle web services
 *******************************************************************************/

module.exports.getMatchDates = (str) => {
  return str.match(/\s*(?:(?:jan|feb)?r?(?:uary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|oct(?:ober)?|(?:sept?|nov|dec)(?:ember)?)\s+\d{1,2}\s*,?\s*\d{4}/ig);
};

module.exports.getMatchTimes = (str) => {
  return str.match(/(\d{1,2})\s*:\s*(\d{2})\s*([ap]m?)/ig);
};

function hrTo24(hr, pm) {
  hr = parseInt(hr);
  let fhr = (hr === 12 ? 0 : hr) + (pm ? 12 : 0);
  if(fhr < 10) {
    fhr = '0' + fhr;
  }
  return fhr;
}

function formatSecondsToHHMM(seconds) {
  var d = Number(seconds);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m);
}

// Convert one of these 9:00 AM, 5:00 PM to 09:00 or 17:00
module.exports.convertTimeStrToHourStr = (str, is24) => {
  let parts = str.toLowerCase().split(' '),
      time = parts[0].split(':'),
      hr = is24 ? hrTo24(time[0],(parts[1] === 'pm')) : time[0];
  return [hr, time[1]].join(':');
};


module.exports.formatSecondsToDate = (seconds) => {
  return new Date(parseInt(seconds * 1000)).toLocaleDateString()
};

module.exports.formatSecondsToDate2 = (seconds) => {
  return new Date(parseInt(seconds * 1000))
};

module.exports.formatSecondsToHHMM = formatSecondsToHHMM;
module.exports.hrTo24 = hrTo24;

module.exports.formatSecDurationToStr = (seconds) => {
  let hhmm   = formatSecondsToHHMM(seconds),
      split  = hhmm.split(':'),
      tothrs = parseInt(split[0]),
      days   = Math.floor(tothrs / 8),
      hrs    = tothrs % 8,
      mins   = parseInt(split[1]);

  return (days ? days + ' days' : '') + (hrs ? ' ' + hrs + ' hrs' : '') + (mins ? ' ' + mins + ' mins' : '');
};

/*******************************************************************************
 * DOM
 *******************************************************************************/


