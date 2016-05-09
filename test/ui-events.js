/* global describe, it, simulateEvent, sinon, expect, beforeEach, afterEach */

describe('UI Events', function () {
  var events = 'blur focus focusin focusout'.split(' ')
  var fixture

  beforeEach(function () {
    fixture = document.createElement('input')
    document.body.appendChild(fixture)
  })

  afterEach(function () {
    fixture.parentNode.removeChild(fixture)
    fixture = null
  })

  events.forEach(function (eventName) {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener(eventName, spy)
      simulateEvent.simulate(fixture, eventName)

      expect(spy).to.have.been.calledOnce

      var evt = simulateEvent.generate(eventName)
      expect(evt.type).to.equal(eventName)
    })
  })
})
