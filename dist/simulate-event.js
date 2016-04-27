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
  if (eventType === 'KeyboardEvent') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxVc2Vyc1xcYnVpbGRlclxcc2ltdWxhdGUtZXZlbnRcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYzovVXNlcnMvYnVpbGRlci9zaW11bGF0ZS1ldmVudC9saWIvZXh0ZW5kLmpzIiwiYzovVXNlcnMvYnVpbGRlci9zaW11bGF0ZS1ldmVudC9saWIvcmVzdWx0LmpzIiwiYzovVXNlcnMvYnVpbGRlci9zaW11bGF0ZS1ldmVudC9ub2RlX21vZHVsZXMvdmFyaWFkaWMvdmFyaWFkaWMuanMiLCJjOi9Vc2Vycy9idWlsZGVyL3NpbXVsYXRlLWV2ZW50L3NpbXVsYXRlLWV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdmFyaWFkaWMgPSByZXF1aXJlKCd2YXJpYWRpYycpO1xyXG5cclxuLyoqXHJcbiAqIEV4dGVuZCBhbiBzaW5nbGUgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKS4gRWFjaFxyXG4gKiBwcm9wZXJ0eSBhZGRlZCB3aWxsIG92ZXJyaWRlIGFueSBleGlzdGluZyBwcm9wZXJ0eSB0aGF0IG1hdGNoZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gLi4uXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gdmFyaWFkaWMoZnVuY3Rpb24gKG9iaiwgc291cmNlcykge1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZXNbaV0pIHtcclxuICAgICAgb2JqW2tleV0gPSBzb3VyY2VzW2ldW2tleV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2JqO1xyXG59KTtcclxuIiwidmFyIHZhcmlhZGljID0gcmVxdWlyZSgndmFyaWFkaWMnKTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHByb3BlcnR5IGZyb20gYW4gb2JqZWN0LiBJZiB0aGUgcHJvcGVydHkgaXMgYSBmdW5jdGlvbiwgaW1tZWRpYXRlbHlcclxuICogY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCBvcHRpb25hbCBhcmd1bWVudHMuXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gcHJvcGVydHlcclxuICogQHBhcmFtICB7Kn0gICAgICAuLi5cclxuICogQHJldHVybiB7Kn1cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gdmFyaWFkaWMoZnVuY3Rpb24gKG9iaiwgcHJvcGVydHksIGFyZ3MpIHtcclxuICB2YXIgcmVzdWx0ID0gb2JqW3Byb3BlcnR5XTtcclxuXHJcbiAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJlc3VsdCA9IHJlc3VsdC5hcHBseSh0aGlzLCBhcmdzKTtcclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn0pO1xyXG4iLCJ2YXIgX19zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhIHZhcmlhYmxlIG51bWJlciBvZiBhcmd1bWVudHMgYXMgdGhlIGxhc3RcbiAqIGZ1bmN0aW9uIGFyZ3VtZW50LlxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBjb3VudCA9IE1hdGgubWF4KGZuLmxlbmd0aCAtIDEsIDApO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBjb3VudCk7XG5cbiAgICAvLyBFbmZvcmNlIHRoZSBhcnJheSBsZW5ndGgsIGluIGNhc2Ugd2UgZG9uJ3QgaGF2ZSBlbm91Z2ggYXJyYXkgcGFkZGluZy5cbiAgICBhcmdzLmxlbmd0aCA9IGNvdW50O1xuICAgIGFyZ3MucHVzaChfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCBjb3VudCkpO1xuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9O1xufTtcbiIsInZhciBleHRlbmQgPSByZXF1aXJlKCcuL2xpYi9leHRlbmQnKTtcclxudmFyIHJlc3VsdCA9IHJlcXVpcmUoJy4vbGliL3Jlc3VsdCcpO1xyXG5cclxuLyoqXHJcbiAqIFNldCBzb21lIGRlZmF1bHQgb3B0aW9ucy5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciBldmVudE9wdGlvbnMgPSB7XHJcbiAgVUlFdmVudDogZnVuY3Rpb24gKGVsKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2aWV3OiBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgRm9jdXNFdmVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGV2ZW50T3B0aW9ucy5VSUV2ZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBNb3VzZUV2ZW50OiBmdW5jdGlvbiAoZWwsIHR5cGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJ1dHRvbjogICAgICAgIDAsXHJcbiAgICAgIGNhbmNlbGFibGU6ICAgICh0eXBlICE9PSAnbW91c2Vtb3ZlJyksXHJcbiAgICAgIGN0cmxLZXk6ICAgICAgIGZhbHNlLFxyXG4gICAgICBhbHRLZXk6ICAgICAgICBmYWxzZSxcclxuICAgICAgc2hpZnRLZXk6ICAgICAgZmFsc2UsXHJcbiAgICAgIG1ldGFLZXk6ICAgICAgIGZhbHNlLFxyXG4gICAgICBjbGllbnRYOiAgICAgICAxLFxyXG4gICAgICBjbGllbnRZOiAgICAgICAxLFxyXG4gICAgICBzY3JlZW5YOiAgICAgICAwLFxyXG4gICAgICBzY3JlZW5ZOiAgICAgICAwLFxyXG4gICAgICB2aWV3OiAgICAgICAgICBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LFxyXG4gICAgICByZWxhdGVkVGFyZ2V0OiBlbC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxyXG4gICAgfTtcclxuICB9LFxyXG4gIEtleWJvYXJkRXZlbnQ6IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmlldzogICAgIGVsLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcsXHJcbiAgICAgIGN0cmxLZXk6ICBmYWxzZSxcclxuICAgICAgYWx0S2V5OiAgIGZhbHNlLFxyXG4gICAgICBzaGlmdEtleTogZmFsc2UsXHJcbiAgICAgIG1ldGFLZXk6ICBmYWxzZSxcclxuICAgICAga2V5Q29kZTogIDBcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hcCBldmVudCBuYW1lcyB0byBjb25zdHJ1Y3RvciBuYW1lcy5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciBldmVudFR5cGVzID0ge1xyXG4gIGJlZm9yZXByaW50OiAgICAgICAgJ0V2ZW50JyxcclxuICBhZnRlcnByaW50OiAgICAgICAgICdFdmVudCcsXHJcbiAgYmVmb3JldW5sb2FkOiAgICAgICAnRXZlbnQnLFxyXG4gIGFib3J0OiAgICAgICAgICAgICAgJ0V2ZW50JyxcclxuICBlcnJvcjogICAgICAgICAgICAgICdFdmVudCcsXHJcbiAgY2hhbmdlOiAgICAgICAgICAgICAnRXZlbnQnLFxyXG4gIHN1Ym1pdDogICAgICAgICAgICAgJ0V2ZW50JyxcclxuICByZXNldDogICAgICAgICAgICAgICdFdmVudCcsXHJcbiAgY2FjaGVkOiAgICAgICAgICAgICAnRXZlbnQnLFxyXG4gIGNhbnBsYXk6ICAgICAgICAgICAgJ0V2ZW50JyxcclxuICBjYW5wbGF5dGhyb3VnaDogICAgICdFdmVudCcsXHJcbiAgY2hhcmdpbmdjaGFuZ2U6ICAgICAnRXZlbnQnLFxyXG4gIGNoYXJnaW5ndGltZWNoYW5nZTogJ0V2ZW50JyxcclxuICBjaGVja2luZzogICAgICAgICAgICdFdmVudCcsXHJcbiAgY2xvc2U6ICAgICAgICAgICAgICAnRXZlbnQnLFxyXG4gIGRvd25sb2FkaW5nOiAgICAgICAgJ0V2ZW50JyxcclxuICBkdXJhdGlvbmNoYW5nZTogICAgICdFdmVudCcsXHJcbiAgZW1wdGllZDogICAgICAgICAgICAnRXZlbnQnLFxyXG4gIGVuZGVkOiAgICAgICAgICAgICAgJ0V2ZW50JyxcclxuICBmdWxsc2NyZWVuY2hhbmdlOiAgICdFdmVudCcsXHJcbiAgZnVsbHNjcmVlbmVycm9yOiAgICAnRXZlbnQnLFxyXG4gIGlucHV0OiAgICAgICAgICAgICAgJ0V2ZW50JyxcclxuICBpbnZhbGlkOiAgICAgICAgICAgICdFdmVudCcsXHJcbiAgbGV2ZWxjaGFuZ2U6ICAgICAgICAnRXZlbnQnLFxyXG4gIGxvYWRlZGRhdGE6ICAgICAgICAgJ0V2ZW50JyxcclxuICBsb2FkZWRtZXRhZGF0YTogICAgICdFdmVudCcsXHJcbiAgbm91cGRhdGU6ICAgICAgICAgICAnRXZlbnQnLFxyXG4gIG9ic29sZXRlOiAgICAgICAgICAgJ0V2ZW50JyxcclxuICBvZmZsaW5lOiAgICAgICAgICAgICdFdmVudCcsXHJcbiAgb25saW5lOiAgICAgICAgICAgICAnRXZlbnQnLFxyXG4gIG9wZW46ICAgICAgICAgICAgICAgJ0V2ZW50JyxcclxuICBvcmllbnRhdGlvbmNoYW5nZTogICdFdmVudCcsXHJcbiAgcGF1c2U6ICAgICAgICAgICAgICAnRXZlbnQnLFxyXG4gIHBvaW50ZXJsb2NrY2hhbmdlOiAgJ0V2ZW50JyxcclxuICBwb2ludGVybG9ja2Vycm9yOiAgICdFdmVudCcsXHJcbiAgY29weTogICAgICAgICAgICAgICAnRXZlbnQnLFxyXG4gIGN1dDogICAgICAgICAgICAgICAgJ0V2ZW50JyxcclxuICBwYXN0ZTogICAgICAgICAgICAgICdFdmVudCcsXHJcbiAgcGxheTogICAgICAgICAgICAgICAnRXZlbnQnLFxyXG4gIHBsYXlpbmc6ICAgICAgICAgICAgJ0V2ZW50JyxcclxuICByYXRlY2hhbmdlOiAgICAgICAgICdFdmVudCcsXHJcbiAgcmVhZHlzdGF0ZWNoYW5nZTogICAnRXZlbnQnLFxyXG4gIHNlZWtlZDogICAgICAgICAgICAgJ0V2ZW50JyxcclxuICBzZWVraW5nOiAgICAgICAgICAgICdFdmVudCcsXHJcbiAgc3RhbGxlZDogICAgICAgICAgICAnRXZlbnQnLFxyXG4gIHN1Y2Nlc3M6ICAgICAgICAgICAgJ0V2ZW50JyxcclxuICBzdXNwZW5kOiAgICAgICAgICAgICdFdmVudCcsXHJcbiAgdGltZXVwZGF0ZTogICAgICAgICAnRXZlbnQnLFxyXG4gIHVwZGF0ZXJlYWR5OiAgICAgICAgJ0V2ZW50JyxcclxuICB2aXNpYmlsaXR5Y2hhbmdlOiAgICdFdmVudCcsXHJcbiAgdm9sdW1lY2hhbmdlOiAgICAgICAnRXZlbnQnLFxyXG4gIHdhaXRpbmc6ICAgICAgICAgICAgJ0V2ZW50JyxcclxuICBsb2FkOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICB1bmxvYWQ6ICAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICByZXNpemU6ICAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICBzY3JvbGw6ICAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICBzZWxlY3Q6ICAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICBkcmFnOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICBkcmFnZW50ZXI6ICAgICAgICAgICdVSUV2ZW50JyxcclxuICBkcmFnbGVhdmU6ICAgICAgICAgICdVSUV2ZW50JyxcclxuICBkcmFnb3ZlcjogICAgICAgICAgICdVSUV2ZW50JyxcclxuICBkcmFnc3RhcnQ6ICAgICAgICAgICdVSUV2ZW50JyxcclxuICBkcmFnZW5kOiAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICBkcm9wOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICB0b3VjaGNhbmNlbDogICAgICAgICdVSUV2ZW50JyxcclxuICB0b3VjaGVuZDogICAgICAgICAgICdVSUV2ZW50JyxcclxuICB0b3VjaGVudGVyOiAgICAgICAgICdVSUV2ZW50JyxcclxuICB0b3VjaGxlYXZlOiAgICAgICAgICdVSUV2ZW50JyxcclxuICB0b3VjaG1vdmU6ICAgICAgICAgICdVSUV2ZW50JyxcclxuICB0b3VjaHN0YXJ0OiAgICAgICAgICdVSUV2ZW50JyxcclxuICBibHVyOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICBmb2N1czogICAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICBmb2N1c2luOiAgICAgICAgICAgICdVSUV2ZW50JyxcclxuICBmb2N1c291dDogICAgICAgICAgICdVSUV2ZW50JyxcclxuICBzaG93OiAgICAgICAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBjbGljazogICAgICAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBkYmxjbGljazogICAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBtb3VzZWVudGVyOiAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBtb3VzZWxlYXZlOiAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBtb3VzZWRvd246ICAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBtb3VzZXVwOiAgICAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBtb3VzZW92ZXI6ICAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBtb3VzZW1vdmU6ICAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBtb3VzZW91dDogICAgICAgICAgICdNb3VzZUV2ZW50JyxcclxuICBjb250ZXh0bWVudTogICAgICAgICdNb3VzZUV2ZW50JyxcclxuICB3aGVlbDogICAgICAgICAgICAgICdXaGVlbEV2ZW50JyxcclxuICBtZXNzYWdlOiAgICAgICAgICAgICdNZXNzYWdlRXZlbnQnLFxyXG4gIHN0b3JhZ2U6ICAgICAgICAgICAgJ1N0b3JhZ2VFdmVudCcsXHJcbiAgdGltZW91dDogICAgICAgICAgICAnU3RvcmFnZUV2ZW50JyxcclxuICBrZXlkb3duOiAgICAgICAgICAgICdLZXlib2FyZEV2ZW50JyxcclxuICBrZXlwcmVzczogICAgICAgICAgICdLZXlib2FyZEV2ZW50JyxcclxuICBrZXl1cDogICAgICAgICAgICAgICdLZXlib2FyZEV2ZW50JyxcclxuICBwcm9ncmVzczogICAgICAgICAgICdQcm9ncmVzc0V2ZW50JyxcclxuICBsb2FkZW5kOiAgICAgICAgICAgICdQcm9ncmVzc0V2ZW50JyxcclxuICBsb2Fkc3RhcnQ6ICAgICAgICAgICdQcm9ncmVzc0V2ZW50JyxcclxuICBwb3BzdGF0ZTogICAgICAgICAgICdQb3BTdGF0ZUV2ZW50JyxcclxuICBoYXNoY2hhbmdlOiAgICAgICAgICdIYXNoQ2hhbmdlRXZlbnQnLFxyXG4gIHRyYW5zaXRpb25lbmQ6ICAgICAgJ1RyYW5zaXRpb25FdmVudCcsXHJcbiAgY29tcG9zaXRpb25lbmQ6ICAgICAnQ29tcG9zaXRpb25FdmVudCcsXHJcbiAgY29tcG9zaXRpb25zdGFydDogICAnQ29tcG9zaXRpb25FdmVudCcsXHJcbiAgY29tcG9zaXRpb251cGRhdGU6ICAnQ29tcG9zaXRpb25FdmVudCcsXHJcbiAgcGFnZWhpZGU6ICAgICAgICAgICAnUGFnZVRyYW5zaXRpb25FdmVudCcsXHJcbiAgcGFnZXNob3c6ICAgICAgICAgICAnUGFnZVRyYW5zaXRpb25FdmVudCdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYXAgdGhlIGV2ZW50IHR5cGUgY29uc3RydWN0b3IgdG8gdGhlIGluaXRpYWxpemF0aW9uIG1ldGhvZC5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciBldmVudEluaXQgPSB7XHJcbiAgRXZlbnQ6ICAgICAgICAgICAgICAgICAgJ2luaXRFdmVudCcsXHJcbiAgVUlFdmVudDogICAgICAgICAgICAgICAgJ2luaXRVSUV2ZW50JyxcclxuICBGb2N1c0V2ZW50OiAgICAgICAgICAgICAnaW5pdFVJRXZlbnQnLFxyXG4gIE1vdXNlRXZlbnQ6ICAgICAgICAgICAgICdpbml0TW91c2VFdmVudCcsXHJcbiAgV2hlZWxFdmVudDogICAgICAgICAgICAgJ2luaXRNb3VzZUV2ZW50JyxcclxuICBNZXNzYWdlRXZlbnQ6ICAgICAgICAgICAnaW5pdE1lc3NhZ2VFdmVudCcsXHJcbiAgU3RvcmFnZUV2ZW50OiAgICAgICAgICAgJ2luaXRTdG9yYWdlRXZlbnQnLFxyXG4gIEtleWJvYXJkRXZlbnQ6ICAgICAgICAgICdpbml0S2V5Ym9hcmRFdmVudCcsXHJcbiAgUHJvZ3Jlc3NFdmVudDogICAgICAgICAgJ2luaXRFdmVudCcsXHJcbiAgUG9wU3RhdGVFdmVudDogICAgICAgICAgJ2luaXRFdmVudCcsXHJcbiAgVHJhbnNpdGlvbkV2ZW50OiAgICAgICAgJ2luaXRFdmVudCcsXHJcbiAgSGFzaENoYW5nZUV2ZW50OiAgICAgICAgJ2luaXRIYXNoQ2hhbmdlRXZlbnQnLFxyXG4gIENvbXBvc2l0aW9uRXZlbnQ6ICAgICAgICdpbml0Q29tcG9zaXRpb25FdmVudCcsXHJcbiAgRGV2aWNlTW90aW9uRXZlbnQ6ICAgICAgJ2luaXREZXZpY2VNb3Rpb25FdmVudCcsXHJcbiAgUGFnZVRyYW5zaXRpb25FdmVudDogICAgJ2luaXRFdmVudCcsXHJcbiAgRGV2aWNlT3JpZW50YXRpb25FdmVudDogJ2luaXREZXZpY2VPcmllbnRhdGlvbkV2ZW50J1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hcCB0aGUgb3B0aW9ucyBvYmplY3QgdG8gaW5pdGlhbGl6YXRpb24gcGFyYW1ldGVycy5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciBldmVudFBhcmFtZXRlcnMgPSB7XHJcbiAgaW5pdEV2ZW50OiBbXSxcclxuICBpbml0VUlFdmVudDogW1xyXG4gICAgJ3ZpZXcnLFxyXG4gICAgJ2RldGFpbCdcclxuICBdLFxyXG4gIGluaXRLZXlib2FyZEV2ZW50OiBbXHJcbiAgICAndmlldycsXHJcbiAgICAnY2hhcicsXHJcbiAgICAna2V5JyxcclxuICAgICdsb2NhdGlvbicsXHJcbiAgICAnbW9kaWZpZXJzTGlzdCcsXHJcbiAgICAncmVwZWF0JyxcclxuICAgICdsb2NhbGUnXHJcbiAgXSxcclxuICBpbml0S2V5RXZlbnQ6IFtcclxuICAgICd2aWV3JyxcclxuICAgICdjdHJsS2V5JyxcclxuICAgICdhbHRLZXknLFxyXG4gICAgJ3NoaWZ0S2V5JyxcclxuICAgICdtZXRhS2V5JyxcclxuICAgICdrZXlDb2RlJyxcclxuICAgICdjaGFyQ29kZSdcclxuICBdLFxyXG4gIGluaXRNb3VzZUV2ZW50OiBbXHJcbiAgICAndmlldycsXHJcbiAgICAnZGV0YWlsJyxcclxuICAgICdzY3JlZW5YJyxcclxuICAgICdzY3JlZW5ZJyxcclxuICAgICdjbGllbnRYJyxcclxuICAgICdjbGllbnRZJyxcclxuICAgICdjdHJsS2V5JyxcclxuICAgICdhbHRLZXknLFxyXG4gICAgJ3NoaWZ0S2V5JyxcclxuICAgICdtZXRhS2V5JyxcclxuICAgICdidXR0b24nLFxyXG4gICAgJ3JlbGF0ZWRUYXJnZXQnXHJcbiAgXSxcclxuICBpbml0SGFzaENoYW5nZUV2ZW50OiBbXHJcbiAgICAnb2xkVVJMJyxcclxuICAgICduZXdVUkwnXHJcbiAgXSxcclxuICBpbml0Q29tcG9zaXRpb25FdmVudDogW1xyXG4gICAgJ3ZpZXcnLFxyXG4gICAgJ2RhdGEnLFxyXG4gICAgJ2xvY2FsZSdcclxuICBdLFxyXG4gIGluaXREZXZpY2VNb3Rpb25FdmVudDogW1xyXG4gICAgJ2FjY2VsZXJhdGlvbicsXHJcbiAgICAnYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eScsXHJcbiAgICAncm90YXRpb25SYXRlJyxcclxuICAgICdpbnRlcnZhbCdcclxuICBdLFxyXG4gIGluaXREZXZpY2VPcmllbnRhdGlvbkV2ZW50OiBbXHJcbiAgICAnYWxwaGEnLFxyXG4gICAgJ2JldGEnLFxyXG4gICAgJ2dhbW1hJyxcclxuICAgICdhYnNvbHV0ZSdcclxuICBdLFxyXG4gIGluaXRNZXNzYWdlRXZlbnQ6IFtcclxuICAgICdkYXRhJyxcclxuICAgICdvcmlnaW4nLFxyXG4gICAgJ2xhc3RFdmVudElkJyxcclxuICAgICdzb3VyY2UnXHJcbiAgXSxcclxuICBpbml0U3RvcmFnZUV2ZW50OiBbXHJcbiAgICAna2V5JyxcclxuICAgICdvbGRWYWx1ZScsXHJcbiAgICAnbmV3VmFsdWUnLFxyXG4gICAgJ3VybCcsXHJcbiAgICAnc3RvcmFnZUFyZWEnXHJcbiAgXVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV4cG9ydHMgdGhlIHNpbWlsYXRlIGZ1bmN0aW9uYWxpdHkuXHJcbiAqXHJcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtICB7U3RyaW5nfSAgdHlwZVxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICBvcHRpb25zXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50LCB0eXBlLCBvcHRpb25zKSB7XHJcbiAgLy8gSW1tZWRpYXRlbHkgdGhyb3cgYW4gZXJyb3Igd2hlbiB0aGUgZXZlbnQgbmFtZSBkb2VzIG5vdCB0cmFuc2xhdGUuXHJcbiAgaWYgKCFldmVudFR5cGVzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1Vuc3VwcG9ydGVkIGV2ZW50IHR5cGUnKTtcclxuICB9XHJcblxyXG4gIHZhciBvcmlnaW5hbCA9IG9wdGlvbnM7XHJcbiAgdmFyIGV2ZW50VHlwZSA9IGV2ZW50VHlwZXNbdHlwZV07XHJcblxyXG4gIC8vIEluIElFMTEsIHRoZSBLZXlib2FyZCBldmVudCBkb2VzIG5vdCBhbGxvdyBzZXR0aW5nIHRoZVxyXG4gIC8vIGtleUNvZGUgcHJvcGVydHksIGV2ZW4gd2l0aCBPYmplY3QuZGVmaW5lUHJvcGVydHksXHJcbiAgLy8gc28gd2UgaGF2ZSB0byB1c2UgYSBVSUV2ZW50LlxyXG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gIHZhciBtc2llID0gdWEuaW5kZXhPZignTVNJRSAnKTtcclxuICBpZiAoZXZlbnRUeXBlID09PSAnS2V5Ym9hcmRFdmVudCcpIHtcclxuICAgIGV2ZW50VHlwZSA9ICdVSUV2ZW50JztcclxuICB9XHJcblxyXG4gIHZhciBpbml0RXZlbnQgPSBldmVudEluaXRbZXZlbnRUeXBlXTtcclxuICB2YXIgZXZlbnQ7XHJcblxyXG4gIC8vIEV4dGVuZCBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgZGVmYXVsdCBhbmQgcGFzc2VkIGluIG9wdGlvbnMuXHJcbiAgb3B0aW9ucyA9IGV4dGVuZCh7XHJcbiAgICBidWJibGVzOiAgICB0cnVlLFxyXG4gICAgY2FuY2VsYWJsZTogdHJ1ZVxyXG4gIH0sIHJlc3VsdChldmVudE9wdGlvbnMsIGV2ZW50VHlwZSwgZWxlbWVudCwgdHlwZSwgb3B0aW9ucyksIG9wdGlvbnMpO1xyXG5cclxuICAvLyBQcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgb3IgdXNlIHRoZSBuZXcgb3B0aW9ucyBpZiBub25lIHdlcmUgZ2l2ZW4uXHJcbiAgaWYgKCFvcmlnaW5hbCkgb3JpZ2luYWwgPSBvcHRpb25zO1xyXG5cclxuICAvLyBJbiA8IElFOSwgdGhlIGBjcmVhdGVFdmVudGAgZnVuY3Rpb24gaXMgbm90IGF2YWlsYWJsZSBhbmQgd2UgaGF2ZSB0b1xyXG4gIC8vIHJlc29ydCB0byB1c2luZyBgZmlyZUV2ZW50YC5cclxuICBpZiAoIWRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XHJcbiAgICBldmVudCA9IGV4dGVuZChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpLCBvcHRpb25zKTtcclxuICAgIHJldHVybiBlbGVtZW50LmZpcmVFdmVudCgnb24nICsgdHlwZSwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgZXZlbnQgPSBleHRlbmQoZG9jdW1lbnQuY3JlYXRlRXZlbnQoZXZlbnRUeXBlKSwgb3B0aW9ucyk7XHJcblxyXG4gIC8vIEhhbmRsZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBpbml0S2V5Ym9hcmRFdmVudGAgYW5kIGBpbml0S2V5RXZlbnRgLlxyXG4gIGlmIChpbml0RXZlbnQgPT09ICdpbml0S2V5Ym9hcmRFdmVudCcpIHtcclxuICAgIGlmIChldmVudFtpbml0RXZlbnRdID09PSB2b2lkIDApIHtcclxuICAgICAgaW5pdEV2ZW50ID0gJ2luaXRLZXlFdmVudCc7XHJcbiAgICB9IGVsc2UgaWYgKCEoJ21vZGlmaWVyc0xpc3QnIGluIG9wdGlvbnMpKSB7XHJcbiAgICAgIHZhciBtb2RzID0gW11cclxuICAgICAgaWYgKG9wdGlvbnMubWV0YUtleSkgbW9kcy5wdXNoKCdNZXRhJyk7XHJcbiAgICAgIGlmIChvcHRpb25zLmFsdEtleSkgbW9kcy5wdXNoKCdBbHQnKTtcclxuICAgICAgaWYgKG9wdGlvbnMuc2hpZnRLZXkpIG1vZHMucHVzaCgnU2hpZnQnKTtcclxuICAgICAgaWYgKG9wdGlvbnMuY3RybEtleSkgbW9kcy5wdXNoKCdDb250cm9sJyk7XHJcbiAgICAgIG9wdGlvbnNbJ21vZGlmaWVyc0xpc3QnXSA9IG1vZHMuam9pbignICcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gTWFwIGFyZ3VtZW50IG5hbWVzIHRvIHRoZSBvcHRpb24gdmFsdWVzLlxyXG4gIHZhciBhcmdzID0gZXZlbnRQYXJhbWV0ZXJzW2luaXRFdmVudF0ubWFwKGZ1bmN0aW9uIChwYXJhbWV0ZXIpIHtcclxuICAgIHJldHVybiBvcHRpb25zW3BhcmFtZXRlcl07XHJcbiAgfSk7XHJcblxyXG4gIC8vIEluaXRpYWxpemUgdGhlIGV2ZW50IHVzaW5nIHRoZSBidWlsdC1pbiBtZXRob2QuXHJcbiAgZXZlbnRbaW5pdEV2ZW50XS5hcHBseShcclxuICAgIGV2ZW50LCBbdHlwZSwgZXZlbnQuYnViYmxlcywgZXZlbnQuY2FuY2VsYWJsZV0uY29uY2F0KGFyZ3MpXHJcbiAgKTtcclxuXHJcbiAgLy8gV29yayBhcm91bmQgbGltaXRhdGlvbnMgaW4gdGhlIGtleWJvYXJkIGluaXRpYWxpemF0aW9uLlxyXG4gIGlmIChldmVudFR5cGUgPT09ICdLZXlib2FyZEV2ZW50Jykge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAna2V5Q29kZScsXHJcbiAgICAgIHsgdmFsdWU6IG9yaWdpbmFsWydrZXlDb2RlJ10gfHwgMCB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2tleScsXHJcbiAgICAgIHsgdmFsdWU6IG9yaWdpbmFsWydrZXknXSB8fCAnJyB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ3doaWNoJyxcclxuICAgICAgeyB2YWx1ZTogb3JpZ2luYWxbJ3doaWNoJ10gfHwgb3B0aW9uc1sna2V5Q29kZSddIHx8IDAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufTtcclxuIl19
(4)
});
