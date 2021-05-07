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
    // Convert input to a number
    // @ts-ignore
    var excelDateNumber = Number.parseFloat(excelDate, 10);

    if (Number.isNaN(excelDateNumber)) {
      return done(new Error('First argument could not be parsed.'));
    } // Convert input to JS Date
    // Details here (mostly in comments): https://gist.github.com/christopherscott/2782634


    var secondsInDay = 24 * 60 * 60;
    var excelEpoch = new Date(Date.UTC(1899, 11, 31));
    var excelEpochTs = excelEpoch.getTime();
    var missingLeapYearDay = secondsInDay * 1000;
    var excelDelta = excelEpochTs - missingLeapYearDay;
    var excelTs = excelDateNumber * secondsInDay * 1000;
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

export default exceldate;
export { exceldate, exceldateTs };
//# sourceMappingURL=exceldate2.esm.js.map
