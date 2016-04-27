/* global describe, it, simulateEvent, sinon, expect */

describe('Mouse Events', function () {
  var fixture = document.createElement('div');
  document.body.appendChild(fixture);

  describe('click', function () {
    it('should trigger with the correct options', function () {
      var spy = sinon.spy();

      fixture.addEventListener('click', spy);
      simulateEvent(fixture, 'click', 
        { clientX: 10, ctrlKey: true, button: 1} );

      expect(spy).to.have.been.calledOnce;

      var evt = spy.getCall(0).args[0];
      expect(evt.clientX).to.equal(10);
      expect(evt.ctrlKey).to.equal(true);
      expect(evt.button).to.equal(1);
    });
  });

  describe('mousedown', function () {
    it('should trigger', function () {
      var spy = sinon.spy();

      fixture.addEventListener('mousedown', spy);
      simulateEvent(fixture, 'mousedown');

      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('mouseup', function () {
    it('should trigger', function () {
      var spy = sinon.spy();

      fixture.addEventListener('mouseup', spy);
      simulateEvent(fixture, 'mouseup');

      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('mouseenter', function () {
    it('should trigger', function () {
      var spy = sinon.spy();

      fixture.addEventListener('mouseenter', spy);
      simulateEvent(fixture, 'mouseenter');

      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('mouseleave', function () {
    it('should trigger', function () {
      var spy = sinon.spy();

      fixture.addEventListener('mouseleave', spy);
      simulateEvent(fixture, 'mouseleave');

      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('mouseover', function () {
    it('should trigger', function () {
      var spy = sinon.spy();

      fixture.addEventListener('mouseover', spy);
      simulateEvent(fixture, 'mouseover');

      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('mousemove', function () {
    it('should trigger', function () {
      var spy = sinon.spy();

      fixture.addEventListener('mousemove', spy);
      simulateEvent(fixture, 'mousemove');

      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('mouseout', function () {
    it('should trigger', function () {
      var spy = sinon.spy();

      fixture.addEventListener('mouseout', spy);
      simulateEvent(fixture, 'mouseout');

      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('contextmenu', function () {
    it('should trigger', function () {
      var spy = sinon.spy();

      fixture.addEventListener('contextmenu', spy);
      simulateEvent(fixture, 'contextmenu');

      expect(spy).to.have.been.calledOnce;
    });
  });
});
