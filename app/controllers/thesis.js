import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Controller.extend({
  thesis: computed('model', function () {
    let thesisHtml = this.model;
    thesisHtml = thesisHtml.replace(/src="/g, 'src="thesis/');
    thesisHtml = thesisHtml.replace(/data="/g, 'data="thesis/');
    const thesisDom = new DOMParser().parseFromString(thesisHtml, "text/html");
    return htmlSafe(thesisDom.body.innerHTML);
  })
});
