!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.simulateEvent=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var variadic = _dereq_('variadic');

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

},{"variadic":3}],2:[function(_dereq_,module,exports){
var variadic = _dereq_('variadic');

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

},{"variadic":3}],3:[function(_dereq_,module,exports){
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

},{}],4:[function(_dereq_,module,exports){
var extend = _dereq_('./lib/extend');
var result = _dereq_('./lib/result');

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
  dragend:            'UIEvent',
  drop:               'UIEvent',
  touchcancel:        'UIEvent',
  touchend:           'UIEvent',
  touchenter:         'UIEvent',
  touchleave:         'UIEvent',
  touchmove:          'UIEvent',
  touchstart:         'UIEvent',
  blur:               'UIEvent',
  focus:              'UIEvent',
  focusin:            'UIEvent',
  focusout:           'UIEvent',
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
  Event:                  'initEvent',
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
  initEvent: [],
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
  initKeyEvent: [
    'view',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'keyCode',
    'charCode'
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

  var original = options;
  var eventType = eventTypes[type];

  // In IE11, the Keyboard event does not allow setting the
  // keyCode property, even with Object.defineProperty,
  // so we have to use a UIEvent.
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0 && eventType === 'KeyboardEvent') {
    eventType = 'UIEvent';
  }

  var initEvent = eventInit[eventType];
  var event;

  // Extend a new object with the default and passed in options.
  options = extend({
    bubbles:    true,
    cancelable: true
  }, result(eventOptions, eventType, element, type, options), options);

  // Preserve the original or use the new options if none were given.
  if (!original) original = options;

  // In < IE9, the `createEvent` function is not available and we have to
  // resort to using `fireEvent`.
  if (!document.createEvent) {
    event = extend(document.createEventObject(), options);
    return element.fireEvent('on' + type, event);
  }

  event = extend(document.createEvent(eventType), options);

  // Handle differences between `initKeyboardEvent` and `initKeyEvent`.
  if (initEvent === 'initKeyboardEvent') {
    if (event[initEvent] === void 0) {
      initEvent = 'initKeyEvent';
    } else if (!('modifiersList' in options)) {
      var mods = []
      if (options.metaKey) mods.push('Meta');
      if (options.altKey) mods.push('Alt');
      if (options.shiftKey) mods.push('Shift');
      if (options.ctrlKey) mods.push('Control');
      options['modifiersList'] = mods.join(' ');
    }
  }

  // Map argument names to the option values.
  var args = eventParameters[initEvent].map(function (parameter) {
    return options[parameter];
  });

  // Initialize the event using the built-in method.
  event[initEvent].apply(
    event, [type, event.bubbles, event.cancelable].concat(args)
  );

  // Work around limitations in the keyboard initialization.
  if (eventType === 'KeyboardEvent') {
    Object.defineProperty(event, 'keyCode',
      { value: original['keyCode'] || 0 });
    Object.defineProperty(event, 'key',
      { value: original['key'] || '' });
    Object.defineProperty(event, 'which',
      { value: original['which'] || options['keyCode'] || 0 });
  }

  return element.dispatchEvent(event);
};

},{"./lib/extend":1,"./lib/result":2}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zc2lsdmVzdGVyL3dvcmtzcGFjZS9qdXB5dGVyL3NpbXVsYXRlLWV2ZW50L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc3NpbHZlc3Rlci93b3Jrc3BhY2UvanVweXRlci9zaW11bGF0ZS1ldmVudC9saWIvZXh0ZW5kLmpzIiwiL1VzZXJzL3NzaWx2ZXN0ZXIvd29ya3NwYWNlL2p1cHl0ZXIvc2ltdWxhdGUtZXZlbnQvbGliL3Jlc3VsdC5qcyIsIi9Vc2Vycy9zc2lsdmVzdGVyL3dvcmtzcGFjZS9qdXB5dGVyL3NpbXVsYXRlLWV2ZW50L25vZGVfbW9kdWxlcy92YXJpYWRpYy92YXJpYWRpYy5qcyIsIi9Vc2Vycy9zc2lsdmVzdGVyL3dvcmtzcGFjZS9qdXB5dGVyL3NpbXVsYXRlLWV2ZW50L3NpbXVsYXRlLWV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdmFyaWFkaWMgPSByZXF1aXJlKCd2YXJpYWRpYycpO1xuXG4vKipcbiAqIEV4dGVuZCBhbiBzaW5nbGUgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKS4gRWFjaFxuICogcHJvcGVydHkgYWRkZWQgd2lsbCBvdmVycmlkZSBhbnkgZXhpc3RpbmcgcHJvcGVydHkgdGhhdCBtYXRjaGVzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gIHtPYmplY3R9IC4uLlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHZhcmlhZGljKGZ1bmN0aW9uIChvYmosIHNvdXJjZXMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZXNbaV0pIHtcbiAgICAgIG9ialtrZXldID0gc291cmNlc1tpXVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59KTtcbiIsInZhciB2YXJpYWRpYyA9IHJlcXVpcmUoJ3ZhcmlhZGljJyk7XG5cbi8qKlxuICogR2V0IHRoZSBwcm9wZXJ0eSBmcm9tIGFuIG9iamVjdC4gSWYgdGhlIHByb3BlcnR5IGlzIGEgZnVuY3Rpb24sIGltbWVkaWF0ZWx5XG4gKiBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIG9wdGlvbmFsIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9ialxuICogQHBhcmFtICB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHBhcmFtICB7Kn0gICAgICAuLi5cbiAqIEByZXR1cm4geyp9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gdmFyaWFkaWMoZnVuY3Rpb24gKG9iaiwgcHJvcGVydHksIGFyZ3MpIHtcbiAgdmFyIHJlc3VsdCA9IG9ialtwcm9wZXJ0eV07XG5cbiAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXN1bHQgPSByZXN1bHQuYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufSk7XG4iLCJ2YXIgX19zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhIHZhcmlhYmxlIG51bWJlciBvZiBhcmd1bWVudHMgYXMgdGhlIGxhc3RcbiAqIGZ1bmN0aW9uIGFyZ3VtZW50LlxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBjb3VudCA9IE1hdGgubWF4KGZuLmxlbmd0aCAtIDEsIDApO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBjb3VudCk7XG5cbiAgICAvLyBFbmZvcmNlIHRoZSBhcnJheSBsZW5ndGgsIGluIGNhc2Ugd2UgZG9uJ3QgaGF2ZSBlbm91Z2ggYXJyYXkgcGFkZGluZy5cbiAgICBhcmdzLmxlbmd0aCA9IGNvdW50O1xuICAgIGFyZ3MucHVzaChfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCBjb3VudCkpO1xuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9O1xufTtcbiIsInZhciBleHRlbmQgPSByZXF1aXJlKCcuL2xpYi9leHRlbmQnKTtcbnZhciByZXN1bHQgPSByZXF1aXJlKCcuL2xpYi9yZXN1bHQnKTtcblxuLyoqXG4gKiBTZXQgc29tZSBkZWZhdWx0IG9wdGlvbnMuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGV2ZW50T3B0aW9ucyA9IHtcbiAgVUlFdmVudDogZnVuY3Rpb24gKGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZpZXc6IGVsLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgICB9O1xuICB9LFxuICBGb2N1c0V2ZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGV2ZW50T3B0aW9ucy5VSUV2ZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIE1vdXNlRXZlbnQ6IGZ1bmN0aW9uIChlbCwgdHlwZSkge1xuICAgIHJldHVybiB7XG4gICAgICBidXR0b246ICAgICAgICAwLFxuICAgICAgY2FuY2VsYWJsZTogICAgKHR5cGUgIT09ICdtb3VzZW1vdmUnKSxcbiAgICAgIGN0cmxLZXk6ICAgICAgIGZhbHNlLFxuICAgICAgYWx0S2V5OiAgICAgICAgZmFsc2UsXG4gICAgICBzaGlmdEtleTogICAgICBmYWxzZSxcbiAgICAgIG1ldGFLZXk6ICAgICAgIGZhbHNlLFxuICAgICAgY2xpZW50WDogICAgICAgMSxcbiAgICAgIGNsaWVudFk6ICAgICAgIDEsXG4gICAgICBzY3JlZW5YOiAgICAgICAwLFxuICAgICAgc2NyZWVuWTogICAgICAgMCxcbiAgICAgIHZpZXc6ICAgICAgICAgIGVsLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcsXG4gICAgICByZWxhdGVkVGFyZ2V0OiBlbC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgIH07XG4gIH0sXG4gIEtleWJvYXJkRXZlbnQ6IGZ1bmN0aW9uIChlbCkge1xuICAgIHJldHVybiB7XG4gICAgICB2aWV3OiAgICAgZWwub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyxcbiAgICAgIGN0cmxLZXk6ICBmYWxzZSxcbiAgICAgIGFsdEtleTogICBmYWxzZSxcbiAgICAgIHNoaWZ0S2V5OiBmYWxzZSxcbiAgICAgIG1ldGFLZXk6ICBmYWxzZSxcbiAgICAgIGtleUNvZGU6ICAwXG4gICAgfTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgZXZlbnQgbmFtZXMgdG8gY29uc3RydWN0b3IgbmFtZXMuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGV2ZW50VHlwZXMgPSB7XG4gIGJlZm9yZXByaW50OiAgICAgICAgJ0V2ZW50JyxcbiAgYWZ0ZXJwcmludDogICAgICAgICAnRXZlbnQnLFxuICBiZWZvcmV1bmxvYWQ6ICAgICAgICdFdmVudCcsXG4gIGFib3J0OiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgZXJyb3I6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBjaGFuZ2U6ICAgICAgICAgICAgICdFdmVudCcsXG4gIHN1Ym1pdDogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcmVzZXQ6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBjYWNoZWQ6ICAgICAgICAgICAgICdFdmVudCcsXG4gIGNhbnBsYXk6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgY2FucGxheXRocm91Z2g6ICAgICAnRXZlbnQnLFxuICBjaGFyZ2luZ2NoYW5nZTogICAgICdFdmVudCcsXG4gIGNoYXJnaW5ndGltZWNoYW5nZTogJ0V2ZW50JyxcbiAgY2hlY2tpbmc6ICAgICAgICAgICAnRXZlbnQnLFxuICBjbG9zZTogICAgICAgICAgICAgICdFdmVudCcsXG4gIGRvd25sb2FkaW5nOiAgICAgICAgJ0V2ZW50JyxcbiAgZHVyYXRpb25jaGFuZ2U6ICAgICAnRXZlbnQnLFxuICBlbXB0aWVkOiAgICAgICAgICAgICdFdmVudCcsXG4gIGVuZGVkOiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgZnVsbHNjcmVlbmNoYW5nZTogICAnRXZlbnQnLFxuICBmdWxsc2NyZWVuZXJyb3I6ICAgICdFdmVudCcsXG4gIGlucHV0OiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgaW52YWxpZDogICAgICAgICAgICAnRXZlbnQnLFxuICBsZXZlbGNoYW5nZTogICAgICAgICdFdmVudCcsXG4gIGxvYWRlZGRhdGE6ICAgICAgICAgJ0V2ZW50JyxcbiAgbG9hZGVkbWV0YWRhdGE6ICAgICAnRXZlbnQnLFxuICBub3VwZGF0ZTogICAgICAgICAgICdFdmVudCcsXG4gIG9ic29sZXRlOiAgICAgICAgICAgJ0V2ZW50JyxcbiAgb2ZmbGluZTogICAgICAgICAgICAnRXZlbnQnLFxuICBvbmxpbmU6ICAgICAgICAgICAgICdFdmVudCcsXG4gIG9wZW46ICAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgb3JpZW50YXRpb25jaGFuZ2U6ICAnRXZlbnQnLFxuICBwYXVzZTogICAgICAgICAgICAgICdFdmVudCcsXG4gIHBvaW50ZXJsb2NrY2hhbmdlOiAgJ0V2ZW50JyxcbiAgcG9pbnRlcmxvY2tlcnJvcjogICAnRXZlbnQnLFxuICBjb3B5OiAgICAgICAgICAgICAgICdFdmVudCcsXG4gIGN1dDogICAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcGFzdGU6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBwbGF5OiAgICAgICAgICAgICAgICdFdmVudCcsXG4gIHBsYXlpbmc6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcmF0ZWNoYW5nZTogICAgICAgICAnRXZlbnQnLFxuICByZWFkeXN0YXRlY2hhbmdlOiAgICdFdmVudCcsXG4gIHNlZWtlZDogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgc2Vla2luZzogICAgICAgICAgICAnRXZlbnQnLFxuICBzdGFsbGVkOiAgICAgICAgICAgICdFdmVudCcsXG4gIHN1Y2Nlc3M6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgc3VzcGVuZDogICAgICAgICAgICAnRXZlbnQnLFxuICB0aW1ldXBkYXRlOiAgICAgICAgICdFdmVudCcsXG4gIHVwZGF0ZXJlYWR5OiAgICAgICAgJ0V2ZW50JyxcbiAgdmlzaWJpbGl0eWNoYW5nZTogICAnRXZlbnQnLFxuICB2b2x1bWVjaGFuZ2U6ICAgICAgICdFdmVudCcsXG4gIHdhaXRpbmc6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgbG9hZDogICAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIHVubG9hZDogICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICByZXNpemU6ICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgc2Nyb2xsOiAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIHNlbGVjdDogICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJhZ2VudGVyOiAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyYWdsZWF2ZTogICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnb3ZlcjogICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJhZ3N0YXJ0OiAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyYWdlbmQ6ICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcm9wOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2hjYW5jZWw6ICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNoZW5kOiAgICAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaGVudGVyOiAgICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2hsZWF2ZTogICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNobW92ZTogICAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaHN0YXJ0OiAgICAgICAgICdVSUV2ZW50JyxcbiAgYmx1cjogICAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIGZvY3VzOiAgICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBmb2N1c2luOiAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgZm9jdXNvdXQ6ICAgICAgICAgICAnVUlFdmVudCcsXG4gIHNob3c6ICAgICAgICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBjbGljazogICAgICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgZGJsY2xpY2s6ICAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlZW50ZXI6ICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZWxlYXZlOiAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2Vkb3duOiAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNldXA6ICAgICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZW92ZXI6ICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2Vtb3ZlOiAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlb3V0OiAgICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBjb250ZXh0bWVudTogICAgICAgICdNb3VzZUV2ZW50JyxcbiAgd2hlZWw6ICAgICAgICAgICAgICAnV2hlZWxFdmVudCcsXG4gIG1lc3NhZ2U6ICAgICAgICAgICAgJ01lc3NhZ2VFdmVudCcsXG4gIHN0b3JhZ2U6ICAgICAgICAgICAgJ1N0b3JhZ2VFdmVudCcsXG4gIHRpbWVvdXQ6ICAgICAgICAgICAgJ1N0b3JhZ2VFdmVudCcsXG4gIGtleWRvd246ICAgICAgICAgICAgJ0tleWJvYXJkRXZlbnQnLFxuICBrZXlwcmVzczogICAgICAgICAgICdLZXlib2FyZEV2ZW50JyxcbiAga2V5dXA6ICAgICAgICAgICAgICAnS2V5Ym9hcmRFdmVudCcsXG4gIHByb2dyZXNzOiAgICAgICAgICAgJ1Byb2dyZXNzRXZlbnQnLFxuICBsb2FkZW5kOiAgICAgICAgICAgICdQcm9ncmVzc0V2ZW50JyxcbiAgbG9hZHN0YXJ0OiAgICAgICAgICAnUHJvZ3Jlc3NFdmVudCcsXG4gIHBvcHN0YXRlOiAgICAgICAgICAgJ1BvcFN0YXRlRXZlbnQnLFxuICBoYXNoY2hhbmdlOiAgICAgICAgICdIYXNoQ2hhbmdlRXZlbnQnLFxuICB0cmFuc2l0aW9uZW5kOiAgICAgICdUcmFuc2l0aW9uRXZlbnQnLFxuICBjb21wb3NpdGlvbmVuZDogICAgICdDb21wb3NpdGlvbkV2ZW50JyxcbiAgY29tcG9zaXRpb25zdGFydDogICAnQ29tcG9zaXRpb25FdmVudCcsXG4gIGNvbXBvc2l0aW9udXBkYXRlOiAgJ0NvbXBvc2l0aW9uRXZlbnQnLFxuICBwYWdlaGlkZTogICAgICAgICAgICdQYWdlVHJhbnNpdGlvbkV2ZW50JyxcbiAgcGFnZXNob3c6ICAgICAgICAgICAnUGFnZVRyYW5zaXRpb25FdmVudCdcbn07XG5cbi8qKlxuICogTWFwIHRoZSBldmVudCB0eXBlIGNvbnN0cnVjdG9yIHRvIHRoZSBpbml0aWFsaXphdGlvbiBtZXRob2QuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGV2ZW50SW5pdCA9IHtcbiAgRXZlbnQ6ICAgICAgICAgICAgICAgICAgJ2luaXRFdmVudCcsXG4gIFVJRXZlbnQ6ICAgICAgICAgICAgICAgICdpbml0VUlFdmVudCcsXG4gIEZvY3VzRXZlbnQ6ICAgICAgICAgICAgICdpbml0VUlFdmVudCcsXG4gIE1vdXNlRXZlbnQ6ICAgICAgICAgICAgICdpbml0TW91c2VFdmVudCcsXG4gIFdoZWVsRXZlbnQ6ICAgICAgICAgICAgICdpbml0TW91c2VFdmVudCcsXG4gIE1lc3NhZ2VFdmVudDogICAgICAgICAgICdpbml0TWVzc2FnZUV2ZW50JyxcbiAgU3RvcmFnZUV2ZW50OiAgICAgICAgICAgJ2luaXRTdG9yYWdlRXZlbnQnLFxuICBLZXlib2FyZEV2ZW50OiAgICAgICAgICAnaW5pdEtleWJvYXJkRXZlbnQnLFxuICBQcm9ncmVzc0V2ZW50OiAgICAgICAgICAnaW5pdEV2ZW50JyxcbiAgUG9wU3RhdGVFdmVudDogICAgICAgICAgJ2luaXRFdmVudCcsXG4gIFRyYW5zaXRpb25FdmVudDogICAgICAgICdpbml0RXZlbnQnLFxuICBIYXNoQ2hhbmdlRXZlbnQ6ICAgICAgICAnaW5pdEhhc2hDaGFuZ2VFdmVudCcsXG4gIENvbXBvc2l0aW9uRXZlbnQ6ICAgICAgICdpbml0Q29tcG9zaXRpb25FdmVudCcsXG4gIERldmljZU1vdGlvbkV2ZW50OiAgICAgICdpbml0RGV2aWNlTW90aW9uRXZlbnQnLFxuICBQYWdlVHJhbnNpdGlvbkV2ZW50OiAgICAnaW5pdEV2ZW50JyxcbiAgRGV2aWNlT3JpZW50YXRpb25FdmVudDogJ2luaXREZXZpY2VPcmllbnRhdGlvbkV2ZW50J1xufTtcblxuLyoqXG4gKiBNYXAgdGhlIG9wdGlvbnMgb2JqZWN0IHRvIGluaXRpYWxpemF0aW9uIHBhcmFtZXRlcnMuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGV2ZW50UGFyYW1ldGVycyA9IHtcbiAgaW5pdEV2ZW50OiBbXSxcbiAgaW5pdFVJRXZlbnQ6IFtcbiAgICAndmlldycsXG4gICAgJ2RldGFpbCdcbiAgXSxcbiAgaW5pdEtleWJvYXJkRXZlbnQ6IFtcbiAgICAndmlldycsXG4gICAgJ2NoYXInLFxuICAgICdrZXknLFxuICAgICdsb2NhdGlvbicsXG4gICAgJ21vZGlmaWVyc0xpc3QnLFxuICAgICdyZXBlYXQnLFxuICAgICdsb2NhbGUnXG4gIF0sXG4gIGluaXRLZXlFdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnY3RybEtleScsXG4gICAgJ2FsdEtleScsXG4gICAgJ3NoaWZ0S2V5JyxcbiAgICAnbWV0YUtleScsXG4gICAgJ2tleUNvZGUnLFxuICAgICdjaGFyQ29kZSdcbiAgXSxcbiAgaW5pdE1vdXNlRXZlbnQ6IFtcbiAgICAndmlldycsXG4gICAgJ2RldGFpbCcsXG4gICAgJ3NjcmVlblgnLFxuICAgICdzY3JlZW5ZJyxcbiAgICAnY2xpZW50WCcsXG4gICAgJ2NsaWVudFknLFxuICAgICdjdHJsS2V5JyxcbiAgICAnYWx0S2V5JyxcbiAgICAnc2hpZnRLZXknLFxuICAgICdtZXRhS2V5JyxcbiAgICAnYnV0dG9uJyxcbiAgICAncmVsYXRlZFRhcmdldCdcbiAgXSxcbiAgaW5pdEhhc2hDaGFuZ2VFdmVudDogW1xuICAgICdvbGRVUkwnLFxuICAgICduZXdVUkwnXG4gIF0sXG4gIGluaXRDb21wb3NpdGlvbkV2ZW50OiBbXG4gICAgJ3ZpZXcnLFxuICAgICdkYXRhJyxcbiAgICAnbG9jYWxlJ1xuICBdLFxuICBpbml0RGV2aWNlTW90aW9uRXZlbnQ6IFtcbiAgICAnYWNjZWxlcmF0aW9uJyxcbiAgICAnYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eScsXG4gICAgJ3JvdGF0aW9uUmF0ZScsXG4gICAgJ2ludGVydmFsJ1xuICBdLFxuICBpbml0RGV2aWNlT3JpZW50YXRpb25FdmVudDogW1xuICAgICdhbHBoYScsXG4gICAgJ2JldGEnLFxuICAgICdnYW1tYScsXG4gICAgJ2Fic29sdXRlJ1xuICBdLFxuICBpbml0TWVzc2FnZUV2ZW50OiBbXG4gICAgJ2RhdGEnLFxuICAgICdvcmlnaW4nLFxuICAgICdsYXN0RXZlbnRJZCcsXG4gICAgJ3NvdXJjZSdcbiAgXSxcbiAgaW5pdFN0b3JhZ2VFdmVudDogW1xuICAgICdrZXknLFxuICAgICdvbGRWYWx1ZScsXG4gICAgJ25ld1ZhbHVlJyxcbiAgICAndXJsJyxcbiAgICAnc3RvcmFnZUFyZWEnXG4gIF1cbn07XG5cbi8qKlxuICogRXhwb3J0cyB0aGUgc2ltaWxhdGUgZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0gIHtTdHJpbmd9ICB0eXBlXG4gKiBAcGFyYW0gIHtPYmplY3R9ICBvcHRpb25zXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50LCB0eXBlLCBvcHRpb25zKSB7XG4gIC8vIEltbWVkaWF0ZWx5IHRocm93IGFuIGVycm9yIHdoZW4gdGhlIGV2ZW50IG5hbWUgZG9lcyBub3QgdHJhbnNsYXRlLlxuICBpZiAoIWV2ZW50VHlwZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1Vuc3VwcG9ydGVkIGV2ZW50IHR5cGUnKTtcbiAgfVxuXG4gIHZhciBvcmlnaW5hbCA9IG9wdGlvbnM7XG4gIHZhciBldmVudFR5cGUgPSBldmVudFR5cGVzW3R5cGVdO1xuXG4gIC8vIEluIElFMTEsIHRoZSBLZXlib2FyZCBldmVudCBkb2VzIG5vdCBhbGxvdyBzZXR0aW5nIHRoZVxuICAvLyBrZXlDb2RlIHByb3BlcnR5LCBldmVuIHdpdGggT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICAvLyBzbyB3ZSBoYXZlIHRvIHVzZSBhIFVJRXZlbnQuXG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICB2YXIgbXNpZSA9IHVhLmluZGV4T2YoJ01TSUUgJyk7XG4gIGlmIChtc2llID4gMCAmJiBldmVudFR5cGUgPT09ICdLZXlib2FyZEV2ZW50Jykge1xuICAgIGV2ZW50VHlwZSA9ICdVSUV2ZW50JztcbiAgfVxuXG4gIHZhciBpbml0RXZlbnQgPSBldmVudEluaXRbZXZlbnRUeXBlXTtcbiAgdmFyIGV2ZW50O1xuXG4gIC8vIEV4dGVuZCBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgZGVmYXVsdCBhbmQgcGFzc2VkIGluIG9wdGlvbnMuXG4gIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgIGJ1YmJsZXM6ICAgIHRydWUsXG4gICAgY2FuY2VsYWJsZTogdHJ1ZVxuICB9LCByZXN1bHQoZXZlbnRPcHRpb25zLCBldmVudFR5cGUsIGVsZW1lbnQsIHR5cGUsIG9wdGlvbnMpLCBvcHRpb25zKTtcblxuICAvLyBQcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgb3IgdXNlIHRoZSBuZXcgb3B0aW9ucyBpZiBub25lIHdlcmUgZ2l2ZW4uXG4gIGlmICghb3JpZ2luYWwpIG9yaWdpbmFsID0gb3B0aW9ucztcblxuICAvLyBJbiA8IElFOSwgdGhlIGBjcmVhdGVFdmVudGAgZnVuY3Rpb24gaXMgbm90IGF2YWlsYWJsZSBhbmQgd2UgaGF2ZSB0b1xuICAvLyByZXNvcnQgdG8gdXNpbmcgYGZpcmVFdmVudGAuXG4gIGlmICghZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICBldmVudCA9IGV4dGVuZChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpLCBvcHRpb25zKTtcbiAgICByZXR1cm4gZWxlbWVudC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGV2ZW50KTtcbiAgfVxuXG4gIGV2ZW50ID0gZXh0ZW5kKGRvY3VtZW50LmNyZWF0ZUV2ZW50KGV2ZW50VHlwZSksIG9wdGlvbnMpO1xuXG4gIC8vIEhhbmRsZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBpbml0S2V5Ym9hcmRFdmVudGAgYW5kIGBpbml0S2V5RXZlbnRgLlxuICBpZiAoaW5pdEV2ZW50ID09PSAnaW5pdEtleWJvYXJkRXZlbnQnKSB7XG4gICAgaWYgKGV2ZW50W2luaXRFdmVudF0gPT09IHZvaWQgMCkge1xuICAgICAgaW5pdEV2ZW50ID0gJ2luaXRLZXlFdmVudCc7XG4gICAgfSBlbHNlIGlmICghKCdtb2RpZmllcnNMaXN0JyBpbiBvcHRpb25zKSkge1xuICAgICAgdmFyIG1vZHMgPSBbXVxuICAgICAgaWYgKG9wdGlvbnMubWV0YUtleSkgbW9kcy5wdXNoKCdNZXRhJyk7XG4gICAgICBpZiAob3B0aW9ucy5hbHRLZXkpIG1vZHMucHVzaCgnQWx0Jyk7XG4gICAgICBpZiAob3B0aW9ucy5zaGlmdEtleSkgbW9kcy5wdXNoKCdTaGlmdCcpO1xuICAgICAgaWYgKG9wdGlvbnMuY3RybEtleSkgbW9kcy5wdXNoKCdDb250cm9sJyk7XG4gICAgICBvcHRpb25zWydtb2RpZmllcnNMaXN0J10gPSBtb2RzLmpvaW4oJyAnKTtcbiAgICB9XG4gIH1cblxuICAvLyBNYXAgYXJndW1lbnQgbmFtZXMgdG8gdGhlIG9wdGlvbiB2YWx1ZXMuXG4gIHZhciBhcmdzID0gZXZlbnRQYXJhbWV0ZXJzW2luaXRFdmVudF0ubWFwKGZ1bmN0aW9uIChwYXJhbWV0ZXIpIHtcbiAgICByZXR1cm4gb3B0aW9uc1twYXJhbWV0ZXJdO1xuICB9KTtcblxuICAvLyBJbml0aWFsaXplIHRoZSBldmVudCB1c2luZyB0aGUgYnVpbHQtaW4gbWV0aG9kLlxuICBldmVudFtpbml0RXZlbnRdLmFwcGx5KFxuICAgIGV2ZW50LCBbdHlwZSwgZXZlbnQuYnViYmxlcywgZXZlbnQuY2FuY2VsYWJsZV0uY29uY2F0KGFyZ3MpXG4gICk7XG5cbiAgLy8gV29yayBhcm91bmQgbGltaXRhdGlvbnMgaW4gdGhlIGtleWJvYXJkIGluaXRpYWxpemF0aW9uLlxuICBpZiAoZXZlbnRUeXBlID09PSAnS2V5Ym9hcmRFdmVudCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdrZXlDb2RlJyxcbiAgICAgIHsgdmFsdWU6IG9yaWdpbmFsWydrZXlDb2RlJ10gfHwgMCB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdrZXknLFxuICAgICAgeyB2YWx1ZTogb3JpZ2luYWxbJ2tleSddIHx8ICcnIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ3doaWNoJyxcbiAgICAgIHsgdmFsdWU6IG9yaWdpbmFsWyd3aGljaCddIHx8IG9wdGlvbnNbJ2tleUNvZGUnXSB8fCAwIH0pO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuIl19
(4)
});
