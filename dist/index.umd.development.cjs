(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.exceldate2 = {}));
})(this, (function (exports) { 'use strict';

	const secondsInDay = 24 * 60 * 60;
	const millisecondsInDay = secondsInDay * 1000;
	const missingLeapYearDay = millisecondsInDay;
	function getExcelEpoch() {
	  const excelEpoch = new Date(Date.UTC(1899, 11, 31));
	  return excelEpoch;
	}
	function getExcelDelta() {
	  const excelEpochTs = getExcelEpoch().getTime();
	  const excelDelta = excelEpochTs - missingLeapYearDay;
	  return excelDelta;
	}
	function validDateNumber(excelDateNumber) {
	  return !(typeof excelDateNumber !== 'number' || !Number.isFinite(excelDateNumber) || Number.isNaN(excelDateNumber) || excelDateNumber <= 0);
	}
	function excelDateNumber(excelDate) {
	  const value = Number.parseFloat(excelDate, 10);

	  if (validDateNumber(value)) {
	    return value;
	  }
	}
	function excelDateNumberToTs(excelDate) {
	  const value = excelDateNumber(excelDate);

	  if (typeof value === 'number') {
	    const excelDateMilliseconds = value * millisecondsInDay;
	    return excelDateMilliseconds;
	  }
	}
	function ts2excel(milliseconds) {
	  const excelDelta = getExcelDelta();
	  return milliseconds - excelDelta;
	}
	function date2excel(date) {
	  return ts2excel(date.getTime());
	}
	function exceldateTs(excelDate, done = (err, unixTs) => {
	  if (err) throw err;
	  return unixTs;
	}) {
	  if (!excelDate) {
	    return done(new Error('No first argument provided, nothing to convert.'));
	  }

	  try {
	    const excelTs = excelDateNumberToTs(excelDate);

	    if (typeof excelTs !== 'number') {
	      return done(new Error('First argument could not be parsed.'));
	    }

	    const excelDelta = getExcelDelta();
	    const unixTs = excelTs + excelDelta;
	    return done(null, unixTs);
	  } catch (e) {
	    return done(e);
	  }
	}
	function exceldate(excelDate, done = (err, res) => {
	  if (err) throw err;
	  return res;
	}) {
	  return exceldateTs(excelDate, (err, unixTs) => {
	    if (err) {
	      return done(err);
	    } else {
	      try {
	        const jsDate = new Date(unixTs);
	        return done(null, jsDate);
	      } catch (e) {
	        return done(e);
	      }
	    }
	  });
	}

	exports.date2excel = date2excel;
	exports["default"] = exceldate;
	exports.excelDateNumber = excelDateNumber;
	exports.excelDateNumberToTs = excelDateNumberToTs;
	exports.exceldate = exceldate;
	exports.exceldateTs = exceldateTs;
	exports.getExcelDelta = getExcelDelta;
	exports.getExcelEpoch = getExcelEpoch;
	exports.ts2excel = ts2excel;
	exports.validDateNumber = validDateNumber;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.development.cjs.map
