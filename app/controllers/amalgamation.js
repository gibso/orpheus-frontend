import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { not, and } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import { htmlSafe } from '@ember/string';
import { formatSpec2Html } from './utils/spec-formatter'

export default Controller.extend({

  specFile: null,
  spaceName1: null,
  spaceName2: null,
  isError: null,

  notError: not('isError'),
  isSuccess: and('notError', 'model'),
  paramsAreInvalid: not('paramsAreValid'),

  paramsAreValid: computed('specFile', 'spaceName1', 'spaceName2', function(){
    return !!this.specFile && !!this.spaceName1 && !!this.spaceName2;
  }),

  specs: computed('model', function () {
    if (!this.isSuccess){
      return;
    }
    let { genericSpace, blend, input1, input2 } = this.model;
    const specs = { genericSpace, blend, input1, input2 };
    Object.keys(specs).forEach(specKey =>
      specs[specKey] = formatSpec2Html(specs[specKey])
    );
    return specs
  }),

  actions: {
    receiveFiles(files){
      this.set('specFile', files[0]);
    },

    refreshModel(){
      getOwner(this).lookup(`route:${this.target.currentRoute.name}`).refresh();
    }
  }
});
