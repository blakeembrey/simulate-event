/**
 * Map an object properties to a new object.
 *
 * @param  {Object}   obj
 * @param  {Function} fn
 * @param  {Object}   context
 * @return {Object}
 */
module.exports = function (obj, fn, context) {
  var map = {};

  for (var key in obj) {
    map[key] = fn.call(context, obj[key], key, obj);
  }

  return map;
};
