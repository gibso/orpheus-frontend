import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { computed } from '@ember/object';

export default Route.extend({

  specifyEndpoint: 'http://' + ENV.APP.innovatorHost + '/specify/',

  request: computed(function(){
    const specifyEndpoint = this.specifyEndpoint + this.controller.concept;
    return fetch(specifyEndpoint);
  }),

  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor(this.routeName);
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });
    }
  },

  model(params) {
    if (!this.controller) {
      return null;
    }

    return new Promise(resolve => {
      const blobPromise = this.request.then(resp => resp.blob());
      blobPromise.then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          let spec = reader.result;
          spec = spec.replace(/\n/g, '<br>');
          spec = spec.replace(/ /g, '&nbsp;');
          resolve({
            downloadUrl: window.URL.createObjectURL(blob),
            htmlSpec: spec
          });
        };
        reader.readAsText(blob);
      })
    });
  }
});
