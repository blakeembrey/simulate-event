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
  ititEvent: [],
  initUIEvent: [
    'view',
    'detail'
  ],
  initKeyboardEvent: [
    'view',
    'char',
    'key',
    'location',
    'modifiersList',
    'repeat',
    'locale'
  ],
  initMouseEvent: [
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
    'oldURL',
    'newURL'
  ],
  initCompositionEvent: [
    'view',
    'data',
    'locale'
  ],
  initDeviceMotionEvent: [
    'acceleration',
    'accelerationIncludingGravity',
    'rotationRate',
    'interval'
  ],
  initDeviceOrientationEvent: [
    'alpha',
    'beta',
    'gamma',
    'absolute'
  ],
  initMessageEvent: [
    'data',
    'origin',
    'lastEventId',
    'source'
  ],
  initStorageEvent: [
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
  event[initEvent].apply(
    event, [type, event.bubbles, event.cancelable].concat(args)
  );

  return element.dispatchEvent(event);
};

},{"./lib/extend":1,"./lib/map":2,"./lib/result":3}]},{},[5])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYmxha2VlbWJyZXkvUHJvamVjdHMvc2ltdWxhdGUtZXZlbnQvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9ibGFrZWVtYnJleS9Qcm9qZWN0cy9zaW11bGF0ZS1ldmVudC9saWIvZXh0ZW5kLmpzIiwiL1VzZXJzL2JsYWtlZW1icmV5L1Byb2plY3RzL3NpbXVsYXRlLWV2ZW50L2xpYi9tYXAuanMiLCIvVXNlcnMvYmxha2VlbWJyZXkvUHJvamVjdHMvc2ltdWxhdGUtZXZlbnQvbGliL3Jlc3VsdC5qcyIsIi9Vc2Vycy9ibGFrZWVtYnJleS9Qcm9qZWN0cy9zaW11bGF0ZS1ldmVudC9ub2RlX21vZHVsZXMvdmFyaWFkaWMvdmFyaWFkaWMuanMiLCIvVXNlcnMvYmxha2VlbWJyZXkvUHJvamVjdHMvc2ltdWxhdGUtZXZlbnQvc2ltdWxhdGUtZXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHZhcmlhZGljID0gcmVxdWlyZSgndmFyaWFkaWMnKTtcblxuLyoqXG4gKiBFeHRlbmQgYW4gc2luZ2xlIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykuIEVhY2hcbiAqIHByb3BlcnR5IGFkZGVkIHdpbGwgb3ZlcnJpZGUgYW55IGV4aXN0aW5nIHByb3BlcnR5IHRoYXQgbWF0Y2hlcy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9ialxuICogQHBhcmFtICB7T2JqZWN0fSAuLi5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB2YXJpYWRpYyhmdW5jdGlvbiAob2JqLCBzb3VyY2VzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2VzW2ldKSB7XG4gICAgICBvYmpba2V5XSA9IHNvdXJjZXNbaV1ba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSk7XG4iLCIvKipcbiAqIE1hcCBhbiBvYmplY3QgcHJvcGVydGllcyB0byBhIG5ldyBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSAgIG9ialxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgY29udGV4dFxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIGZuLCBjb250ZXh0KSB7XG4gIHZhciBtYXAgPSB7fTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgbWFwW2tleV0gPSBmbi5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gIH1cblxuICByZXR1cm4gbWFwO1xufTtcbiIsInZhciB2YXJpYWRpYyA9IHJlcXVpcmUoJ3ZhcmlhZGljJyk7XG5cbi8qKlxuICogR2V0IHRoZSBwcm9wZXJ0eSBmcm9tIGFuIG9iamVjdC4gSWYgdGhlIHByb3BlcnR5IGlzIGEgZnVuY3Rpb24sIGltbWVkaWF0ZWx5XG4gKiBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIG9wdGlvbmFsIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9ialxuICogQHBhcmFtICB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHBhcmFtICB7Kn0gICAgICAuLi5cbiAqIEByZXR1cm4geyp9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gdmFyaWFkaWMoZnVuY3Rpb24gKG9iaiwgcHJvcGVydHksIGFyZ3MpIHtcbiAgdmFyIHJlc3VsdCA9IG9ialtwcm9wZXJ0eV07XG5cbiAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXN1bHQgPSByZXN1bHQuYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufSk7XG4iLCJ2YXIgX19zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhIHZhcmlhYmxlIG51bWJlciBvZiBhcmd1bWVudHMgYXMgdGhlIGxhc3RcbiAqIGZ1bmN0aW9uIGFyZ3VtZW50LlxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBjb3VudCA9IE1hdGgubWF4KGZuLmxlbmd0aCAtIDEsIDApO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBjb3VudCk7XG5cbiAgICAvLyBFbmZvcmNlIHRoZSBhcnJheSBsZW5ndGgsIGluIGNhc2Ugd2UgZG9uJ3QgaGF2ZSBlbm91Z2ggYXJyYXkgcGFkZGluZy5cbiAgICBhcmdzLmxlbmd0aCA9IGNvdW50O1xuICAgIGFyZ3MucHVzaChfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCBjb3VudCkpO1xuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9O1xufTtcbiIsInZhciBtYXAgICAgPSByZXF1aXJlKCcuL2xpYi9tYXAnKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCcuL2xpYi9leHRlbmQnKTtcbnZhciByZXN1bHQgPSByZXF1aXJlKCcuL2xpYi9yZXN1bHQnKTtcblxuLyoqXG4gKiBTZXQgc29tZSBkZWZhdWx0IG9wdGlvbnMuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGV2ZW50T3B0aW9ucyA9IHtcbiAgVUlFdmVudDogZnVuY3Rpb24gKGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZpZXc6IGVsLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgICB9O1xuICB9LFxuICBGb2N1c0V2ZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGV2ZW50T3B0aW9ucy5VSUV2ZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIE1vdXNlRXZlbnQ6IGZ1bmN0aW9uIChlbCwgdHlwZSkge1xuICAgIHJldHVybiB7XG4gICAgICBidXR0b246ICAgICAgICAwLFxuICAgICAgY2FuY2VsYWJsZTogICAgKHR5cGUgIT09ICdtb3VzZW1vdmUnKSxcbiAgICAgIGN0cmxLZXk6ICAgICAgIGZhbHNlLFxuICAgICAgYWx0S2V5OiAgICAgICAgZmFsc2UsXG4gICAgICBzaGlmdEtleTogICAgICBmYWxzZSxcbiAgICAgIG1ldGFLZXk6ICAgICAgIGZhbHNlLFxuICAgICAgY2xpZW50WDogICAgICAgMSxcbiAgICAgIGNsaWVudFk6ICAgICAgIDEsXG4gICAgICBzY3JlZW5YOiAgICAgICAwLFxuICAgICAgc2NyZWVuWTogICAgICAgMCxcbiAgICAgIHZpZXc6ICAgICAgICAgIGVsLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcsXG4gICAgICByZWxhdGVkVGFyZ2V0OiBlbC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgIH07XG4gIH0sXG4gIEtleWJvYXJkRXZlbnQ6IGZ1bmN0aW9uIChlbCkge1xuICAgIHJldHVybiB7XG4gICAgICB2aWV3OiAgICAgZWwub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyxcbiAgICAgIGN0cmxLZXk6ICBmYWxzZSxcbiAgICAgIGFsdEtleTogICBmYWxzZSxcbiAgICAgIHNoaWZ0S2V5OiBmYWxzZSxcbiAgICAgIG1ldGFLZXk6ICBmYWxzZSxcbiAgICAgIGtleUNvZGU6ICAwXG4gICAgfTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgZXZlbnQgbmFtZXMgdG8gY29uc3RydWN0b3IgbmFtZXMuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGV2ZW50VHlwZXMgPSB7XG4gIGJlZm9yZXByaW50OiAgICAgICAgJ0V2ZW50JyxcbiAgYWZ0ZXJwcmludDogICAgICAgICAnRXZlbnQnLFxuICBiZWZvcmV1bmxvYWQ6ICAgICAgICdFdmVudCcsXG4gIGFib3J0OiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgZXJyb3I6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBjaGFuZ2U6ICAgICAgICAgICAgICdFdmVudCcsXG4gIHN1Ym1pdDogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcmVzZXQ6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBjYWNoZWQ6ICAgICAgICAgICAgICdFdmVudCcsXG4gIGNhbnBsYXk6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgY2FucGxheXRocm91Z2g6ICAgICAnRXZlbnQnLFxuICBjaGFyZ2luZ2NoYW5nZTogICAgICdFdmVudCcsXG4gIGNoYXJnaW5ndGltZWNoYW5nZTogJ0V2ZW50JyxcbiAgY2hlY2tpbmc6ICAgICAgICAgICAnRXZlbnQnLFxuICBjbG9zZTogICAgICAgICAgICAgICdFdmVudCcsXG4gIGRvd25sb2FkaW5nOiAgICAgICAgJ0V2ZW50JyxcbiAgZHVyYXRpb25jaGFuZ2U6ICAgICAnRXZlbnQnLFxuICBlbXB0aWVkOiAgICAgICAgICAgICdFdmVudCcsXG4gIGVuZGVkOiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgZnVsbHNjcmVlbmNoYW5nZTogICAnRXZlbnQnLFxuICBmdWxsc2NyZWVuZXJyb3I6ICAgICdFdmVudCcsXG4gIGlucHV0OiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgaW52YWxpZDogICAgICAgICAgICAnRXZlbnQnLFxuICBsZXZlbGNoYW5nZTogICAgICAgICdFdmVudCcsXG4gIGxvYWRlZGRhdGE6ICAgICAgICAgJ0V2ZW50JyxcbiAgbG9hZGVkbWV0YWRhdGE6ICAgICAnRXZlbnQnLFxuICBub3VwZGF0ZTogICAgICAgICAgICdFdmVudCcsXG4gIG9ic29sZXRlOiAgICAgICAgICAgJ0V2ZW50JyxcbiAgb2ZmbGluZTogICAgICAgICAgICAnRXZlbnQnLFxuICBvbmxpbmU6ICAgICAgICAgICAgICdFdmVudCcsXG4gIG9wZW46ICAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgb3JpZW50YXRpb25jaGFuZ2U6ICAnRXZlbnQnLFxuICBwYXVzZTogICAgICAgICAgICAgICdFdmVudCcsXG4gIHBvaW50ZXJsb2NrY2hhbmdlOiAgJ0V2ZW50JyxcbiAgcG9pbnRlcmxvY2tlcnJvcjogICAnRXZlbnQnLFxuICBjb3B5OiAgICAgICAgICAgICAgICdFdmVudCcsXG4gIGN1dDogICAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcGFzdGU6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBwbGF5OiAgICAgICAgICAgICAgICdFdmVudCcsXG4gIHBsYXlpbmc6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcmF0ZWNoYW5nZTogICAgICAgICAnRXZlbnQnLFxuICByZWFkeXN0YXRlY2hhbmdlOiAgICdFdmVudCcsXG4gIHNlZWtlZDogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgc2Vla2luZzogICAgICAgICAgICAnRXZlbnQnLFxuICBzdGFsbGVkOiAgICAgICAgICAgICdFdmVudCcsXG4gIHN1Y2Nlc3M6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgc3VzcGVuZDogICAgICAgICAgICAnRXZlbnQnLFxuICB0aW1ldXBkYXRlOiAgICAgICAgICdFdmVudCcsXG4gIHVwZGF0ZXJlYWR5OiAgICAgICAgJ0V2ZW50JyxcbiAgdmlzaWJpbGl0eWNoYW5nZTogICAnRXZlbnQnLFxuICB2b2x1bWVjaGFuZ2U6ICAgICAgICdFdmVudCcsXG4gIHdhaXRpbmc6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgbG9hZDogICAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIHVubG9hZDogICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICByZXNpemU6ICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgc2Nyb2xsOiAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIHNlbGVjdDogICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJhZ2VudGVyOiAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyYWdsZWF2ZTogICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnb3ZlcjogICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJhZ3N0YXJ0OiAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyb3A6ICAgICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaGNhbmNlbDogICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2hlbmQ6ICAgICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNoZW50ZXI6ICAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaGxlYXZlOiAgICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2htb3ZlOiAgICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNoc3RhcnQ6ICAgICAgICAgJ1VJRXZlbnQnLFxuICBibHVyOiAgICAgICAgICAgICAgICdGb2N1c0V2ZW50JyxcbiAgZm9jdXM6ICAgICAgICAgICAgICAnRm9jdXNFdmVudCcsXG4gIGZvY3VzaW46ICAgICAgICAgICAgJ0ZvY3VzRXZlbnQnLFxuICBmb2N1c291dDogICAgICAgICAgICdGb2N1c0V2ZW50JyxcbiAgc2hvdzogICAgICAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIGNsaWNrOiAgICAgICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBkYmxjbGljazogICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2VlbnRlcjogICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlbGVhdmU6ICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZWRvd246ICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2V1cDogICAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlb3ZlcjogICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZW1vdmU6ICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2VvdXQ6ICAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIGNvbnRleHRtZW51OiAgICAgICAgJ01vdXNlRXZlbnQnLFxuICB3aGVlbDogICAgICAgICAgICAgICdXaGVlbEV2ZW50JyxcbiAgbWVzc2FnZTogICAgICAgICAgICAnTWVzc2FnZUV2ZW50JyxcbiAgc3RvcmFnZTogICAgICAgICAgICAnU3RvcmFnZUV2ZW50JyxcbiAgdGltZW91dDogICAgICAgICAgICAnU3RvcmFnZUV2ZW50JyxcbiAga2V5ZG93bjogICAgICAgICAgICAnS2V5Ym9hcmRFdmVudCcsXG4gIGtleXByZXNzOiAgICAgICAgICAgJ0tleWJvYXJkRXZlbnQnLFxuICBrZXl1cDogICAgICAgICAgICAgICdLZXlib2FyZEV2ZW50JyxcbiAgcHJvZ3Jlc3M6ICAgICAgICAgICAnUHJvZ3Jlc3NFdmVudCcsXG4gIGxvYWRlbmQ6ICAgICAgICAgICAgJ1Byb2dyZXNzRXZlbnQnLFxuICBsb2Fkc3RhcnQ6ICAgICAgICAgICdQcm9ncmVzc0V2ZW50JyxcbiAgcG9wc3RhdGU6ICAgICAgICAgICAnUG9wU3RhdGVFdmVudCcsXG4gIGhhc2hjaGFuZ2U6ICAgICAgICAgJ0hhc2hDaGFuZ2VFdmVudCcsXG4gIHRyYW5zaXRpb25lbmQ6ICAgICAgJ1RyYW5zaXRpb25FdmVudCcsXG4gIGNvbXBvc2l0aW9uZW5kOiAgICAgJ0NvbXBvc2l0aW9uRXZlbnQnLFxuICBjb21wb3NpdGlvbnN0YXJ0OiAgICdDb21wb3NpdGlvbkV2ZW50JyxcbiAgY29tcG9zaXRpb251cGRhdGU6ICAnQ29tcG9zaXRpb25FdmVudCcsXG4gIHBhZ2VoaWRlOiAgICAgICAgICAgJ1BhZ2VUcmFuc2l0aW9uRXZlbnQnLFxuICBwYWdlc2hvdzogICAgICAgICAgICdQYWdlVHJhbnNpdGlvbkV2ZW50J1xufTtcblxuLyoqXG4gKiBNYXAgdGhlIGV2ZW50IHR5cGUgY29uc3RydWN0b3IgdG8gdGhlIGluaXRpYWxpemF0aW9uIG1ldGhvZC5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRJbml0ID0ge1xuICBFdmVudDogICAgICAgICAgICAgICAgICAnaXRpdEV2ZW50JyxcbiAgVUlFdmVudDogICAgICAgICAgICAgICAgJ2luaXRVSUV2ZW50JyxcbiAgRm9jdXNFdmVudDogICAgICAgICAgICAgJ2luaXRVSUV2ZW50JyxcbiAgTW91c2VFdmVudDogICAgICAgICAgICAgJ2luaXRNb3VzZUV2ZW50JyxcbiAgV2hlZWxFdmVudDogICAgICAgICAgICAgJ2luaXRNb3VzZUV2ZW50JyxcbiAgTWVzc2FnZUV2ZW50OiAgICAgICAgICAgJ2luaXRNZXNzYWdlRXZlbnQnLFxuICBTdG9yYWdlRXZlbnQ6ICAgICAgICAgICAnaW5pdFN0b3JhZ2VFdmVudCcsXG4gIEtleWJvYXJkRXZlbnQ6ICAgICAgICAgICdpbml0S2V5Ym9hcmRFdmVudCcsXG4gIFByb2dyZXNzRXZlbnQ6ICAgICAgICAgICdpbml0RXZlbnQnLFxuICBQb3BTdGF0ZUV2ZW50OiAgICAgICAgICAnaW5pdEV2ZW50JyxcbiAgVHJhbnNpdGlvbkV2ZW50OiAgICAgICAgJ2luaXRFdmVudCcsXG4gIEhhc2hDaGFuZ2VFdmVudDogICAgICAgICdpbml0SGFzaENoYW5nZUV2ZW50JyxcbiAgQ29tcG9zaXRpb25FdmVudDogICAgICAgJ2luaXRDb21wb3NpdGlvbkV2ZW50JyxcbiAgRGV2aWNlTW90aW9uRXZlbnQ6ICAgICAgJ2luaXREZXZpY2VNb3Rpb25FdmVudCcsXG4gIFBhZ2VUcmFuc2l0aW9uRXZlbnQ6ICAgICdpbml0RXZlbnQnLFxuICBEZXZpY2VPcmllbnRhdGlvbkV2ZW50OiAnaW5pdERldmljZU9yaWVudGF0aW9uRXZlbnQnXG59O1xuXG4vKipcbiAqIE1hcCB0aGUgb3B0aW9ucyBvYmplY3QgdG8gaW5pdGlhbGl6YXRpb24gcGFyYW1ldGVycy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRQYXJhbWV0ZXJzID0ge1xuICBpdGl0RXZlbnQ6IFtdLFxuICBpbml0VUlFdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnZGV0YWlsJ1xuICBdLFxuICBpbml0S2V5Ym9hcmRFdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnY2hhcicsXG4gICAgJ2tleScsXG4gICAgJ2xvY2F0aW9uJyxcbiAgICAnbW9kaWZpZXJzTGlzdCcsXG4gICAgJ3JlcGVhdCcsXG4gICAgJ2xvY2FsZSdcbiAgXSxcbiAgaW5pdE1vdXNlRXZlbnQ6IFtcbiAgICAndmlldycsXG4gICAgJ2RldGFpbCcsXG4gICAgJ3NjcmVlblgnLFxuICAgICdzY3JlZW5ZJyxcbiAgICAnY2xpZW50WCcsXG4gICAgJ2NsaWVudFknLFxuICAgICdjdHJsS2V5JyxcbiAgICAnYWx0S2V5JyxcbiAgICAnc2hpZnRLZXknLFxuICAgICdtZXRhS2V5JyxcbiAgICAnYnV0dG9uJyxcbiAgICAncmVsYXRlZFRhcmdldCdcbiAgXSxcbiAgaW5pdEhhc2hDaGFuZ2VFdmVudDogW1xuICAgICdvbGRVUkwnLFxuICAgICduZXdVUkwnXG4gIF0sXG4gIGluaXRDb21wb3NpdGlvbkV2ZW50OiBbXG4gICAgJ3ZpZXcnLFxuICAgICdkYXRhJyxcbiAgICAnbG9jYWxlJ1xuICBdLFxuICBpbml0RGV2aWNlTW90aW9uRXZlbnQ6IFtcbiAgICAnYWNjZWxlcmF0aW9uJyxcbiAgICAnYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eScsXG4gICAgJ3JvdGF0aW9uUmF0ZScsXG4gICAgJ2ludGVydmFsJ1xuICBdLFxuICBpbml0RGV2aWNlT3JpZW50YXRpb25FdmVudDogW1xuICAgICdhbHBoYScsXG4gICAgJ2JldGEnLFxuICAgICdnYW1tYScsXG4gICAgJ2Fic29sdXRlJ1xuICBdLFxuICBpbml0TWVzc2FnZUV2ZW50OiBbXG4gICAgJ2RhdGEnLFxuICAgICdvcmlnaW4nLFxuICAgICdsYXN0RXZlbnRJZCcsXG4gICAgJ3NvdXJjZSdcbiAgXSxcbiAgaW5pdFN0b3JhZ2VFdmVudDogW1xuICAgICdrZXknLFxuICAgICdvbGRWYWx1ZScsXG4gICAgJ25ld1ZhbHVlJyxcbiAgICAndXJsJyxcbiAgICAnc3RvcmFnZUFyZWEnXG4gIF1cbn07XG5cbi8qKlxuICogRXhwb3J0cyB0aGUgc2ltaWxhdGUgZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0gIHtTdHJpbmd9ICB0eXBlXG4gKiBAcGFyYW0gIHtPYmplY3R9ICBvcHRpb25zXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50LCB0eXBlLCBvcHRpb25zKSB7XG4gIC8vIEltbWVkaWF0ZWx5IHRocm93IGFuIGVycm9yIHdoZW4gdGhlIGV2ZW50IG5hbWUgZG9lcyBub3QgdHJhbnNsYXRlLlxuICBpZiAoIWV2ZW50VHlwZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1Vuc3VwcG9ydGVkIGV2ZW50IHR5cGUnKTtcbiAgfVxuXG4gIHZhciBldmVudFR5cGUgPSBldmVudFR5cGVzW3R5cGVdO1xuICB2YXIgaW5pdEV2ZW50ID0gZXZlbnRJbml0W2V2ZW50VHlwZV07XG4gIHZhciBldmVudDtcblxuICAvLyBFeHRlbmQgYSBuZXcgb2JqZWN0IHdpdGggdGhlIGRlZmF1bHQgYW5kIHBhc3NlZCBpbiBvcHRpb25zLlxuICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICBidWJibGVzOiAgICB0cnVlLFxuICAgIGNhbmNlbGFibGU6IHRydWVcbiAgfSwgcmVzdWx0KGV2ZW50T3B0aW9ucywgZXZlbnRUeXBlLCBlbGVtZW50LCB0eXBlLCBvcHRpb25zKSwgb3B0aW9ucyk7XG5cbiAgLy8gSW4gPCBJRTksIHRoZSBgY3JlYXRlRXZlbnRgIGZ1bmN0aW9uIGlzIG5vdCBhdmFpbGFibGUgYW5kIHdlIGhhdmUgdG9cbiAgLy8gcmVzb3J0IHRvIHVzaW5nIGBmaXJlRXZlbnRgLlxuICBpZiAoIWRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgZXZlbnQgPSBleHRlbmQoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGVsZW1lbnQuZmlyZUV2ZW50KCdvbicgKyB0eXBlLCBldmVudCk7XG4gIH1cblxuICBldmVudCA9IGV4dGVuZChkb2N1bWVudC5jcmVhdGVFdmVudChldmVudFR5cGUpLCBvcHRpb25zKTtcblxuICAvLyBNYXAgYXJndW1lbnQgbmFtZXMgdG8gdGhlIG9wdGlvbiB2YWx1ZXMuXG4gIHZhciBhcmdzID0gbWFwKGV2ZW50UGFyYW1ldGVyc1tpbml0RXZlbnRdLCBmdW5jdGlvbiAocGFyYW1ldGVyKSB7XG4gICAgcmV0dXJuIG9wdGlvbnNbcGFyYW1ldGVyXTtcbiAgfSk7XG5cbiAgLy8gSW5pdGlhbGl6ZSB0aGUgZXZlbnQgdXNpbmcgdGhlIGJ1aWx0LWluIG1ldGhvZC5cbiAgZXZlbnRbaW5pdEV2ZW50XS5hcHBseShcbiAgICBldmVudCwgW3R5cGUsIGV2ZW50LmJ1YmJsZXMsIGV2ZW50LmNhbmNlbGFibGVdLmNvbmNhdChhcmdzKVxuICApO1xuXG4gIHJldHVybiBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcbiJdfQ==
(5)
});
