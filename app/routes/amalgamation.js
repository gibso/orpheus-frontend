import Route from '@ember/routing/route';
import ENV from '../config/environment';
import LoadableMixin from './mixins/loadable';

export default Route.extend(LoadableMixin, {

  amalgamationEndpoint: 'http://' + ENV.APP.amalgamationHost + '/amalgamation',



  model() {
    if (!this.controller) {
      return null;
    }
    this.controller.set('isError', null);

    const { specFile, spaceName1, spaceName2 } = this.controller;
    const formData = new FormData();
    formData.append('file', specFile);
    formData.append('input-space-names', JSON.stringify([spaceName1, spaceName2]));
    return fetch(this.amalgamationEndpoint, {
      method: 'POST',
      body: formData
    })
      .catch(error => {
        this.controller.set('isError', true);
        return error.toString();
      })
      .then(response => {
        if (this.controller.isError) {
          return response;
        }
        if (response.status !== 200) {
          this.controller.set('isError', true);
          return response.text();
        }
        return response.json();
      })
  }
});
