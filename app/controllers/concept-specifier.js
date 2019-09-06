import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Controller.extend({

  concept: null,

  paramsAreValid: computed('concept', function(){
    return !!this.concept;
  }),

  actions: {
    refreshModel(){
      getOwner(this).lookup(`route:${this.target.currentRoute.name}`).refresh();
    }
  }
});
