import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { formatSpec2Html } from './utils/spec-formatter'
import { not } from '@ember/object/computed';

export default Controller.extend({

  concept: null,

  paramsAreInvalid: not('paramsAreValid'),

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
  },

  resetParams(){
    this.set('concept', null);
    this.set('error', null);
  }
});
