
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./exceldate2.cjs.production.min.js')
} else {
  module.exports = require('./exceldate2.cjs.development.js')
}
