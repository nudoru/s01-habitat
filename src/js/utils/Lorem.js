var _currentText      = [],
    _defaultTextSet,
    _maleFirstNames   = [],
    _femaleFirstNames = [],
    _lastNames        = [],
    _punctuation      = [],
    _months,
    _days,
    _toolbox          = require('./Toolbox');

_defaultTextSet = 'Perhaps a re-engineering of your current world view will re-energize your online nomenclature to enable a new holistic interactive enterprise internet communication solution Upscaling the resurgent networking exchange solutions achieving a breakaway systemic electronic data interchange system synchronization thereby exploiting technical environments for mission critical broad based capacity constrained systems Fundamentally transforming well designed actionable information whose semantic content is virtually null To more fully clarify the current exchange a few aggregate issues will require addressing to facilitate this distributed communication venue In integrating non-aligned structures into existing legacy systems a holistic gateway blueprint is a backward compatible packaging tangible';

_lastNames = 'Smith Johnson Williams Jones Brown Davis Miller Wilson Moore Taylor Anderson Thomas Jackson White Harris Martin Thompson Garcia Martinez Robinson Clark Rodriguez Lewis Lee Walker Hall Allen Young Hernandez King Wright Lopez Hill Scott Green Adams Baker Gonzalez Nelson Carter Mitchell Perez Roberts Turner Phillips Campbell Parker Evans Edwards Collins Stewart Sanchez Morris Rogers Reed Cook Morgan Bell Murphy'.split(' ');

_maleFirstNames = 'Thomas Arthur Lewis Clarence Leonard Albert Paul Carl Ralph Roy Earl Samuel Howard Richard Francis Laurence Herbert Elmer Ernest Theodore David Alfred Donald Russell Eugene Andrew Kenneth Herman Jesse Lester Floyd Michael Edwin Clifford Benjamin Clyde Glen Oscar Daniel'.split(' ');

_femaleFirstNames = 'Elizabeth Ann Helen Margaret Ellen Catherine Lily Florence Ada Lou Ethel Emily Ruth Rose Frances Alice Bertha Clara Mabel Minnie Grace Jane Evelyn Gertrude Edna Pearl Laura Hazel Edith Esther Harriet Sarah May Matilda Martha Myrtle Josephine Maud Agnes Keri Julia Irene Mildred Cora'.split(' ');

_punctuation = ['.', '.', '.', '.', '?', '!'];

_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

_currentText = _defaultTextSet.toLowerCase().split(' ');

function rNumber(min, max) {
  return _toolbox.rndNumber(min, max);
}

function oneOf(arry) {
  return arry[rNumber(0, arry.length - 1)];
}

function severalOf(num, arry) {
  if (num >= arry.length) {
    return arry;
  }
  let res = [];
  for (let i = 0; i < num; i++) {
    res.push(oneOf(arry));
  }
  return res;
}

function sentence(min, max) {
  return _toolbox.capitalizeFirstLetterStr(text(min, max)) + oneOf(_punctuation);
}

function title(min, max) {
  return _toolbox.toTitleCaseStr(text(min, max));
}

function paragraph(min, max) {
  var str   = '',
      delim = ' ',
      len   = rNumber(min, max),
      i     = 0;

  for (; i < len; i++) {
    if (i === len - 1) {
      delim = '';
    }
    str += sentence(1, 10) + delim;
  }

  return str;
}

function text(min, max) {
  var str   = '',
      delim = ' ',
      len   = rNumber(min, max),
      i     = 0;

  for (; i < len; i++) {
    if (i === len - 1) {
      delim = '';
    }
    str += oneOf(_currentText) + delim;
  }

  return str;
}

function getFirstName() {
  return rNumber(0, 1) ? oneOf(_maleFirstNames) : oneOf(_femaleFirstNames);
}

function getLastName() {
  return oneOf(_lastNames);
}

function firstLastName() {
  return getFirstName() + ' ' + getLastName();
}

function lastFirstName() {
  return getLastName() + ', ' + getFirstName();
}

/**
 * Better implementation http://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
 * @returns {{monthNumber: *, monthName: *, monthDay, weekDayNumber: *, weekDay: *, year}}
 */
function date() {
  var month = rNumber(0, 11),
      wkday = rNumber(0, 4),
      date  = {
        monthNumber  : month + 1,
        monthName    : _months[month],
        monthDay     : rNumber(1, 28),
        weekDayNumber: wkday + 1,
        weekDay      : _days[wkday],
        year         : _toolbox.rndElement(['2017'])
      };

  date.string = date.monthName + ' ' + date.monthDay + ', ' + date.year;

  return date;
}

/**
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @returns {string}
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports = {
  rNumber,
  oneOf,
  severalOf,
  text,
  sentence,
  title,
  paragraph,
  firstLastName,
  lastFirstName,
  date,
  guid
};