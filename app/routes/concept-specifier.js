import Route from '@ember/routing/route';
import ENV from '../config/environment';
import LoadableMixin from './mixins/loadable';
import ResetableMixin from './mixins/resetable';

export default Route.extend(LoadableMixin, ResetableMixin, {

  specifyEndpoint: 'http://' + ENV.APP.specifierHost + '/specify/',

  request() {
    const endpoint = this.specifyEndpoint + 'concept';
    return fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ 'concept-name': this.controller.concept }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  },

  model() {
    if (!this.controller || this.controller.paramsAreInvalid) {
      return null;
    }
    this.controller.set('error', null);

    return this.request().then(response =>
      response.clone().blob().then(blob =>
        response.clone().text().then(spec => {
          return {spec, blob}
        })
      )
    );
  }
});
