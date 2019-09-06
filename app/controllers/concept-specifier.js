import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { formatSpec2Html } from './utils/spec-formatter'

export default Controller.extend({

  concept: null,

  paramsAreValid: computed('concept', function () {
    return !!this.concept;
  }),

  spec: computed('model.spec', function () {
    return formatSpec2Html(this.model.spec)
  }),

  downloadUrl: computed('model.blob', function(){
    return window.URL.createObjectURL(this.model.blob);
  }),

  actions: {
    refreshModel() {
      getOwner(this).lookup(`route:${this.target.currentRoute.name}`).refresh();
    }
  }
});
