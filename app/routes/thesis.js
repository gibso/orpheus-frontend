import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  ajax: service(),

  model() {
    return this.ajax.request('thesis/thesis.html', { dataType: 'html' })
      .then(thesisHtml => {
        thesisHtml = thesisHtml.replace(/src="/g, 'src="thesis/');
        thesisHtml = thesisHtml.replace(/data="/g, 'data="thesis/');
        return new DOMParser().parseFromString(thesisHtml, "text/html");
      });
  }
});
