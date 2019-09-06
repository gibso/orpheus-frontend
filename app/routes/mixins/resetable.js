import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    willTransition(transition) {
      // if user is leaving this route
      if (transition.targetName !== this.routeName){
        this.controller.resetParams();
      }
    }
  }
});
