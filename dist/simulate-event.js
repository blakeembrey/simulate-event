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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zc2lsdmVzdGVyL3dvcmtzcGFjZS9qdXB5dGVyL3NpbXVsYXRlLWV2ZW50L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc3NpbHZlc3Rlci93b3Jrc3BhY2UvanVweXRlci9zaW11bGF0ZS1ldmVudC9saWIvZXh0ZW5kLmpzIiwiL1VzZXJzL3NzaWx2ZXN0ZXIvd29ya3NwYWNlL2p1cHl0ZXIvc2ltdWxhdGUtZXZlbnQvbGliL3Jlc3VsdC5qcyIsIi9Vc2Vycy9zc2lsdmVzdGVyL3dvcmtzcGFjZS9qdXB5dGVyL3NpbXVsYXRlLWV2ZW50L25vZGVfbW9kdWxlcy92YXJpYWRpYy92YXJpYWRpYy5qcyIsIi9Vc2Vycy9zc2lsdmVzdGVyL3dvcmtzcGFjZS9qdXB5dGVyL3NpbXVsYXRlLWV2ZW50L3NpbXVsYXRlLWV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHZhcmlhZGljID0gcmVxdWlyZSgndmFyaWFkaWMnKTtcblxuLyoqXG4gKiBFeHRlbmQgYW4gc2luZ2xlIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykuIEVhY2hcbiAqIHByb3BlcnR5IGFkZGVkIHdpbGwgb3ZlcnJpZGUgYW55IGV4aXN0aW5nIHByb3BlcnR5IHRoYXQgbWF0Y2hlcy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9ialxuICogQHBhcmFtICB7T2JqZWN0fSAuLi5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB2YXJpYWRpYyhmdW5jdGlvbiAob2JqLCBzb3VyY2VzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2VzW2ldKSB7XG4gICAgICBvYmpba2V5XSA9IHNvdXJjZXNbaV1ba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSk7XG4iLCJ2YXIgdmFyaWFkaWMgPSByZXF1aXJlKCd2YXJpYWRpYycpO1xuXG4vKipcbiAqIEdldCB0aGUgcHJvcGVydHkgZnJvbSBhbiBvYmplY3QuIElmIHRoZSBwcm9wZXJ0eSBpcyBhIGZ1bmN0aW9uLCBpbW1lZGlhdGVseVxuICogY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCBvcHRpb25hbCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSAge1N0cmluZ30gcHJvcGVydHlcbiAqIEBwYXJhbSAgeyp9ICAgICAgLi4uXG4gKiBAcmV0dXJuIHsqfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHZhcmlhZGljKGZ1bmN0aW9uIChvYmosIHByb3BlcnR5LCBhcmdzKSB7XG4gIHZhciByZXN1bHQgPSBvYmpbcHJvcGVydHldO1xuXG4gIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVzdWx0ID0gcmVzdWx0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuIiwidmFyIF9fc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYSB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzIGFzIHRoZSBsYXN0XG4gKiBmdW5jdGlvbiBhcmd1bWVudC5cbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgY291bnQgPSBNYXRoLm1heChmbi5sZW5ndGggLSAxLCAwKTtcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgY291bnQpO1xuXG4gICAgLy8gRW5mb3JjZSB0aGUgYXJyYXkgbGVuZ3RoLCBpbiBjYXNlIHdlIGRvbid0IGhhdmUgZW5vdWdoIGFycmF5IHBhZGRpbmcuXG4gICAgYXJncy5sZW5ndGggPSBjb3VudDtcbiAgICBhcmdzLnB1c2goX19zbGljZS5jYWxsKGFyZ3VtZW50cywgY291bnQpKTtcblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi9saWIvZXh0ZW5kJyk7XG52YXIgcmVzdWx0ID0gcmVxdWlyZSgnLi9saWIvcmVzdWx0Jyk7XG5cbi8qKlxuICogU2V0IHNvbWUgZGVmYXVsdCBvcHRpb25zLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudE9wdGlvbnMgPSB7XG4gIFVJRXZlbnQ6IGZ1bmN0aW9uIChlbCkge1xuICAgIHJldHVybiB7XG4gICAgICB2aWV3OiBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3XG4gICAgfTtcbiAgfSxcbiAgRm9jdXNFdmVudDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBldmVudE9wdGlvbnMuVUlFdmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9LFxuICBNb3VzZUV2ZW50OiBmdW5jdGlvbiAoZWwsIHR5cGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnV0dG9uOiAgICAgICAgMCxcbiAgICAgIGNhbmNlbGFibGU6ICAgICh0eXBlICE9PSAnbW91c2Vtb3ZlJyksXG4gICAgICBjdHJsS2V5OiAgICAgICBmYWxzZSxcbiAgICAgIGFsdEtleTogICAgICAgIGZhbHNlLFxuICAgICAgc2hpZnRLZXk6ICAgICAgZmFsc2UsXG4gICAgICBtZXRhS2V5OiAgICAgICBmYWxzZSxcbiAgICAgIGNsaWVudFg6ICAgICAgIDEsXG4gICAgICBjbGllbnRZOiAgICAgICAxLFxuICAgICAgc2NyZWVuWDogICAgICAgMCxcbiAgICAgIHNjcmVlblk6ICAgICAgIDAsXG4gICAgICB2aWV3OiAgICAgICAgICBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LFxuICAgICAgcmVsYXRlZFRhcmdldDogZWwub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICB9O1xuICB9LFxuICBLZXlib2FyZEV2ZW50OiBmdW5jdGlvbiAoZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlldzogICAgIGVsLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcsXG4gICAgICBjdHJsS2V5OiAgZmFsc2UsXG4gICAgICBhbHRLZXk6ICAgZmFsc2UsXG4gICAgICBzaGlmdEtleTogZmFsc2UsXG4gICAgICBtZXRhS2V5OiAgZmFsc2UsXG4gICAgICBrZXlDb2RlOiAgMFxuICAgIH07XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGV2ZW50IG5hbWVzIHRvIGNvbnN0cnVjdG9yIG5hbWVzLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudFR5cGVzID0ge1xuICBiZWZvcmVwcmludDogICAgICAgICdFdmVudCcsXG4gIGFmdGVycHJpbnQ6ICAgICAgICAgJ0V2ZW50JyxcbiAgYmVmb3JldW5sb2FkOiAgICAgICAnRXZlbnQnLFxuICBhYm9ydDogICAgICAgICAgICAgICdFdmVudCcsXG4gIGVycm9yOiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgY2hhbmdlOiAgICAgICAgICAgICAnRXZlbnQnLFxuICBzdWJtaXQ6ICAgICAgICAgICAgICdFdmVudCcsXG4gIHJlc2V0OiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgY2FjaGVkOiAgICAgICAgICAgICAnRXZlbnQnLFxuICBjYW5wbGF5OiAgICAgICAgICAgICdFdmVudCcsXG4gIGNhbnBsYXl0aHJvdWdoOiAgICAgJ0V2ZW50JyxcbiAgY2hhcmdpbmdjaGFuZ2U6ICAgICAnRXZlbnQnLFxuICBjaGFyZ2luZ3RpbWVjaGFuZ2U6ICdFdmVudCcsXG4gIGNoZWNraW5nOiAgICAgICAgICAgJ0V2ZW50JyxcbiAgY2xvc2U6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBkb3dubG9hZGluZzogICAgICAgICdFdmVudCcsXG4gIGR1cmF0aW9uY2hhbmdlOiAgICAgJ0V2ZW50JyxcbiAgZW1wdGllZDogICAgICAgICAgICAnRXZlbnQnLFxuICBlbmRlZDogICAgICAgICAgICAgICdFdmVudCcsXG4gIGZ1bGxzY3JlZW5jaGFuZ2U6ICAgJ0V2ZW50JyxcbiAgZnVsbHNjcmVlbmVycm9yOiAgICAnRXZlbnQnLFxuICBpbnB1dDogICAgICAgICAgICAgICdFdmVudCcsXG4gIGludmFsaWQ6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgbGV2ZWxjaGFuZ2U6ICAgICAgICAnRXZlbnQnLFxuICBsb2FkZWRkYXRhOiAgICAgICAgICdFdmVudCcsXG4gIGxvYWRlZG1ldGFkYXRhOiAgICAgJ0V2ZW50JyxcbiAgbm91cGRhdGU6ICAgICAgICAgICAnRXZlbnQnLFxuICBvYnNvbGV0ZTogICAgICAgICAgICdFdmVudCcsXG4gIG9mZmxpbmU6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgb25saW5lOiAgICAgICAgICAgICAnRXZlbnQnLFxuICBvcGVuOiAgICAgICAgICAgICAgICdFdmVudCcsXG4gIG9yaWVudGF0aW9uY2hhbmdlOiAgJ0V2ZW50JyxcbiAgcGF1c2U6ICAgICAgICAgICAgICAnRXZlbnQnLFxuICBwb2ludGVybG9ja2NoYW5nZTogICdFdmVudCcsXG4gIHBvaW50ZXJsb2NrZXJyb3I6ICAgJ0V2ZW50JyxcbiAgY29weTogICAgICAgICAgICAgICAnRXZlbnQnLFxuICBjdXQ6ICAgICAgICAgICAgICAgICdFdmVudCcsXG4gIHBhc3RlOiAgICAgICAgICAgICAgJ0V2ZW50JyxcbiAgcGxheTogICAgICAgICAgICAgICAnRXZlbnQnLFxuICBwbGF5aW5nOiAgICAgICAgICAgICdFdmVudCcsXG4gIHJhdGVjaGFuZ2U6ICAgICAgICAgJ0V2ZW50JyxcbiAgcmVhZHlzdGF0ZWNoYW5nZTogICAnRXZlbnQnLFxuICBzZWVrZWQ6ICAgICAgICAgICAgICdFdmVudCcsXG4gIHNlZWtpbmc6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgc3RhbGxlZDogICAgICAgICAgICAnRXZlbnQnLFxuICBzdWNjZXNzOiAgICAgICAgICAgICdFdmVudCcsXG4gIHN1c3BlbmQ6ICAgICAgICAgICAgJ0V2ZW50JyxcbiAgdGltZXVwZGF0ZTogICAgICAgICAnRXZlbnQnLFxuICB1cGRhdGVyZWFkeTogICAgICAgICdFdmVudCcsXG4gIHZpc2liaWxpdHljaGFuZ2U6ICAgJ0V2ZW50JyxcbiAgdm9sdW1lY2hhbmdlOiAgICAgICAnRXZlbnQnLFxuICB3YWl0aW5nOiAgICAgICAgICAgICdFdmVudCcsXG4gIGxvYWQ6ICAgICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICB1bmxvYWQ6ICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgcmVzaXplOiAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIHNjcm9sbDogICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBzZWxlY3Q6ICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJhZzogICAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyYWdlbnRlcjogICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnbGVhdmU6ICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJhZ292ZXI6ICAgICAgICAgICAnVUlFdmVudCcsXG4gIGRyYWdzdGFydDogICAgICAgICAgJ1VJRXZlbnQnLFxuICBkcmFnZW5kOiAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgZHJvcDogICAgICAgICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNoY2FuY2VsOiAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaGVuZDogICAgICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2hlbnRlcjogICAgICAgICAnVUlFdmVudCcsXG4gIHRvdWNobGVhdmU6ICAgICAgICAgJ1VJRXZlbnQnLFxuICB0b3VjaG1vdmU6ICAgICAgICAgICdVSUV2ZW50JyxcbiAgdG91Y2hzdGFydDogICAgICAgICAnVUlFdmVudCcsXG4gIGJsdXI6ICAgICAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBmb2N1czogICAgICAgICAgICAgICdVSUV2ZW50JyxcbiAgZm9jdXNpbjogICAgICAgICAgICAnVUlFdmVudCcsXG4gIGZvY3Vzb3V0OiAgICAgICAgICAgJ1VJRXZlbnQnLFxuICBzaG93OiAgICAgICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgY2xpY2s6ICAgICAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIGRibGNsaWNrOiAgICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZWVudGVyOiAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2VsZWF2ZTogICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlZG93bjogICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZXVwOiAgICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgbW91c2VvdmVyOiAgICAgICAgICAnTW91c2VFdmVudCcsXG4gIG1vdXNlbW92ZTogICAgICAgICAgJ01vdXNlRXZlbnQnLFxuICBtb3VzZW91dDogICAgICAgICAgICdNb3VzZUV2ZW50JyxcbiAgY29udGV4dG1lbnU6ICAgICAgICAnTW91c2VFdmVudCcsXG4gIHdoZWVsOiAgICAgICAgICAgICAgJ1doZWVsRXZlbnQnLFxuICBtZXNzYWdlOiAgICAgICAgICAgICdNZXNzYWdlRXZlbnQnLFxuICBzdG9yYWdlOiAgICAgICAgICAgICdTdG9yYWdlRXZlbnQnLFxuICB0aW1lb3V0OiAgICAgICAgICAgICdTdG9yYWdlRXZlbnQnLFxuICBrZXlkb3duOiAgICAgICAgICAgICdLZXlib2FyZEV2ZW50JyxcbiAga2V5cHJlc3M6ICAgICAgICAgICAnS2V5Ym9hcmRFdmVudCcsXG4gIGtleXVwOiAgICAgICAgICAgICAgJ0tleWJvYXJkRXZlbnQnLFxuICBwcm9ncmVzczogICAgICAgICAgICdQcm9ncmVzc0V2ZW50JyxcbiAgbG9hZGVuZDogICAgICAgICAgICAnUHJvZ3Jlc3NFdmVudCcsXG4gIGxvYWRzdGFydDogICAgICAgICAgJ1Byb2dyZXNzRXZlbnQnLFxuICBwb3BzdGF0ZTogICAgICAgICAgICdQb3BTdGF0ZUV2ZW50JyxcbiAgaGFzaGNoYW5nZTogICAgICAgICAnSGFzaENoYW5nZUV2ZW50JyxcbiAgdHJhbnNpdGlvbmVuZDogICAgICAnVHJhbnNpdGlvbkV2ZW50JyxcbiAgY29tcG9zaXRpb25lbmQ6ICAgICAnQ29tcG9zaXRpb25FdmVudCcsXG4gIGNvbXBvc2l0aW9uc3RhcnQ6ICAgJ0NvbXBvc2l0aW9uRXZlbnQnLFxuICBjb21wb3NpdGlvbnVwZGF0ZTogICdDb21wb3NpdGlvbkV2ZW50JyxcbiAgcGFnZWhpZGU6ICAgICAgICAgICAnUGFnZVRyYW5zaXRpb25FdmVudCcsXG4gIHBhZ2VzaG93OiAgICAgICAgICAgJ1BhZ2VUcmFuc2l0aW9uRXZlbnQnXG59O1xuXG4vKipcbiAqIE1hcCB0aGUgZXZlbnQgdHlwZSBjb25zdHJ1Y3RvciB0byB0aGUgaW5pdGlhbGl6YXRpb24gbWV0aG9kLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudEluaXQgPSB7XG4gIEV2ZW50OiAgICAgICAgICAgICAgICAgICdpbml0RXZlbnQnLFxuICBVSUV2ZW50OiAgICAgICAgICAgICAgICAnaW5pdFVJRXZlbnQnLFxuICBGb2N1c0V2ZW50OiAgICAgICAgICAgICAnaW5pdFVJRXZlbnQnLFxuICBNb3VzZUV2ZW50OiAgICAgICAgICAgICAnaW5pdE1vdXNlRXZlbnQnLFxuICBXaGVlbEV2ZW50OiAgICAgICAgICAgICAnaW5pdE1vdXNlRXZlbnQnLFxuICBNZXNzYWdlRXZlbnQ6ICAgICAgICAgICAnaW5pdE1lc3NhZ2VFdmVudCcsXG4gIFN0b3JhZ2VFdmVudDogICAgICAgICAgICdpbml0U3RvcmFnZUV2ZW50JyxcbiAgS2V5Ym9hcmRFdmVudDogICAgICAgICAgJ2luaXRLZXlib2FyZEV2ZW50JyxcbiAgUHJvZ3Jlc3NFdmVudDogICAgICAgICAgJ2luaXRFdmVudCcsXG4gIFBvcFN0YXRlRXZlbnQ6ICAgICAgICAgICdpbml0RXZlbnQnLFxuICBUcmFuc2l0aW9uRXZlbnQ6ICAgICAgICAnaW5pdEV2ZW50JyxcbiAgSGFzaENoYW5nZUV2ZW50OiAgICAgICAgJ2luaXRIYXNoQ2hhbmdlRXZlbnQnLFxuICBDb21wb3NpdGlvbkV2ZW50OiAgICAgICAnaW5pdENvbXBvc2l0aW9uRXZlbnQnLFxuICBEZXZpY2VNb3Rpb25FdmVudDogICAgICAnaW5pdERldmljZU1vdGlvbkV2ZW50JyxcbiAgUGFnZVRyYW5zaXRpb25FdmVudDogICAgJ2luaXRFdmVudCcsXG4gIERldmljZU9yaWVudGF0aW9uRXZlbnQ6ICdpbml0RGV2aWNlT3JpZW50YXRpb25FdmVudCdcbn07XG5cbi8qKlxuICogTWFwIHRoZSBvcHRpb25zIG9iamVjdCB0byBpbml0aWFsaXphdGlvbiBwYXJhbWV0ZXJzLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudFBhcmFtZXRlcnMgPSB7XG4gIGluaXRFdmVudDogW10sXG4gIGluaXRVSUV2ZW50OiBbXG4gICAgJ3ZpZXcnLFxuICAgICdkZXRhaWwnXG4gIF0sXG4gIGluaXRLZXlib2FyZEV2ZW50OiBbXG4gICAgJ3ZpZXcnLFxuICAgICdjaGFyJyxcbiAgICAna2V5JyxcbiAgICAnbG9jYXRpb24nLFxuICAgICdtb2RpZmllcnNMaXN0JyxcbiAgICAncmVwZWF0JyxcbiAgICAnbG9jYWxlJ1xuICBdLFxuICBpbml0S2V5RXZlbnQ6IFtcbiAgICAndmlldycsIFxuICAgICdjdHJsS2V5JywgXG4gICAgJ2FsdEtleScsIFxuICAgICdzaGlmdEtleScsIFxuICAgICdtZXRhS2V5JywgXG4gICAgJ2tleUNvZGUnLCBcbiAgICAnY2hhckNvZGUnXG4gIF0sXG4gIGluaXRNb3VzZUV2ZW50OiBbXG4gICAgJ3ZpZXcnLFxuICAgICdkZXRhaWwnLFxuICAgICdzY3JlZW5YJyxcbiAgICAnc2NyZWVuWScsXG4gICAgJ2NsaWVudFgnLFxuICAgICdjbGllbnRZJyxcbiAgICAnY3RybEtleScsXG4gICAgJ2FsdEtleScsXG4gICAgJ3NoaWZ0S2V5JyxcbiAgICAnbWV0YUtleScsXG4gICAgJ2J1dHRvbicsXG4gICAgJ3JlbGF0ZWRUYXJnZXQnXG4gIF0sXG4gIGluaXRIYXNoQ2hhbmdlRXZlbnQ6IFtcbiAgICAnb2xkVVJMJyxcbiAgICAnbmV3VVJMJ1xuICBdLFxuICBpbml0Q29tcG9zaXRpb25FdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnZGF0YScsXG4gICAgJ2xvY2FsZSdcbiAgXSxcbiAgaW5pdERldmljZU1vdGlvbkV2ZW50OiBbXG4gICAgJ2FjY2VsZXJhdGlvbicsXG4gICAgJ2FjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHknLFxuICAgICdyb3RhdGlvblJhdGUnLFxuICAgICdpbnRlcnZhbCdcbiAgXSxcbiAgaW5pdERldmljZU9yaWVudGF0aW9uRXZlbnQ6IFtcbiAgICAnYWxwaGEnLFxuICAgICdiZXRhJyxcbiAgICAnZ2FtbWEnLFxuICAgICdhYnNvbHV0ZSdcbiAgXSxcbiAgaW5pdE1lc3NhZ2VFdmVudDogW1xuICAgICdkYXRhJyxcbiAgICAnb3JpZ2luJyxcbiAgICAnbGFzdEV2ZW50SWQnLFxuICAgICdzb3VyY2UnXG4gIF0sXG4gIGluaXRTdG9yYWdlRXZlbnQ6IFtcbiAgICAna2V5JyxcbiAgICAnb2xkVmFsdWUnLFxuICAgICduZXdWYWx1ZScsXG4gICAgJ3VybCcsXG4gICAgJ3N0b3JhZ2VBcmVhJ1xuICBdXG59O1xuXG4vKipcbiAqIEV4cG9ydHMgdGhlIHNpbWlsYXRlIGZ1bmN0aW9uYWxpdHkuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtICB7U3RyaW5nfSAgdHlwZVxuICogQHBhcmFtICB7T2JqZWN0fSAgb3B0aW9uc1xuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCwgdHlwZSwgb3B0aW9ucykge1xuICAvLyBJbW1lZGlhdGVseSB0aHJvdyBhbiBlcnJvciB3aGVuIHRoZSBldmVudCBuYW1lIGRvZXMgbm90IHRyYW5zbGF0ZS5cbiAgaWYgKCFldmVudFR5cGVzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbnN1cHBvcnRlZCBldmVudCB0eXBlJyk7XG4gIH1cblxuICB2YXIgb3JpZ2luYWwgPSBvcHRpb25zO1xuICB2YXIgZXZlbnRUeXBlID0gZXZlbnRUeXBlc1t0eXBlXTtcbiAgdmFyIGluaXRFdmVudCA9IGV2ZW50SW5pdFtldmVudFR5cGVdO1xuICB2YXIgZXZlbnQ7XG5cbiAgLy8gRXh0ZW5kIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBkZWZhdWx0IGFuZCBwYXNzZWQgaW4gb3B0aW9ucy5cbiAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgYnViYmxlczogICAgdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlXG4gIH0sIHJlc3VsdChldmVudE9wdGlvbnMsIGV2ZW50VHlwZSwgZWxlbWVudCwgdHlwZSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuXG4gIC8vIFByZXNlcnZlIHRoZSBvcmlnaW5hbCBvciB1c2UgdGhlIG5ldyBvcHRpb25zIGlmIG5vbmUgd2VyZSBnaXZlbi5cbiAgaWYgKCFvcmlnaW5hbCkgb3JpZ2luYWwgPSBvcHRpb25zO1xuXG4gIC8vIEluIDwgSUU5LCB0aGUgYGNyZWF0ZUV2ZW50YCBmdW5jdGlvbiBpcyBub3QgYXZhaWxhYmxlIGFuZCB3ZSBoYXZlIHRvXG4gIC8vIHJlc29ydCB0byB1c2luZyBgZmlyZUV2ZW50YC5cbiAgaWYgKCFkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgIGV2ZW50ID0gZXh0ZW5kKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCksIG9wdGlvbnMpO1xuICAgIHJldHVybiBlbGVtZW50LmZpcmVFdmVudCgnb24nICsgdHlwZSwgZXZlbnQpO1xuICB9XG5cbiAgZXZlbnQgPSBleHRlbmQoZG9jdW1lbnQuY3JlYXRlRXZlbnQoZXZlbnRUeXBlKSwgb3B0aW9ucyk7XG5cbiAgLy8gSGFuZGxlIGRpZmZlcmVuY2VzIGJldHdlZW4gYGluaXRLZXlib2FyZEV2ZW50YCBhbmQgYGluaXRLZXlFdmVudGAuXG4gIGlmIChpbml0RXZlbnQgPT09ICdpbml0S2V5Ym9hcmRFdmVudCcpIHtcbiAgICBpZiAoZXZlbnRbaW5pdEV2ZW50XSA9PT0gdm9pZCAwKSB7XG4gICAgICBpbml0RXZlbnQgPSAnaW5pdEtleUV2ZW50JztcbiAgICB9IGVsc2UgaWYgKCEoJ21vZGlmaWVyc0xpc3QnIGluIG9wdGlvbnMpKSB7XG4gICAgICB2YXIgbW9kcyA9IFtdXG4gICAgICBpZiAob3B0aW9ucy5tZXRhS2V5KSBtb2RzLnB1c2goJ01ldGEnKTtcbiAgICAgIGlmIChvcHRpb25zLmFsdEtleSkgbW9kcy5wdXNoKCdBbHQnKTtcbiAgICAgIGlmIChvcHRpb25zLnNoaWZ0S2V5KSBtb2RzLnB1c2goJ1NoaWZ0Jyk7XG4gICAgICBpZiAob3B0aW9ucy5jdHJsS2V5KSBtb2RzLnB1c2goJ0NvbnRyb2wnKTtcbiAgICAgIG9wdGlvbnNbJ21vZGlmaWVyc0xpc3QnXSA9IG1vZHMuam9pbignICcpO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1hcCBhcmd1bWVudCBuYW1lcyB0byB0aGUgb3B0aW9uIHZhbHVlcy5cbiAgdmFyIGFyZ3MgPSBldmVudFBhcmFtZXRlcnNbaW5pdEV2ZW50XS5tYXAoZnVuY3Rpb24gKHBhcmFtZXRlcikge1xuICAgIHJldHVybiBvcHRpb25zW3BhcmFtZXRlcl07XG4gIH0pO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIGV2ZW50IHVzaW5nIHRoZSBidWlsdC1pbiBtZXRob2QuXG4gIGV2ZW50W2luaXRFdmVudF0uYXBwbHkoXG4gICAgZXZlbnQsIFt0eXBlLCBldmVudC5idWJibGVzLCBldmVudC5jYW5jZWxhYmxlXS5jb25jYXQoYXJncylcbiAgKTtcblxuICAvLyBXb3JrIGFyb3VuZCBsaW1pdGF0aW9ucyBpbiB0aGUga2V5Ym9hcmQgaW5pdGlhbGl6YXRpb24uXG4gIGlmIChldmVudFR5cGUgPT09ICdLZXlib2FyZEV2ZW50Jykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2tleUNvZGUnLCBcbiAgICAgIHsgdmFsdWU6IG9yaWdpbmFsWydrZXlDb2RlJ10gfHwgMCB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdrZXknLCBcbiAgICAgIHsgdmFsdWU6IG9yaWdpbmFsWydrZXknXSB8fCAnJyB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICd3aGljaCcsIFxuICAgICAgeyB2YWx1ZTogb3JpZ2luYWxbJ3doaWNoJ10gfHwgb3B0aW9uc1sna2V5Q29kZSddIHx8IDAgfSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG4iXX0=
(4)
});
