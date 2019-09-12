import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    loading(transition) {
      this.controller.set('currentlyLoading', true);
      transition.promise.finally(() => {
        this.controller.set('currentlyLoading', false);
      });
    },

    error(error) {
      this.controller.set('error', error);
    }
  }
});
