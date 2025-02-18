function getExcelEpoch() {
  return new Date(Date.UTC(1899, 11, 31));
}

function getExcelDelta() {
  return getExcelEpoch().getTime() - 864e5;
}

function validDateNumber(e) {
  return !("number" != typeof e || !Number.isFinite(e) || Number.isNaN(e) || e <= 0);
}

function excelDateNumber(e) {
  const t = Number.parseFloat(e, 10);
  if (validDateNumber(t)) return t;
}

function excelDateNumberToTs(e) {
  const t = excelDateNumber(e);
  if ("number" == typeof t) return 864e5 * t;
}

function ts2excel(e) {
  return e - getExcelDelta();
}

function date2excel(e) {
  return ts2excel(e.getTime());
}

function exceldateTs(e, t = ((e, t) => {
  if (e) throw e;
  return t;
})) {
  if (!e) return t(new Error("No first argument provided, nothing to convert."));
  try {
    const r = excelDateNumberToTs(e);
    return "number" != typeof r ? t(new Error("First argument could not be parsed.")) : t(null, r + getExcelDelta());
  } catch (e) {
    return t(e);
  }
}

function exceldate(e, t = ((e, t) => {
  if (e) throw e;
  return t;
})) {
  return exceldateTs(e, ((e, r) => {
    if (e) return t(e);
    try {
      const e = new Date(r);
      return t(null, e);
    } catch (e) {
      return t(e);
    }
  }));
}

export { date2excel, exceldate as default, excelDateNumber, excelDateNumberToTs, exceldate, exceldateTs, getExcelDelta, getExcelEpoch, ts2excel, validDateNumber };
//# sourceMappingURL=index.esm.mjs.map
