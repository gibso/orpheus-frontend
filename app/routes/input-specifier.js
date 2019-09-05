import ConceptSpecifierRoute from './concept-specifier';
import { hash } from 'rsvp';

export default ConceptSpecifierRoute.extend({

  validateParams({  concept1, concept2  }){
    return concept1 && concept2;
  },

  getRequest({ concept1, concept2 }){
    const specifyEndpoint = this.specifyEndpoint + 'input-spaces';
    const data = {'input-space-names': [concept1, concept2]};
    return fetch(specifyEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }
});
