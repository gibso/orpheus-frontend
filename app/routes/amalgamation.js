import Route from '@ember/routing/route';
import ENV from '../config/environment';
import LoadableMixin from './mixins/loadable';
import ResetableMixin from './mixins/resetable';
import Blend from '../models/blend'

export default Route.extend(LoadableMixin, ResetableMixin, {

  amalgamationEndpoint: 'http://' + ENV.APP.amalgamationHost + '/amalgamation',

  actions: {

  },

  model() {
    if (!this.controller || this.controller.paramsAreInvalid) {
      return null;
    }
    this.controller.set('error', null);

    const { specFile, spaceName1, spaceName2 } = this.controller;
    const formData = new FormData();
    formData.append('file', specFile);
    formData.append('input-space-names', JSON.stringify([spaceName1, spaceName2]));
    return fetch(this.amalgamationEndpoint, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.status);
        }

        return response.json().then(blendListData => {
          return blendListData.map(blendData => Blend.create(blendData));
        });
      })
  }
});
