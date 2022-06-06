
'use strict'

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
  module.exports = require('./exceldate2.cjs.production.min.cjs')
} else {
  module.exports = require('./exceldate2.cjs.development.cjs')
}
