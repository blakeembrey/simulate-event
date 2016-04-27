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
  var origEventType = eventTypes[type];

  // In IE11, the Keyboard event does not allow setting the
  // keyCode property, even with Object.defineProperty,
  // so we have to use a UIEvent.
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0 && eventType === 'KeyboardEvent') {
    eventType = 'UIEvent'; 
  }

  var eventType = eventTypes[type];
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
  if (origEventType === 'KeyboardEvent') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zc2lsdmVzdGVyL3dvcmtzcGFjZS9qdXB5dGVyL3NpbXVsYXRlLWV2ZW50L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc3NpbHZlc3Rlci93b3Jrc3BhY2UvanVweXRlci9zaW11bGF0ZS1ldmVudC9saWIvZXh0ZW5kLmpzIiwiL1VzZXJzL3NzaWx2ZXN0ZXIvd29ya3NwYWNlL2p1cHl0ZXIvc2ltdWxhdGUtZXZlbnQvbGliL3Jlc3VsdC5qcyIsIi9Vc2Vycy9zc2lsdmVzdGVyL3dvcmtzcGFjZS9qdXB5dGVyL3NpbXVsYXRlLWV2ZW50L25vZGVfbW9kdWxlcy92YXJpYWRpYy92YXJpYWRpYy5qcyIsIi9Vc2Vycy9zc2lsdmVzdGVyL3dvcmtzcGFjZS9qdXB5dGVyL3NpbXVsYXRlLWV2ZW50L3NpbXVsYXRlLWV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB2YXJpYWRpYyA9IHJlcXVpcmUoJ3ZhcmlhZGljJyk7XG5cbi8qKlxuICogRXh0ZW5kIGFuIHNpbmdsZSBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpLiBFYWNoXG4gKiBwcm9wZXJ0eSBhZGRlZCB3aWxsIG92ZXJyaWRlIGFueSBleGlzdGluZyBwcm9wZXJ0eSB0aGF0IG1hdGNoZXMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSAge09iamVjdH0gLi4uXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gdmFyaWFkaWMoZnVuY3Rpb24gKG9iaiwgc291cmNlcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlc1tpXSkge1xuICAgICAgb2JqW2tleV0gPSBzb3VyY2VzW2ldW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0pO1xuIiwidmFyIHZhcmlhZGljID0gcmVxdWlyZSgndmFyaWFkaWMnKTtcblxuLyoqXG4gKiBHZXQgdGhlIHByb3BlcnR5IGZyb20gYW4gb2JqZWN0LiBJZiB0aGUgcHJvcGVydHkgaXMgYSBmdW5jdGlvbiwgaW1tZWRpYXRlbHlcbiAqIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggb3B0aW9uYWwgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcGFyYW0gIHsqfSAgICAgIC4uLlxuICogQHJldHVybiB7Kn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB2YXJpYWRpYyhmdW5jdGlvbiAob2JqLCBwcm9wZXJ0eSwgYXJncykge1xuICB2YXIgcmVzdWx0ID0gb2JqW3Byb3BlcnR5XTtcblxuICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlc3VsdCA9IHJlc3VsdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfX3NsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgdmFyaWFibGUgbnVtYmVyIG9mIGFyZ3VtZW50cyBhcyB0aGUgbGFzdFxuICogZnVuY3Rpb24gYXJndW1lbnQuXG4gKlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGNvdW50ID0gTWF0aC5tYXgoZm4ubGVuZ3RoIC0gMSwgMCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGNvdW50KTtcblxuICAgIC8vIEVuZm9yY2UgdGhlIGFycmF5IGxlbmd0aCwgaW4gY2FzZSB3ZSBkb24ndCBoYXZlIGVub3VnaCBhcnJheSBwYWRkaW5nLlxuICAgIGFyZ3MubGVuZ3RoID0gY291bnQ7XG4gICAgYXJncy5wdXNoKF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIGNvdW50KSk7XG5cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59O1xuIiwidmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4vbGliL2V4dGVuZCcpO1xudmFyIHJlc3VsdCA9IHJlcXVpcmUoJy4vbGliL3Jlc3VsdCcpO1xuXG4vKipcbiAqIFNldCBzb21lIGRlZmF1bHQgb3B0aW9ucy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRPcHRpb25zID0ge1xuICBVSUV2ZW50OiBmdW5jdGlvbiAoZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlldzogZWwub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlld1xuICAgIH07XG4gIH0sXG4gIEZvY3VzRXZlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXZlbnRPcHRpb25zLlVJRXZlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfSxcbiAgTW91c2VFdmVudDogZnVuY3Rpb24gKGVsLCB0eXBlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJ1dHRvbjogICAgICAgIDAsXG4gICAgICBjYW5jZWxhYmxlOiAgICAodHlwZSAhPT0gJ21vdXNlbW92ZScpLFxuICAgICAgY3RybEtleTogICAgICAgZmFsc2UsXG4gICAgICBhbHRLZXk6ICAgICAgICBmYWxzZSxcbiAgICAgIHNoaWZ0S2V5OiAgICAgIGZhbHNlLFxuICAgICAgbWV0YUtleTogICAgICAgZmFsc2UsXG4gICAgICBjbGllbnRYOiAgICAgICAxLFxuICAgICAgY2xpZW50WTogICAgICAgMSxcbiAgICAgIHNjcmVlblg6ICAgICAgIDAsXG4gICAgICBzY3JlZW5ZOiAgICAgICAwLFxuICAgICAgdmlldzogICAgICAgICAgZWwub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyxcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IGVsLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgfTtcbiAgfSxcbiAgS2V5Ym9hcmRFdmVudDogZnVuY3Rpb24gKGVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZpZXc6ICAgICBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LFxuICAgICAgY3RybEtleTogIGZhbHNlLFxuICAgICAgYWx0S2V5OiAgIGZhbHNlLFxuICAgICAgc2hpZnRLZXk6IGZhbHNlLFxuICAgICAgbWV0YUtleTogIGZhbHNlLFxuICAgICAga2V5Q29kZTogIDBcbiAgICB9O1xuICB9XG59O1xuXG4vKipcbiAqIE1hcCBldmVudCBuYW1lcyB0byBjb25zdHJ1Y3RvciBuYW1lcy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRUeXBlcyA9IHtcbiAgYmVmb3JlcHJpbnQ6ICAgICAgICAnRXZlbnQnLFxuICBhZnRlcnByaW50OiAgICAgICAgICdFdmVudCcsXG4gIGJlZm9yZXVubG9hZDogICAgICAgJ0V2ZW50JyxcbiAgYWJvcnQ6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBlcnJvcjogICAgICAgICAgICAgICdFdmVudCcsXG4gIGNoYW5nZTogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgc3VibWl0OiAgICAgICAgICAgICAnRXZlbnQnLFxuICByZXNldDogICAgICAgICAgICAgICdFdmVudCcsXG4gIGNhY2hlZDogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgY2FucGxheTogICAgICAgICAgICAnRXZlbnQnLFxuICBjYW5wbGF5dGhyb3VnaDogICAgICdFdmVudCcsXG4gIGNoYXJnaW5nY2hhbmdlOiAgICAgJ0V2ZW50JyxcbiAgY2hhcmdpbmd0aW1lY2hhbmdlOiAnRXZlbnQnLFxuICBjaGVja2luZzogICAgICAgICAgICdFdmVudCcsXG4gIGNsb3NlOiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgZG93bmxvYWRpbmc6ICAgICAgICAnRXZlbnQnLFxuICBkdXJhdGlvbmNoYW5nZTogICAgICdFdmVudCcsXG4gIGVtcHRpZWQ6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgZW5kZWQ6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBmdWxsc2NyZWVuY2hhbmdlOiAgICdFdmVudCcsXG4gIGZ1bGxzY3JlZW5lcnJvcjogICAgJ0V2ZW50JyxcbiAgaW5wdXQ6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBpbnZhbGlkOiAgICAgICAgICAgICdFdmVudCcsXG4gIGxldmVsY2hhbmdlOiAgICAgICAgJ0V2ZW50JyxcbiAgbG9hZGVkZGF0YTogICAgICAgICAnRXZlbnQnLFxuICBsb2FkZWRtZXRhZGF0YTogICAgICdFdmVudCcsXG4gIG5vdXBkYXRlOiAgICAgICAgICAgJ0V2ZW50JyxcbiAgb2Jzb2xldGU6ICAgICAgICAgICAnRXZlbnQnLFxuICBvZmZsaW5lOiAgICAgICAgICAgICdFdmVudCcsXG4gIG9ubGluZTogICAgICAgICAgICAgJ0V2ZW50JyxcbiAgb3BlbjogICAgICAgICAgICAgICAnRXZlbnQnLFxuICBvcmllbnRhdGlvbmNoYW5nZTogICdFdmVudCcsXG4gIHBhdXNlOiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcG9pbnRlcmxvY2tjaGFuZ2U6ICAnRXZlbnQnLFxuICBwb2ludGVybG9ja2Vycm9yOiAgICdFdmVudCcsXG4gIGNvcHk6ICAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgY3V0OiAgICAgICAgICAgICAgICAnRXZlbnQnLFxuICBwYXN0ZTogICAgICAgICAgICAgICdFdmVudCcsXG4gIHBsYXk6ICAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcGxheWluZzogICAgICAgICAgICAnRXZlbnQnLFxuICByYXRlY2hhbmdlOiAgICAgICAgICdFdmVudCcsXG4gIHJlYWR5c3RhdGVjaGFuZ2U6ICAgJ0V2ZW50JyxcbiAgc2Vla2VkOiAgICAgICAgICAgICAnRXZlbnQnLFxuICBzZWVraW5nOiAgICAgICAgICAgICdFdmVudCcsXG4gIHN0YWxsZWQ6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgc3VjY2VzczogICAgICAgICAgICAnRXZlbnQnLFxuICBzdXNwZW5kOiAgICAgICAgICAgICdFdmVudCcsXG4gIHRpbWV1cGRhdGU6ICAgICAgICAgJ0V2ZW50JyxcbiAgdXBkYXRlcmVhZHk6ICAgICAgICAnRXZlbnQnLFxuICB2aXNpYmlsaXR5Y2hhbmdlOiAgICdFdmVudCcsXG4gIHZvbHVtZWNoYW5nZTogICAgICAgJ0V2ZW50JyxcbiAgd2FpdGluZzogICAgICAgICAgICAnRXZlbnQnLFxuICBsb2FkOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgdW5sb2FkOiAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIHJlc2l6ZTogICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBzY3JvbGw6ICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgc2VsZWN0OiAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyYWc6ICAgICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnZW50ZXI6ICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJhZ2xlYXZlOiAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyYWdvdmVyOiAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnc3RhcnQ6ICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJhZ2VuZDogICAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyb3A6ICAgICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaGNhbmNlbDogICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2hlbmQ6ICAgICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNoZW50ZXI6ICAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaGxlYXZlOiAgICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2htb3ZlOiAgICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNoc3RhcnQ6ICAgICAgICAgJ1VJRXZlbnQnLFxuICBibHVyOiAgICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgZm9jdXM6ICAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIGZvY3VzaW46ICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBmb2N1c291dDogICAgICAgICAgICdVSUV2ZW50JyxcbiAgc2hvdzogICAgICAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIGNsaWNrOiAgICAgICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBkYmxjbGljazogICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2VlbnRlcjogICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlbGVhdmU6ICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZWRvd246ICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2V1cDogICAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlb3ZlcjogICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZW1vdmU6ICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2VvdXQ6ICAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIGNvbnRleHRtZW51OiAgICAgICAgJ01vdXNlRXZlbnQnLFxuICB3aGVlbDogICAgICAgICAgICAgICdXaGVlbEV2ZW50JyxcbiAgbWVzc2FnZTogICAgICAgICAgICAnTWVzc2FnZUV2ZW50JyxcbiAgc3RvcmFnZTogICAgICAgICAgICAnU3RvcmFnZUV2ZW50JyxcbiAgdGltZW91dDogICAgICAgICAgICAnU3RvcmFnZUV2ZW50JyxcbiAga2V5ZG93bjogICAgICAgICAgICAnS2V5Ym9hcmRFdmVudCcsXG4gIGtleXByZXNzOiAgICAgICAgICAgJ0tleWJvYXJkRXZlbnQnLFxuICBrZXl1cDogICAgICAgICAgICAgICdLZXlib2FyZEV2ZW50JyxcbiAgcHJvZ3Jlc3M6ICAgICAgICAgICAnUHJvZ3Jlc3NFdmVudCcsXG4gIGxvYWRlbmQ6ICAgICAgICAgICAgJ1Byb2dyZXNzRXZlbnQnLFxuICBsb2Fkc3RhcnQ6ICAgICAgICAgICdQcm9ncmVzc0V2ZW50JyxcbiAgcG9wc3RhdGU6ICAgICAgICAgICAnUG9wU3RhdGVFdmVudCcsXG4gIGhhc2hjaGFuZ2U6ICAgICAgICAgJ0hhc2hDaGFuZ2VFdmVudCcsXG4gIHRyYW5zaXRpb25lbmQ6ICAgICAgJ1RyYW5zaXRpb25FdmVudCcsXG4gIGNvbXBvc2l0aW9uZW5kOiAgICAgJ0NvbXBvc2l0aW9uRXZlbnQnLFxuICBjb21wb3NpdGlvbnN0YXJ0OiAgICdDb21wb3NpdGlvbkV2ZW50JyxcbiAgY29tcG9zaXRpb251cGRhdGU6ICAnQ29tcG9zaXRpb25FdmVudCcsXG4gIHBhZ2VoaWRlOiAgICAgICAgICAgJ1BhZ2VUcmFuc2l0aW9uRXZlbnQnLFxuICBwYWdlc2hvdzogICAgICAgICAgICdQYWdlVHJhbnNpdGlvbkV2ZW50J1xufTtcblxuLyoqXG4gKiBNYXAgdGhlIGV2ZW50IHR5cGUgY29uc3RydWN0b3IgdG8gdGhlIGluaXRpYWxpemF0aW9uIG1ldGhvZC5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRJbml0ID0ge1xuICBFdmVudDogICAgICAgICAgICAgICAgICAnaW5pdEV2ZW50JyxcbiAgVUlFdmVudDogICAgICAgICAgICAgICAgJ2luaXRVSUV2ZW50JyxcbiAgRm9jdXNFdmVudDogICAgICAgICAgICAgJ2luaXRVSUV2ZW50JyxcbiAgTW91c2VFdmVudDogICAgICAgICAgICAgJ2luaXRNb3VzZUV2ZW50JyxcbiAgV2hlZWxFdmVudDogICAgICAgICAgICAgJ2luaXRNb3VzZUV2ZW50JyxcbiAgTWVzc2FnZUV2ZW50OiAgICAgICAgICAgJ2luaXRNZXNzYWdlRXZlbnQnLFxuICBTdG9yYWdlRXZlbnQ6ICAgICAgICAgICAnaW5pdFN0b3JhZ2VFdmVudCcsXG4gIEtleWJvYXJkRXZlbnQ6ICAgICAgICAgICdpbml0S2V5Ym9hcmRFdmVudCcsXG4gIFByb2dyZXNzRXZlbnQ6ICAgICAgICAgICdpbml0RXZlbnQnLFxuICBQb3BTdGF0ZUV2ZW50OiAgICAgICAgICAnaW5pdEV2ZW50JyxcbiAgVHJhbnNpdGlvbkV2ZW50OiAgICAgICAgJ2luaXRFdmVudCcsXG4gIEhhc2hDaGFuZ2VFdmVudDogICAgICAgICdpbml0SGFzaENoYW5nZUV2ZW50JyxcbiAgQ29tcG9zaXRpb25FdmVudDogICAgICAgJ2luaXRDb21wb3NpdGlvbkV2ZW50JyxcbiAgRGV2aWNlTW90aW9uRXZlbnQ6ICAgICAgJ2luaXREZXZpY2VNb3Rpb25FdmVudCcsXG4gIFBhZ2VUcmFuc2l0aW9uRXZlbnQ6ICAgICdpbml0RXZlbnQnLFxuICBEZXZpY2VPcmllbnRhdGlvbkV2ZW50OiAnaW5pdERldmljZU9yaWVudGF0aW9uRXZlbnQnXG59O1xuXG4vKipcbiAqIE1hcCB0aGUgb3B0aW9ucyBvYmplY3QgdG8gaW5pdGlhbGl6YXRpb24gcGFyYW1ldGVycy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRQYXJhbWV0ZXJzID0ge1xuICBpbml0RXZlbnQ6IFtdLFxuICBpbml0VUlFdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnZGV0YWlsJ1xuICBdLFxuICBpbml0S2V5Ym9hcmRFdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnY2hhcicsXG4gICAgJ2tleScsXG4gICAgJ2xvY2F0aW9uJyxcbiAgICAnbW9kaWZpZXJzTGlzdCcsXG4gICAgJ3JlcGVhdCcsXG4gICAgJ2xvY2FsZSdcbiAgXSxcbiAgaW5pdEtleUV2ZW50OiBbXG4gICAgJ3ZpZXcnLCBcbiAgICAnY3RybEtleScsIFxuICAgICdhbHRLZXknLCBcbiAgICAnc2hpZnRLZXknLCBcbiAgICAnbWV0YUtleScsIFxuICAgICdrZXlDb2RlJywgXG4gICAgJ2NoYXJDb2RlJ1xuICBdLFxuICBpbml0TW91c2VFdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnZGV0YWlsJyxcbiAgICAnc2NyZWVuWCcsXG4gICAgJ3NjcmVlblknLFxuICAgICdjbGllbnRYJyxcbiAgICAnY2xpZW50WScsXG4gICAgJ2N0cmxLZXknLFxuICAgICdhbHRLZXknLFxuICAgICdzaGlmdEtleScsXG4gICAgJ21ldGFLZXknLFxuICAgICdidXR0b24nLFxuICAgICdyZWxhdGVkVGFyZ2V0J1xuICBdLFxuICBpbml0SGFzaENoYW5nZUV2ZW50OiBbXG4gICAgJ29sZFVSTCcsXG4gICAgJ25ld1VSTCdcbiAgXSxcbiAgaW5pdENvbXBvc2l0aW9uRXZlbnQ6IFtcbiAgICAndmlldycsXG4gICAgJ2RhdGEnLFxuICAgICdsb2NhbGUnXG4gIF0sXG4gIGluaXREZXZpY2VNb3Rpb25FdmVudDogW1xuICAgICdhY2NlbGVyYXRpb24nLFxuICAgICdhY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5JyxcbiAgICAncm90YXRpb25SYXRlJyxcbiAgICAnaW50ZXJ2YWwnXG4gIF0sXG4gIGluaXREZXZpY2VPcmllbnRhdGlvbkV2ZW50OiBbXG4gICAgJ2FscGhhJyxcbiAgICAnYmV0YScsXG4gICAgJ2dhbW1hJyxcbiAgICAnYWJzb2x1dGUnXG4gIF0sXG4gIGluaXRNZXNzYWdlRXZlbnQ6IFtcbiAgICAnZGF0YScsXG4gICAgJ29yaWdpbicsXG4gICAgJ2xhc3RFdmVudElkJyxcbiAgICAnc291cmNlJ1xuICBdLFxuICBpbml0U3RvcmFnZUV2ZW50OiBbXG4gICAgJ2tleScsXG4gICAgJ29sZFZhbHVlJyxcbiAgICAnbmV3VmFsdWUnLFxuICAgICd1cmwnLFxuICAgICdzdG9yYWdlQXJlYSdcbiAgXVxufTtcblxuLyoqXG4gKiBFeHBvcnRzIHRoZSBzaW1pbGF0ZSBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSAge1N0cmluZ30gIHR5cGVcbiAqIEBwYXJhbSAge09iamVjdH0gIG9wdGlvbnNcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQsIHR5cGUsIG9wdGlvbnMpIHtcbiAgLy8gSW1tZWRpYXRlbHkgdGhyb3cgYW4gZXJyb3Igd2hlbiB0aGUgZXZlbnQgbmFtZSBkb2VzIG5vdCB0cmFuc2xhdGUuXG4gIGlmICghZXZlbnRUeXBlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5zdXBwb3J0ZWQgZXZlbnQgdHlwZScpO1xuICB9XG5cbiAgdmFyIG9yaWdpbmFsID0gb3B0aW9ucztcbiAgdmFyIG9yaWdFdmVudFR5cGUgPSBldmVudFR5cGVzW3R5cGVdO1xuXG4gIC8vIEluIElFMTEsIHRoZSBLZXlib2FyZCBldmVudCBkb2VzIG5vdCBhbGxvdyBzZXR0aW5nIHRoZVxuICAvLyBrZXlDb2RlIHByb3BlcnR5LCBldmVuIHdpdGggT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICAvLyBzbyB3ZSBoYXZlIHRvIHVzZSBhIFVJRXZlbnQuXG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICB2YXIgbXNpZSA9IHVhLmluZGV4T2YoJ01TSUUgJyk7XG4gIGlmIChtc2llID4gMCAmJiBldmVudFR5cGUgPT09ICdLZXlib2FyZEV2ZW50Jykge1xuICAgIGV2ZW50VHlwZSA9ICdVSUV2ZW50JzsgXG4gIH1cblxuICB2YXIgZXZlbnRUeXBlID0gZXZlbnRUeXBlc1t0eXBlXTtcbiAgdmFyIGluaXRFdmVudCA9IGV2ZW50SW5pdFtldmVudFR5cGVdO1xuICB2YXIgZXZlbnQ7XG5cbiAgLy8gRXh0ZW5kIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBkZWZhdWx0IGFuZCBwYXNzZWQgaW4gb3B0aW9ucy5cbiAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgYnViYmxlczogICAgdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlXG4gIH0sIHJlc3VsdChldmVudE9wdGlvbnMsIGV2ZW50VHlwZSwgZWxlbWVudCwgdHlwZSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuXG4gIC8vIFByZXNlcnZlIHRoZSBvcmlnaW5hbCBvciB1c2UgdGhlIG5ldyBvcHRpb25zIGlmIG5vbmUgd2VyZSBnaXZlbi5cbiAgaWYgKCFvcmlnaW5hbCkgb3JpZ2luYWwgPSBvcHRpb25zO1xuXG4gIC8vIEluIDwgSUU5LCB0aGUgYGNyZWF0ZUV2ZW50YCBmdW5jdGlvbiBpcyBub3QgYXZhaWxhYmxlIGFuZCB3ZSBoYXZlIHRvXG4gIC8vIHJlc29ydCB0byB1c2luZyBgZmlyZUV2ZW50YC5cbiAgaWYgKCFkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgIGV2ZW50ID0gZXh0ZW5kKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCksIG9wdGlvbnMpO1xuICAgIHJldHVybiBlbGVtZW50LmZpcmVFdmVudCgnb24nICsgdHlwZSwgZXZlbnQpO1xuICB9XG5cbiAgZXZlbnQgPSBleHRlbmQoZG9jdW1lbnQuY3JlYXRlRXZlbnQoZXZlbnRUeXBlKSwgb3B0aW9ucyk7XG5cbiAgLy8gSGFuZGxlIGRpZmZlcmVuY2VzIGJldHdlZW4gYGluaXRLZXlib2FyZEV2ZW50YCBhbmQgYGluaXRLZXlFdmVudGAuXG4gIGlmIChpbml0RXZlbnQgPT09ICdpbml0S2V5Ym9hcmRFdmVudCcpIHtcbiAgICBpZiAoZXZlbnRbaW5pdEV2ZW50XSA9PT0gdm9pZCAwKSB7XG4gICAgICBpbml0RXZlbnQgPSAnaW5pdEtleUV2ZW50JztcbiAgICB9IGVsc2UgaWYgKCEoJ21vZGlmaWVyc0xpc3QnIGluIG9wdGlvbnMpKSB7XG4gICAgICB2YXIgbW9kcyA9IFtdXG4gICAgICBpZiAob3B0aW9ucy5tZXRhS2V5KSBtb2RzLnB1c2goJ01ldGEnKTtcbiAgICAgIGlmIChvcHRpb25zLmFsdEtleSkgbW9kcy5wdXNoKCdBbHQnKTtcbiAgICAgIGlmIChvcHRpb25zLnNoaWZ0S2V5KSBtb2RzLnB1c2goJ1NoaWZ0Jyk7XG4gICAgICBpZiAob3B0aW9ucy5jdHJsS2V5KSBtb2RzLnB1c2goJ0NvbnRyb2wnKTtcbiAgICAgIG9wdGlvbnNbJ21vZGlmaWVyc0xpc3QnXSA9IG1vZHMuam9pbignICcpO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1hcCBhcmd1bWVudCBuYW1lcyB0byB0aGUgb3B0aW9uIHZhbHVlcy5cbiAgdmFyIGFyZ3MgPSBldmVudFBhcmFtZXRlcnNbaW5pdEV2ZW50XS5tYXAoZnVuY3Rpb24gKHBhcmFtZXRlcikge1xuICAgIHJldHVybiBvcHRpb25zW3BhcmFtZXRlcl07XG4gIH0pO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIGV2ZW50IHVzaW5nIHRoZSBidWlsdC1pbiBtZXRob2QuXG4gIGV2ZW50W2luaXRFdmVudF0uYXBwbHkoXG4gICAgZXZlbnQsIFt0eXBlLCBldmVudC5idWJibGVzLCBldmVudC5jYW5jZWxhYmxlXS5jb25jYXQoYXJncylcbiAgKTtcblxuICAvLyBXb3JrIGFyb3VuZCBsaW1pdGF0aW9ucyBpbiB0aGUga2V5Ym9hcmQgaW5pdGlhbGl6YXRpb24uXG4gIGlmIChvcmlnRXZlbnRUeXBlID09PSAnS2V5Ym9hcmRFdmVudCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdrZXlDb2RlJywgXG4gICAgICB7IHZhbHVlOiBvcmlnaW5hbFsna2V5Q29kZSddIHx8IDAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAna2V5JywgXG4gICAgICB7IHZhbHVlOiBvcmlnaW5hbFsna2V5J10gfHwgJycgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAnd2hpY2gnLCBcbiAgICAgIHsgdmFsdWU6IG9yaWdpbmFsWyd3aGljaCddIHx8IG9wdGlvbnNbJ2tleUNvZGUnXSB8fCAwIH0pO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuIl19
(4)
});
