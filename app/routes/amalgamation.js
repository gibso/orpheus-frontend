import Route from '@ember/routing/route';
import ENV from '../config/environment';

export default Route.extend({

  amalgamationEndpoint: 'http://' + ENV.APP.amalgamationHost + '/amalgamation',

  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor(this.routeName);
      controller.set('currentlyLoading', true);
      transition.promise.finally(function () {
        controller.set('currentlyLoading', false);
      });
    },
  },

  model(params) {
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
        return response.json().then(this.formatJson);
      })
  },

  formatJson(json) {
    ['genericSpace', 'blend', 'input1', 'input2'].forEach(specKey => {
      json[specKey] = encodeHtml(json[specKey]);
    });
    return json;

    function encodeHtml(spec) {
      return spec.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
    }
  },


});
