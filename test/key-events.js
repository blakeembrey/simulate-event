/* global describe, it, simulateEvent, sinon, expect */

describe('Key Events', function () {
  var fixture = document.createElement('div')
  document.body.appendChild(fixture)

  describe('keydown', function () {
    it('should trigger with the correct options', function () {
      var spy = sinon.spy()

      fixture.addEventListener('keydown', spy)

      simulateEvent(fixture, 'keydown',
        { keyCode: 27, key: 'A', altKey: true })

      expect(spy).to.have.been.calledOnce

      var evt = spy.getCall(0).args[0]
      expect(evt.keyCode).to.equal(27)
      expect(evt.key).to.equal('A')
      expect(evt.altKey).to.equal(true)
    })

    it('should clone an existing event', function () {
      var spy = sinon.spy()

      fixture.addEventListener('keydown', spy)

      simulateEvent(fixture, 'keydown',
        { keyCode: 27, key: 'A', altKey: true })

      expect(spy).to.have.been.calledOnce

      var evt = spy.getCall(0).args[0]

      simulateEvent(fixture, 'keydown', evt)

      var clone = spy.getCall(1).args[0]
      expect(clone.keyCode).to.equal(27)
      expect(clone.key).to.equal('A')
      expect(clone.altKey).to.equal(true)
    })
  })

  describe('keyup', function () {
    it('should trigger', function () {
      var spy = sinon.spy()

      fixture.addEventListener('keyup', spy)

      simulateEvent(fixture, 'keyup')

      expect(spy).to.have.been.calledOnce
    })
  })
})
