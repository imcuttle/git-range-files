/**
 * @file decode
 * @author Cuttle Cong
 * @date 2018/3/21
 * @description
 */
function oct2Decimal(oct) {
  return parseInt(oct, 8)
}

function decode(string) {
  string = string.trim();
  return string
    .replace(/^\"(.+)\"$/, '$1')
    .replace(/(\\\d{3})+/g, function (_) {
      var octArray = _.split('\\').slice(1)
      var decArray = octArray.map(function(oct) { return oct2Decimal(oct) })
      return new Buffer(decArray).toString('utf8')
    });
}

module.exports = decode
