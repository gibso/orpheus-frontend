import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { hash } from 'rsvp';

export default Route.extend({

  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor(this.routeName);
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });
    }
  },

  model({ concept }) {
    if (!concept) {
      return null;
    }

    const specifyEndpoint = 'http://' + ENV.APP.innovatorHost + '/specify/' + concept;
    const specRequest = fetch(specifyEndpoint).then(resp => resp.blob());
    const downloadUrl = specRequest.then(specBlob => window.URL.createObjectURL(specBlob));

    const spec = specRequest.then(specBlob => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(specBlob);
      })
    });

    const htmlSpec = spec.then(spec => spec.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;'))

    return hash({
      downloadUrl,
      htmlSpec
    });
  }
});
