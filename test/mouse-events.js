/* global describe, it, simulateEvent, sinon, expect */

describe('Mouse Events', function () {
  var fixture = document.createElement('div')
  document.body.appendChild(fixture)

  describe('click', function () {
    it('should trigger with the correct options', function () {
      var spy = sinon.spy()

      fixture.addEventListener('click', spy)
      simulateEvent.simulate(fixture, 'click', {
        clientX: 10, ctrlKey: true, button: 1
      })

      expect(spy).to.have.been.calledOnce

      var evt = spy.getCall(0).args[0]
      expect(evt.clientX).to.equal(10)
      expect(evt.ctrlKey).to.equal(true)
      expect(evt.button).to.equal(1)
      expect(evt.bubbles).to.equal(true)
      expect(evt.cancelable).to.equal(true)
    })

    it('should clone an existing event', function () {
      var spy = sinon.spy()

      fixture.addEventListener('click', spy)
      simulateEvent.simulate(fixture, 'click', {
        clientX: 10, ctrlKey: true, button: 1
      })

      expect(spy).to.have.been.calledOnce

      var evt = spy.getCall(0).args[0]

      simulateEvent.simulate(fixture, 'click', evt)

      var clone = spy.getCall(1).args[0]
      expect(clone.clientX).to.equal(10)
      expect(clone.ctrlKey).to.equal(true)
      expect(clone.button).to.equal(1)
    })

    it('should generate an event', function () {
      var evt = simulateEvent.generate('click', {
        clientX: 10, ctrlKey: true, button: 1
      })
      expect(evt.clientX).to.equal(10)
      expect(evt.ctrlKey).to.equal(true)
      expect(evt.button).to.equal(1)
      expect(evt.type).to.equal('click')
    })
  })

  describe('mousedown', function () {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener('mousedown', spy)
      simulateEvent.simulate(fixture, 'mousedown')

      expect(spy).to.have.been.calledOnce
      var evt = spy.getCall(0).args[0]
      expect(evt.bubbles).to.equal(true)
      expect(evt.cancelable).to.equal(true)
    })
  })

  describe('mouseup', function () {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener('mouseup', spy)
      simulateEvent.simulate(fixture, 'mouseup')

      expect(spy).to.have.been.calledOnce

      var evt = spy.getCall(0).args[0]
      expect(evt.bubbles).to.equal(true)
      expect(evt.cancelable).to.equal(true)
    })
  })

  describe('mouseenter', function () {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener('mouseenter', spy)
      simulateEvent.simulate(fixture, 'mouseenter')

      expect(spy).to.have.been.calledOnce
      var evt = spy.getCall(0).args[0]
      expect(evt.bubbles).to.equal(false)
      expect(evt.cancelable).to.equal(false)
    })
  })

  describe('mouseleave', function () {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener('mouseleave', spy)
      simulateEvent.simulate(fixture, 'mouseleave')

      expect(spy).to.have.been.calledOnce
      var evt = spy.getCall(0).args[0]
      expect(evt.bubbles).to.equal(false)
      expect(evt.cancelable).to.equal(false)
    })
  })

  describe('mouseover', function () {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener('mouseover', spy)
      simulateEvent.simulate(fixture, 'mouseover')

      expect(spy).to.have.been.calledOnce
      var evt = spy.getCall(0).args[0]
      expect(evt.bubbles).to.equal(true)
      expect(evt.cancelable).to.equal(true)
    })
  })

  describe('mousemove', function () {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener('mousemove', spy)
      simulateEvent.simulate(fixture, 'mousemove')

      expect(spy).to.have.been.calledOnce
      var evt = spy.getCall(0).args[0]
      expect(evt.bubbles).to.equal(true)
      expect(evt.cancelable).to.equal(true)
    })
  })

  describe('mouseout', function () {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener('mouseout', spy)
      simulateEvent.simulate(fixture, 'mouseout')

      expect(spy).to.have.been.calledOnce
      var evt = spy.getCall(0).args[0]
      expect(evt.bubbles).to.equal(true)
      expect(evt.cancelable).to.equal(true)
    })
  })

  describe('contextmenu', function () {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener('contextmenu', spy)
      simulateEvent.simulate(fixture, 'contextmenu')

      expect(spy).to.have.been.calledOnce
      var evt = spy.getCall(0).args[0]
      expect(evt.bubbles).to.equal(true)
      expect(evt.cancelable).to.equal(true)
    })
  })
})
