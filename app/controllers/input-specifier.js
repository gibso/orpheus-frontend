import ConceptSpecifierController from './concept-specifier'
import { computed } from '@ember/object';

export default ConceptSpecifierController.extend({

  concept1: null,
  concept2: null,

  paramsAreValid: computed('concept1', 'concept2', function () {
    return !!this.concept1 && !!this.concept2;
  }),

  resetParams(){
    this.set('concept1', null);
    this.set('concept2', null);
    this.set('error', null);
  }
});
