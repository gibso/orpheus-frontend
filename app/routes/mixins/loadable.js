import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    loading(transition) {
      let controller = this.controllerFor(this.routeName);
      controller.set('currentlyLoading', true);
      transition.promise.finally(function () {
        controller.set('currentlyLoading', false);
      });
    },
  }
});
