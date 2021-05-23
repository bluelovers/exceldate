'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var secondsInDay = 24 * 60 * 60;
var millisecondsInDay = secondsInDay * 1000;
var missingLeapYearDay = millisecondsInDay;
function getExcelEpoch() {
  var excelEpoch = new Date(Date.UTC(1899, 11, 31));
  return excelEpoch;
}
function getExcelDelta() {
  var excelEpochTs = getExcelEpoch().getTime();
  var excelDelta = excelEpochTs - missingLeapYearDay;
  return excelDelta;
}
function validDateNumber(excelDateNumber) {
  return !(typeof excelDateNumber !== 'number' || !Number.isFinite(excelDateNumber) || Number.isNaN(excelDateNumber) || excelDateNumber <= 0);
}
function excelDateNumber(excelDate) {
  // @ts-ignore
  var value = Number.parseFloat(excelDate, 10);

  if (validDateNumber(value)) {
    return value;
  }
}
/**
 * Convert input to a number
 */

function excelDateNumberToTs(excelDate) {
  var value = excelDateNumber(excelDate);

  if (typeof value === 'number') {
    //const excelDateSeconds = value * secondsInDay;
    var excelDateMilliseconds = value * millisecondsInDay;
    return excelDateMilliseconds;
  }
}
function ts2excel(milliseconds) {
  var excelDelta = getExcelDelta();
  return milliseconds - excelDelta;
}
function date2excel(date) {
  return ts2excel(date.getTime());
}
/**
 * Convert input to JS Date
 * Details here (mostly in comments): https://gist.github.com/christopherscott/2782634
 *
 * @link https://gist.github.com/christopherscott/2782634
 */

function exceldateTs(excelDate, done) {
  if (done === void 0) {
    done = function done(err, unixTs) {
      if (err) throw err;
      return unixTs;
    };
  }

  if (!excelDate) {
    return done(new Error('No first argument provided, nothing to convert.'));
  }

  try {
    var excelTs = excelDateNumberToTs(excelDate);

    if (typeof excelTs !== 'number') {
      return done(new Error('First argument could not be parsed.'));
    }

    var excelDelta = getExcelDelta();
    var unixTs = excelTs + excelDelta;
    return done(null, unixTs);
  } catch (e) {
    return done(e);
  }
}
/**
 * Takes an Excel timestamp (as a number or string) and returns a corresponding Date object
 */

function exceldate(excelDate, done) {
  if (done === void 0) {
    done = function done(err, res) {
      if (err) throw err;
      return res;
    };
  }

  return exceldateTs(excelDate, function (err, unixTs) {
    if (err) {
      return done(err);
    } else {
      try {
        var jsDate = new Date(unixTs);
        return done(null, jsDate);
      } catch (e) {
        return done(e);
      }
    }
  });
}

exports.date2excel = date2excel;
exports.default = exceldate;
exports.excelDateNumber = excelDateNumber;
exports.excelDateNumberToTs = excelDateNumberToTs;
exports.exceldate = exceldate;
exports.exceldateTs = exceldateTs;
exports.getExcelDelta = getExcelDelta;
exports.getExcelEpoch = getExcelEpoch;
exports.ts2excel = ts2excel;
exports.validDateNumber = validDateNumber;
//# sourceMappingURL=exceldate2.cjs.development.js.map
