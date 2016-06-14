/* global describe, it, simulateEvent, sinon, expect, beforeEach, afterEach */

describe('Events', function () {
  var eventNames = 'abort change open storage loadend popstate transitionend '
  eventNames += 'pagehide'
  var events = eventNames.split(' ')
  var fixture

  beforeEach(function () {
    fixture = document.createElement('div')
    document.body.appendChild(fixture)
  })

  afterEach(function () {
    fixture.parentNode.removeChild(fixture)
    fixture = null
  })

  events.forEach(function (eventName) {
    it('should trigger ' + eventName, function () {
      var spy = sinon.spy()

      fixture.addEventListener(eventName, spy)
      simulateEvent.simulate(fixture, eventName)

      expect(spy).to.have.been.calledOnce

      var evt = simulateEvent.generate(eventName)
      expect(evt.type).to.equal(eventName)
    })
  })
})
