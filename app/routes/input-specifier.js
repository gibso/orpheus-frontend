import ConceptSpecifierRoute from './concept-specifier';
import { computed } from '@ember/object';

export default ConceptSpecifierRoute.extend({

  request: computed(function(){
    const specifyEndpoint = this.specifyEndpoint + 'input-spaces';
    const data = {
      'input-space-names': [
        this.controller.concept1,
        this.controller.concept2
      ]
    };
    return fetch(specifyEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  })
});
