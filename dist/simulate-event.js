!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.simulateEvent=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var variadic = require('variadic');

/**
 * Extend an single object with the properties of source object(s). Each
 * property added will override any existing property that matches.
 *
 * @param  {Object} obj
 * @param  {Object} ...
 * @return {Object}
 */
module.exports = variadic(function (obj, sources) {
  for (var i = 0; i < sources.length; i++) {
    for (var key in sources[i]) {
      obj[key] = sources[i][key];
    }
  }

  return obj;
});

},{"variadic":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var variadic = require('variadic');

/**
 * Get the property from an object. If the property is a function, immediately
 * call the function with optional arguments.
 *
 * @param  {Object} obj
 * @param  {String} property
 * @param  {*}      ...
 * @return {*}
 */
module.exports = variadic(function (obj, property, args) {
  var result = obj[property];

  if (typeof result === 'function') {
    result = result.apply(this, args);
  }

  return result;
});

},{"variadic":4}],4:[function(require,module,exports){
var __slice = Array.prototype.slice;

/**
 * Generate a function that accepts a variable number of arguments as the last
 * function argument.
 *
 * @param  {Function} fn
 * @return {Function}
 */
module.exports = function (fn) {
  var count = Math.max(fn.length - 1, 0);

  return function () {
    var args = __slice.call(arguments, 0, count);

    // Enforce the array length, in case we don't have enough array padding.
    args.length = count;
    args.push(__slice.call(arguments, count));

    return fn.apply(this, args);
  };
};

},{}],5:[function(require,module,exports){
var map    = require('./lib/map');
var extend = require('./lib/extend');
var result = require('./lib/result');

/**
 * Set some default options.
 *
 * @type {Object}
 */
var eventOptions = {
  UIEvent: function (el) {
    return {
      view: el.ownerDocument.defaultView
    };
  },
  FocusEvent: function () {
    return eventOptions.UIEvent.apply(this, arguments);
  },
  MouseEvent: function (el, type) {
    return {
      button:        0,
      cancelable:    (type !== 'mousemove'),
      ctrlKey:       false,
      altKey:        false,
      shiftKey:      false,
      metaKey:       false,
      clientX:       1,
      clientY:       1,
      screenX:       0,
      screenY:       0,
      view:          el.ownerDocument.defaultView,
      relatedTarget: el.ownerDocument.documentElement
    };
  },
  KeyboardEvent: function (el) {
    return {
      view:     el.ownerDocument.defaultView,
      ctrlKey:  false,
      altKey:   false,
      shiftKey: false,
      metaKey:  false,
      keyCode:  0
    };
  }
};

/**
 * Map event names to constructor names.
 *
 * @type {Object}
 */
var eventTypes = {
  beforeprint:        'Event',
  afterprint:         'Event',
  beforeunload:       'Event',
  abort:              'Event',
  error:              'Event',
  change:             'Event',
  submit:             'Event',
  reset:              'Event',
  cached:             'Event',
  canplay:            'Event',
  canplaythrough:     'Event',
  chargingchange:     'Event',
  chargingtimechange: 'Event',
  checking:           'Event',
  close:              'Event',
  downloading:        'Event',
  durationchange:     'Event',
  emptied:            'Event',
  ended:              'Event',
  fullscreenchange:   'Event',
  fullscreenerror:    'Event',
  input:              'Event',
  invalid:            'Event',
  levelchange:        'Event',
  loadeddata:         'Event',
  loadedmetadata:     'Event',
  noupdate:           'Event',
  obsolete:           'Event',
  offline:            'Event',
  online:             'Event',
  open:               'Event',
  orientationchange:  'Event',
  pause:              'Event',
  pointerlockchange:  'Event',
  pointerlockerror:   'Event',
  copy:               'Event',
  cut:                'Event',
  paste:              'Event',
  play:               'Event',
  playing:            'Event',
  ratechange:         'Event',
  readystatechange:   'Event',
  seeked:             'Event',
  seeking:            'Event',
  stalled:            'Event',
  success:            'Event',
  suspend:            'Event',
  timeupdate:         'Event',
  updateready:        'Event',
  visibilitychange:   'Event',
  volumechange:       'Event',
  waiting:            'Event',
  load:               'UIEvent',
  unload:             'UIEvent',
  resize:             'UIEvent',
  scroll:             'UIEvent',
  select:             'UIEvent',
  drag:               'UIEvent',
  dragenter:          'UIEvent',
  dragleave:          'UIEvent',
  dragover:           'UIEvent',
  dragstart:          'UIEvent',
  drop:               'UIEvent',
  touchcancel:        'UIEvent',
  touchend:           'UIEvent',
  touchenter:         'UIEvent',
  touchleave:         'UIEvent',
  touchmove:          'UIEvent',
  touchstart:         'UIEvent',
  blur:               'FocusEvent',
  focus:              'FocusEvent',
  focusin:            'FocusEvent',
  focusout:           'FocusEvent',
  show:               'MouseEvent',
  click:              'MouseEvent',
  dblclick:           'MouseEvent',
  mouseenter:         'MouseEvent',
  mouseleave:         'MouseEvent',
  mousedown:          'MouseEvent',
  mouseup:            'MouseEvent',
  mouseover:          'MouseEvent',
  mousemove:          'MouseEvent',
  mouseout:           'MouseEvent',
  contextmenu:        'MouseEvent',
  wheel:              'WheelEvent',
  message:            'MessageEvent',
  storage:            'StorageEvent',
  timeout:            'StorageEvent',
  keydown:            'KeyboardEvent',
  keypress:           'KeyboardEvent',
  keyup:              'KeyboardEvent',
  progress:           'ProgressEvent',
  loadend:            'ProgressEvent',
  loadstart:          'ProgressEvent',
  popstate:           'PopStateEvent',
  hashchange:         'HashChangeEvent',
  transitionend:      'TransitionEvent',
  compositionend:     'CompositionEvent',
  compositionstart:   'CompositionEvent',
  compositionupdate:  'CompositionEvent',
  pagehide:           'PageTransitionEvent',
  pageshow:           'PageTransitionEvent'
};

/**
 * Map the event type constructor to the initialization method.
 *
 * @type {Object}
 */
var eventInit = {
  Event:                  'ititEvent',
  UIEvent:                'initUIEvent',
  FocusEvent:             'initUIEvent',
  MouseEvent:             'initMouseEvent',
  WheelEvent:             'initMouseEvent',
  MessageEvent:           'initMessageEvent',
  StorageEvent:           'initStorageEvent',
  KeyboardEvent:          'initKeyboardEvent',
  ProgressEvent:          'initEvent',
  PopStateEvent:          'initEvent',
  TransitionEvent:        'initEvent',
  HashChangeEvent:        'initHashChangeEvent',
  CompositionEvent:       'initCompositionEvent',
  DeviceMotionEvent:      'initDeviceMotionEvent',
  PageTransitionEvent:    'initEvent',
  DeviceOrientationEvent: 'initDeviceOrientationEvent'
};

/**
 * Map the options object to initialization parameters.
 *
 * @type {Object}
 */
var eventParameters = {
  ititEvent: [
    'bubbles',
    'cancelable'
  ],
  initUIEvent: [
    'bubbles',
    'cancelable',
    'view',
    'detail'
  ],
  initKeyboardEvent: [
    'bubbles',
    'cancelable',
    'view',
    'char',
    'key',
    'location',
    'modifiersList',
    'repeat',
    'locale'
  ],
  initMouseEvent: [
    'bubbles',
    'cancelable',
    'view',
    'detail',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget'
  ],
  initHashChangeEvent: [
    'bubbles',
    'cancelable',
    'oldURL',
    'newURL'
  ],
  initCompositionEvent: [
    'bubbles',
    'cancelable',
    'view',
    'data',
    'locale'
  ],
  initDeviceMotionEvent: [
    'bubbles',
    'cancelable',
    'acceleration',
    'accelerationIncludingGravity',
    'rotationRate',
    'interval'
  ],
  initDeviceOrientationEvent: [
    'bubbles',
    'cancelable',
    'alpha',
    'beta',
    'gamma',
    'absolute'
  ],
  initMessageEvent: [
    'bubbles',
    'cancelable',
    'data',
    'origin',
    'lastEventId',
    'source'
  ],
  initStorageEvent: [
    'bubbles',
    'cancelable',
    'key',
    'oldValue',
    'newValue',
    'url',
    'storageArea'
  ]
};

/**
 * Exports the similate functionality.
 *
 * @param  {Element} element
 * @param  {String}  type
 * @param  {Object}  options
 * @return {Boolean}
 */
module.exports = function (element, type, options) {
  // Immediately throw an error when the event name does not translate.
  if (!eventTypes.hasOwnProperty(type)) {
    throw new SyntaxError('Unsupported event type');
  }

  var eventType = eventTypes[type];
  var initEvent = eventInit[eventType];
  var event;

  // Extend a new object with the default and passed in options.
  options = extend({
    bubbles:    true,
    cancelable: true
  }, result(eventOptions, eventType, element, type, options), options);

  // In < IE9, the `createEvent` function is not available and we have to
  // resort to using `fireEvent`.
  if (!document.createEvent) {
    event = extend(document.createEventObject(), options);
    return element.fireEvent('on' + type, event);
  }

  event = extend(document.createEvent(eventType), options);

  // Map argument names to the option values.
  var args = map(eventParameters[initEvent], function (parameter) {
    return options[parameter];
  });

  // Initialize the event using the built-in method.
  event[initEvent].apply(event, [type].concat(args));

  return element.dispatchEvent(event);
};

},{"./lib/extend":1,"./lib/map":2,"./lib/result":3}]},{},[5])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYmxha2VlbWJyZXkvUHJvamVjdHMvc2ltdWxhdGUtZXZlbnQvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9ibGFrZWVtYnJleS9Qcm9qZWN0cy9zaW11bGF0ZS1ldmVudC9saWIvZXh0ZW5kLmpzIiwiL1VzZXJzL2JsYWtlZW1icmV5L1Byb2plY3RzL3NpbXVsYXRlLWV2ZW50L2xpYi9tYXAuanMiLCIvVXNlcnMvYmxha2VlbWJyZXkvUHJvamVjdHMvc2ltdWxhdGUtZXZlbnQvbGliL3Jlc3VsdC5qcyIsIi9Vc2Vycy9ibGFrZWVtYnJleS9Qcm9qZWN0cy9zaW11bGF0ZS1ldmVudC9ub2RlX21vZHVsZXMvdmFyaWFkaWMvdmFyaWFkaWMuanMiLCIvVXNlcnMvYmxha2VlbWJyZXkvUHJvamVjdHMvc2ltdWxhdGUtZXZlbnQvc2ltdWxhdGUtZXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdmFyaWFkaWMgPSByZXF1aXJlKCd2YXJpYWRpYycpO1xuXG4vKipcbiAqIEV4dGVuZCBhbiBzaW5nbGUgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKS4gRWFjaFxuICogcHJvcGVydHkgYWRkZWQgd2lsbCBvdmVycmlkZSBhbnkgZXhpc3RpbmcgcHJvcGVydHkgdGhhdCBtYXRjaGVzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gIHtPYmplY3R9IC4uLlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHZhcmlhZGljKGZ1bmN0aW9uIChvYmosIHNvdXJjZXMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZXNbaV0pIHtcbiAgICAgIG9ialtrZXldID0gc291cmNlc1tpXVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59KTtcbiIsIi8qKlxuICogTWFwIGFuIG9iamVjdCBwcm9wZXJ0aWVzIHRvIGEgbmV3IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgb2JqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSAge09iamVjdH0gICBjb250ZXh0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgZm4sIGNvbnRleHQpIHtcbiAgdmFyIG1hcCA9IHt9O1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBtYXBba2V5XSA9IGZuLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgfVxuXG4gIHJldHVybiBtYXA7XG59O1xuIiwidmFyIHZhcmlhZGljID0gcmVxdWlyZSgndmFyaWFkaWMnKTtcblxuLyoqXG4gKiBHZXQgdGhlIHByb3BlcnR5IGZyb20gYW4gb2JqZWN0LiBJZiB0aGUgcHJvcGVydHkgaXMgYSBmdW5jdGlvbiwgaW1tZWRpYXRlbHlcbiAqIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggb3B0aW9uYWwgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcGFyYW0gIHsqfSAgICAgIC4uLlxuICogQHJldHVybiB7Kn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB2YXJpYWRpYyhmdW5jdGlvbiAob2JqLCBwcm9wZXJ0eSwgYXJncykge1xuICB2YXIgcmVzdWx0ID0gb2JqW3Byb3BlcnR5XTtcblxuICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlc3VsdCA9IHJlc3VsdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfX3NsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgdmFyaWFibGUgbnVtYmVyIG9mIGFyZ3VtZW50cyBhcyB0aGUgbGFzdFxuICogZnVuY3Rpb24gYXJndW1lbnQuXG4gKlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGNvdW50ID0gTWF0aC5tYXgoZm4ubGVuZ3RoIC0gMSwgMCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGNvdW50KTtcblxuICAgIC8vIEVuZm9yY2UgdGhlIGFycmF5IGxlbmd0aCwgaW4gY2FzZSB3ZSBkb24ndCBoYXZlIGVub3VnaCBhcnJheSBwYWRkaW5nLlxuICAgIGFyZ3MubGVuZ3RoID0gY291bnQ7XG4gICAgYXJncy5wdXNoKF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIGNvdW50KSk7XG5cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59O1xuIiwidmFyIG1hcCAgICA9IHJlcXVpcmUoJy4vbGliL21hcCcpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4vbGliL2V4dGVuZCcpO1xudmFyIHJlc3VsdCA9IHJlcXVpcmUoJy4vbGliL3Jlc3VsdCcpO1xuXG4vKipcbiAqIFNldCBzb21lIGRlZmF1bHQgb3B0aW9ucy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRPcHRpb25zID0ge1xuICBVSUV2ZW50OiBmdW5jdGlvbiAoZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlldzogZWwub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlld1xuICAgIH07XG4gIH0sXG4gIEZvY3VzRXZlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXZlbnRPcHRpb25zLlVJRXZlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfSxcbiAgTW91c2VFdmVudDogZnVuY3Rpb24gKGVsLCB0eXBlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJ1dHRvbjogICAgICAgIDAsXG4gICAgICBjYW5jZWxhYmxlOiAgICAodHlwZSAhPT0gJ21vdXNlbW92ZScpLFxuICAgICAgY3RybEtleTogICAgICAgZmFsc2UsXG4gICAgICBhbHRLZXk6ICAgICAgICBmYWxzZSxcbiAgICAgIHNoaWZ0S2V5OiAgICAgIGZhbHNlLFxuICAgICAgbWV0YUtleTogICAgICAgZmFsc2UsXG4gICAgICBjbGllbnRYOiAgICAgICAxLFxuICAgICAgY2xpZW50WTogICAgICAgMSxcbiAgICAgIHNjcmVlblg6ICAgICAgIDAsXG4gICAgICBzY3JlZW5ZOiAgICAgICAwLFxuICAgICAgdmlldzogICAgICAgICAgZWwub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyxcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IGVsLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgfTtcbiAgfSxcbiAgS2V5Ym9hcmRFdmVudDogZnVuY3Rpb24gKGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZpZXc6ICAgICBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LFxuICAgICAgY3RybEtleTogIGZhbHNlLFxuICAgICAgYWx0S2V5OiAgIGZhbHNlLFxuICAgICAgc2hpZnRLZXk6IGZhbHNlLFxuICAgICAgbWV0YUtleTogIGZhbHNlLFxuICAgICAga2V5Q29kZTogIDBcbiAgICB9O1xuICB9XG59O1xuXG4vKipcbiAqIE1hcCBldmVudCBuYW1lcyB0byBjb25zdHJ1Y3RvciBuYW1lcy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRUeXBlcyA9IHtcbiAgYmVmb3JlcHJpbnQ6ICAgICAgICAnRXZlbnQnLFxuICBhZnRlcnByaW50OiAgICAgICAgICdFdmVudCcsXG4gIGJlZm9yZXVubG9hZDogICAgICAgJ0V2ZW50JyxcbiAgYWJvcnQ6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBlcnJvcjogICAgICAgICAgICAgICdFdmVudCcsXG4gIGNoYW5nZTogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgc3VibWl0OiAgICAgICAgICAgICAnRXZlbnQnLFxuICByZXNldDogICAgICAgICAgICAgICdFdmVudCcsXG4gIGNhY2hlZDogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgY2FucGxheTogICAgICAgICAgICAnRXZlbnQnLFxuICBjYW5wbGF5dGhyb3VnaDogICAgICdFdmVudCcsXG4gIGNoYXJnaW5nY2hhbmdlOiAgICAgJ0V2ZW50JyxcbiAgY2hhcmdpbmd0aW1lY2hhbmdlOiAnRXZlbnQnLFxuICBjaGVja2luZzogICAgICAgICAgICdFdmVudCcsXG4gIGNsb3NlOiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgZG93bmxvYWRpbmc6ICAgICAgICAnRXZlbnQnLFxuICBkdXJhdGlvbmNoYW5nZTogICAgICdFdmVudCcsXG4gIGVtcHRpZWQ6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgZW5kZWQ6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBmdWxsc2NyZWVuY2hhbmdlOiAgICdFdmVudCcsXG4gIGZ1bGxzY3JlZW5lcnJvcjogICAgJ0V2ZW50JyxcbiAgaW5wdXQ6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBpbnZhbGlkOiAgICAgICAgICAgICdFdmVudCcsXG4gIGxldmVsY2hhbmdlOiAgICAgICAgJ0V2ZW50JyxcbiAgbG9hZGVkZGF0YTogICAgICAgICAnRXZlbnQnLFxuICBsb2FkZWRtZXRhZGF0YTogICAgICdFdmVudCcsXG4gIG5vdXBkYXRlOiAgICAgICAgICAgJ0V2ZW50JyxcbiAgb2Jzb2xldGU6ICAgICAgICAgICAnRXZlbnQnLFxuICBvZmZsaW5lOiAgICAgICAgICAgICdFdmVudCcsXG4gIG9ubGluZTogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgb3BlbjogICAgICAgICAgICAgICAnRXZlbnQnLFxuICBvcmllbnRhdGlvbmNoYW5nZTogICdFdmVudCcsXG4gIHBhdXNlOiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcG9pbnRlcmxvY2tjaGFuZ2U6ICAnRXZlbnQnLFxuICBwb2ludGVybG9ja2Vycm9yOiAgICdFdmVudCcsXG4gIGNvcHk6ICAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgY3V0OiAgICAgICAgICAgICAgICAnRXZlbnQnLFxuICBwYXN0ZTogICAgICAgICAgICAgICdFdmVudCcsXG4gIHBsYXk6ICAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcGxheWluZzogICAgICAgICAgICAnRXZlbnQnLFxuICByYXRlY2hhbmdlOiAgICAgICAgICdFdmVudCcsXG4gIHJlYWR5c3RhdGVjaGFuZ2U6ICAgJ0V2ZW50JyxcbiAgc2Vla2VkOiAgICAgICAgICAgICAnRXZlbnQnLFxuICBzZWVraW5nOiAgICAgICAgICAgICdFdmVudCcsXG4gIHN0YWxsZWQ6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgc3VjY2VzczogICAgICAgICAgICAnRXZlbnQnLFxuICBzdXNwZW5kOiAgICAgICAgICAgICdFdmVudCcsXG4gIHRpbWV1cGRhdGU6ICAgICAgICAgJ0V2ZW50JyxcbiAgdXBkYXRlcmVhZHk6ICAgICAgICAnRXZlbnQnLFxuICB2aXNpYmlsaXR5Y2hhbmdlOiAgICdFdmVudCcsXG4gIHZvbHVtZWNoYW5nZTogICAgICAgJ0V2ZW50JyxcbiAgd2FpdGluZzogICAgICAgICAgICAnRXZlbnQnLFxuICBsb2FkOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgdW5sb2FkOiAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIHJlc2l6ZTogICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBzY3JvbGw6ICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgc2VsZWN0OiAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyYWc6ICAgICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnZW50ZXI6ICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJhZ2xlYXZlOiAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyYWdvdmVyOiAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnc3RhcnQ6ICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJvcDogICAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNoY2FuY2VsOiAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaGVuZDogICAgICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2hlbnRlcjogICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNobGVhdmU6ICAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaG1vdmU6ICAgICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2hzdGFydDogICAgICAgICAnVUlFdmVudCcsXG4gIGJsdXI6ICAgICAgICAgICAgICAgJ0ZvY3VzRXZlbnQnLFxuICBmb2N1czogICAgICAgICAgICAgICdGb2N1c0V2ZW50JyxcbiAgZm9jdXNpbjogICAgICAgICAgICAnRm9jdXNFdmVudCcsXG4gIGZvY3Vzb3V0OiAgICAgICAgICAgJ0ZvY3VzRXZlbnQnLFxuICBzaG93OiAgICAgICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgY2xpY2s6ICAgICAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIGRibGNsaWNrOiAgICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZWVudGVyOiAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2VsZWF2ZTogICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlZG93bjogICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZXVwOiAgICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2VvdmVyOiAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlbW92ZTogICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZW91dDogICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgY29udGV4dG1lbnU6ICAgICAgICAnTW91c2VFdmVudCcsXG4gIHdoZWVsOiAgICAgICAgICAgICAgJ1doZWVsRXZlbnQnLFxuICBtZXNzYWdlOiAgICAgICAgICAgICdNZXNzYWdlRXZlbnQnLFxuICBzdG9yYWdlOiAgICAgICAgICAgICdTdG9yYWdlRXZlbnQnLFxuICB0aW1lb3V0OiAgICAgICAgICAgICdTdG9yYWdlRXZlbnQnLFxuICBrZXlkb3duOiAgICAgICAgICAgICdLZXlib2FyZEV2ZW50JyxcbiAga2V5cHJlc3M6ICAgICAgICAgICAnS2V5Ym9hcmRFdmVudCcsXG4gIGtleXVwOiAgICAgICAgICAgICAgJ0tleWJvYXJkRXZlbnQnLFxuICBwcm9ncmVzczogICAgICAgICAgICdQcm9ncmVzc0V2ZW50JyxcbiAgbG9hZGVuZDogICAgICAgICAgICAnUHJvZ3Jlc3NFdmVudCcsXG4gIGxvYWRzdGFydDogICAgICAgICAgJ1Byb2dyZXNzRXZlbnQnLFxuICBwb3BzdGF0ZTogICAgICAgICAgICdQb3BTdGF0ZUV2ZW50JyxcbiAgaGFzaGNoYW5nZTogICAgICAgICAnSGFzaENoYW5nZUV2ZW50JyxcbiAgdHJhbnNpdGlvbmVuZDogICAgICAnVHJhbnNpdGlvbkV2ZW50JyxcbiAgY29tcG9zaXRpb25lbmQ6ICAgICAnQ29tcG9zaXRpb25FdmVudCcsXG4gIGNvbXBvc2l0aW9uc3RhcnQ6ICAgJ0NvbXBvc2l0aW9uRXZlbnQnLFxuICBjb21wb3NpdGlvbnVwZGF0ZTogICdDb21wb3NpdGlvbkV2ZW50JyxcbiAgcGFnZWhpZGU6ICAgICAgICAgICAnUGFnZVRyYW5zaXRpb25FdmVudCcsXG4gIHBhZ2VzaG93OiAgICAgICAgICAgJ1BhZ2VUcmFuc2l0aW9uRXZlbnQnXG59O1xuXG4vKipcbiAqIE1hcCB0aGUgZXZlbnQgdHlwZSBjb25zdHJ1Y3RvciB0byB0aGUgaW5pdGlhbGl6YXRpb24gbWV0aG9kLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudEluaXQgPSB7XG4gIEV2ZW50OiAgICAgICAgICAgICAgICAgICdpdGl0RXZlbnQnLFxuICBVSUV2ZW50OiAgICAgICAgICAgICAgICAnaW5pdFVJRXZlbnQnLFxuICBGb2N1c0V2ZW50OiAgICAgICAgICAgICAnaW5pdFVJRXZlbnQnLFxuICBNb3VzZUV2ZW50OiAgICAgICAgICAgICAnaW5pdE1vdXNlRXZlbnQnLFxuICBXaGVlbEV2ZW50OiAgICAgICAgICAgICAnaW5pdE1vdXNlRXZlbnQnLFxuICBNZXNzYWdlRXZlbnQ6ICAgICAgICAgICAnaW5pdE1lc3NhZ2VFdmVudCcsXG4gIFN0b3JhZ2VFdmVudDogICAgICAgICAgICdpbml0U3RvcmFnZUV2ZW50JyxcbiAgS2V5Ym9hcmRFdmVudDogICAgICAgICAgJ2luaXRLZXlib2FyZEV2ZW50JyxcbiAgUHJvZ3Jlc3NFdmVudDogICAgICAgICAgJ2luaXRFdmVudCcsXG4gIFBvcFN0YXRlRXZlbnQ6ICAgICAgICAgICdpbml0RXZlbnQnLFxuICBUcmFuc2l0aW9uRXZlbnQ6ICAgICAgICAnaW5pdEV2ZW50JyxcbiAgSGFzaENoYW5nZUV2ZW50OiAgICAgICAgJ2luaXRIYXNoQ2hhbmdlRXZlbnQnLFxuICBDb21wb3NpdGlvbkV2ZW50OiAgICAgICAnaW5pdENvbXBvc2l0aW9uRXZlbnQnLFxuICBEZXZpY2VNb3Rpb25FdmVudDogICAgICAnaW5pdERldmljZU1vdGlvbkV2ZW50JyxcbiAgUGFnZVRyYW5zaXRpb25FdmVudDogICAgJ2luaXRFdmVudCcsXG4gIERldmljZU9yaWVudGF0aW9uRXZlbnQ6ICdpbml0RGV2aWNlT3JpZW50YXRpb25FdmVudCdcbn07XG5cbi8qKlxuICogTWFwIHRoZSBvcHRpb25zIG9iamVjdCB0byBpbml0aWFsaXphdGlvbiBwYXJhbWV0ZXJzLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudFBhcmFtZXRlcnMgPSB7XG4gIGl0aXRFdmVudDogW1xuICAgICdidWJibGVzJyxcbiAgICAnY2FuY2VsYWJsZSdcbiAgXSxcbiAgaW5pdFVJRXZlbnQ6IFtcbiAgICAnYnViYmxlcycsXG4gICAgJ2NhbmNlbGFibGUnLFxuICAgICd2aWV3JyxcbiAgICAnZGV0YWlsJ1xuICBdLFxuICBpbml0S2V5Ym9hcmRFdmVudDogW1xuICAgICdidWJibGVzJyxcbiAgICAnY2FuY2VsYWJsZScsXG4gICAgJ3ZpZXcnLFxuICAgICdjaGFyJyxcbiAgICAna2V5JyxcbiAgICAnbG9jYXRpb24nLFxuICAgICdtb2RpZmllcnNMaXN0JyxcbiAgICAncmVwZWF0JyxcbiAgICAnbG9jYWxlJ1xuICBdLFxuICBpbml0TW91c2VFdmVudDogW1xuICAgICdidWJibGVzJyxcbiAgICAnY2FuY2VsYWJsZScsXG4gICAgJ3ZpZXcnLFxuICAgICdkZXRhaWwnLFxuICAgICdzY3JlZW5YJyxcbiAgICAnc2NyZWVuWScsXG4gICAgJ2NsaWVudFgnLFxuICAgICdjbGllbnRZJyxcbiAgICAnY3RybEtleScsXG4gICAgJ2FsdEtleScsXG4gICAgJ3NoaWZ0S2V5JyxcbiAgICAnbWV0YUtleScsXG4gICAgJ2J1dHRvbicsXG4gICAgJ3JlbGF0ZWRUYXJnZXQnXG4gIF0sXG4gIGluaXRIYXNoQ2hhbmdlRXZlbnQ6IFtcbiAgICAnYnViYmxlcycsXG4gICAgJ2NhbmNlbGFibGUnLFxuICAgICdvbGRVUkwnLFxuICAgICduZXdVUkwnXG4gIF0sXG4gIGluaXRDb21wb3NpdGlvbkV2ZW50OiBbXG4gICAgJ2J1YmJsZXMnLFxuICAgICdjYW5jZWxhYmxlJyxcbiAgICAndmlldycsXG4gICAgJ2RhdGEnLFxuICAgICdsb2NhbGUnXG4gIF0sXG4gIGluaXREZXZpY2VNb3Rpb25FdmVudDogW1xuICAgICdidWJibGVzJyxcbiAgICAnY2FuY2VsYWJsZScsXG4gICAgJ2FjY2VsZXJhdGlvbicsXG4gICAgJ2FjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHknLFxuICAgICdyb3RhdGlvblJhdGUnLFxuICAgICdpbnRlcnZhbCdcbiAgXSxcbiAgaW5pdERldmljZU9yaWVudGF0aW9uRXZlbnQ6IFtcbiAgICAnYnViYmxlcycsXG4gICAgJ2NhbmNlbGFibGUnLFxuICAgICdhbHBoYScsXG4gICAgJ2JldGEnLFxuICAgICdnYW1tYScsXG4gICAgJ2Fic29sdXRlJ1xuICBdLFxuICBpbml0TWVzc2FnZUV2ZW50OiBbXG4gICAgJ2J1YmJsZXMnLFxuICAgICdjYW5jZWxhYmxlJyxcbiAgICAnZGF0YScsXG4gICAgJ29yaWdpbicsXG4gICAgJ2xhc3RFdmVudElkJyxcbiAgICAnc291cmNlJ1xuICBdLFxuICBpbml0U3RvcmFnZUV2ZW50OiBbXG4gICAgJ2J1YmJsZXMnLFxuICAgICdjYW5jZWxhYmxlJyxcbiAgICAna2V5JyxcbiAgICAnb2xkVmFsdWUnLFxuICAgICduZXdWYWx1ZScsXG4gICAgJ3VybCcsXG4gICAgJ3N0b3JhZ2VBcmVhJ1xuICBdXG59O1xuXG4vKipcbiAqIEV4cG9ydHMgdGhlIHNpbWlsYXRlIGZ1bmN0aW9uYWxpdHkuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtICB7U3RyaW5nfSAgdHlwZVxuICogQHBhcmFtICB7T2JqZWN0fSAgb3B0aW9uc1xuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCwgdHlwZSwgb3B0aW9ucykge1xuICAvLyBJbW1lZGlhdGVseSB0aHJvdyBhbiBlcnJvciB3aGVuIHRoZSBldmVudCBuYW1lIGRvZXMgbm90IHRyYW5zbGF0ZS5cbiAgaWYgKCFldmVudFR5cGVzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbnN1cHBvcnRlZCBldmVudCB0eXBlJyk7XG4gIH1cblxuICB2YXIgZXZlbnRUeXBlID0gZXZlbnRUeXBlc1t0eXBlXTtcbiAgdmFyIGluaXRFdmVudCA9IGV2ZW50SW5pdFtldmVudFR5cGVdO1xuICB2YXIgZXZlbnQ7XG5cbiAgLy8gRXh0ZW5kIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBkZWZhdWx0IGFuZCBwYXNzZWQgaW4gb3B0aW9ucy5cbiAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgYnViYmxlczogICAgdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlXG4gIH0sIHJlc3VsdChldmVudE9wdGlvbnMsIGV2ZW50VHlwZSwgZWxlbWVudCwgdHlwZSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuXG4gIC8vIEluIDwgSUU5LCB0aGUgYGNyZWF0ZUV2ZW50YCBmdW5jdGlvbiBpcyBub3QgYXZhaWxhYmxlIGFuZCB3ZSBoYXZlIHRvXG4gIC8vIHJlc29ydCB0byB1c2luZyBgZmlyZUV2ZW50YC5cbiAgaWYgKCFkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgIGV2ZW50ID0gZXh0ZW5kKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCksIG9wdGlvbnMpO1xuICAgIHJldHVybiBlbGVtZW50LmZpcmVFdmVudCgnb24nICsgdHlwZSwgZXZlbnQpO1xuICB9XG5cbiAgZXZlbnQgPSBleHRlbmQoZG9jdW1lbnQuY3JlYXRlRXZlbnQoZXZlbnRUeXBlKSwgb3B0aW9ucyk7XG5cbiAgLy8gTWFwIGFyZ3VtZW50IG5hbWVzIHRvIHRoZSBvcHRpb24gdmFsdWVzLlxuICB2YXIgYXJncyA9IG1hcChldmVudFBhcmFtZXRlcnNbaW5pdEV2ZW50XSwgZnVuY3Rpb24gKHBhcmFtZXRlcikge1xuICAgIHJldHVybiBvcHRpb25zW3BhcmFtZXRlcl07XG4gIH0pO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIGV2ZW50IHVzaW5nIHRoZSBidWlsdC1pbiBtZXRob2QuXG4gIGV2ZW50W2luaXRFdmVudF0uYXBwbHkoZXZlbnQsIFt0eXBlXS5jb25jYXQoYXJncykpO1xuXG4gIHJldHVybiBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcbiJdfQ==
(5)
});
