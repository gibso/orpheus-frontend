import ConceptSpecifierRoute from './concept-specifier';

export default ConceptSpecifierRoute.extend({
  request() {
    const endpoint = this.specifyEndpoint + 'input-spaces';
    const data = {
      'input-space-names': [
        this.controller.concept1,
        this.controller.concept2
      ]
    };
    return fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }
});
