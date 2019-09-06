import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { computed } from '@ember/object';
import LoadableMixin from './mixins/loadable';
import { hash } from 'rsvp';

export default Route.extend(LoadableMixin, {

  specifyEndpoint: 'http://' + ENV.APP.specifierHost + '/specify/',

  request: computed(function(){
    const specifyEndpoint = this.specifyEndpoint + this.controller.concept;
    return fetch(specifyEndpoint);
  }),

  model() {
    if (!this.controller) {
      return null;
    }

    return this.request.then(response => {
      return hash({
          spec: response.clone().text(),
          blob: response.clone().blob()
        }
      )
    });
  }
});
