import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { hash } from 'rsvp';

export default Route.extend({

  specifyEndpoint: 'http://' + ENV.APP.innovatorHost + '/specify/',

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

    if (!this.validateParams(params)) {
      return null;
    }

    return new Promise(resolve => {
      const request = this.getRequest(params);
      const blobPromise = request.then(resp => resp.blob());
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
  },

  validateParams({ concept }){
    return concept;
  },

  getRequest({ concept }){
    const specifyEndpoint = this.specifyEndpoint + concept;
    return fetch(specifyEndpoint);
  }
});
