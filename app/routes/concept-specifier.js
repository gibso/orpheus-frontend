import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { computed } from '@ember/object';
import LoadableMixin from './mixins/loadable';

export default Route.extend(LoadableMixin, {

  specifyEndpoint: 'http://' + ENV.APP.innovatorHost + '/specify/',

  request: computed(function(){
    const specifyEndpoint = this.specifyEndpoint + this.controller.concept;
    return fetch(specifyEndpoint);
  }),

  model(params) {
    if (!this.controller) {
      return null;
    }

    return new Promise(resolve => {
      const blobPromise = this.request.then(resp => {
        return resp.blob()
      });
      blobPromise.then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            downloadUrl: window.URL.createObjectURL(blob),
            spec: reader.result
          });
        };
        reader.readAsText(blob);
      })
    });
  }
});
