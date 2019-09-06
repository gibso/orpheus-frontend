import ConceptSpecifierController from './concept-specifier'
import { computed } from '@ember/object';
import { formatSpec2Html } from "./utils/spec-formatter";

export default ConceptSpecifierController.extend({

  concept1: null,
  concept2: null,

  spec: computed('model', function () {
    return formatSpec2Html(this.model.spec)
  }),

  paramsAreValid: computed('concept1', 'concept2', function () {
    return !!this.concept1 && !!this.concept2;
  }),
});
