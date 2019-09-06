import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { not, and } from '@ember/object/computed';
import { getOwner } from '@ember/application';

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

  actions: {
    receiveFiles(files){
      this.set('specFile', files[0]);
    },

    refreshModel(){
      getOwner(this).lookup(`route:${this.target.currentRoute.name}`).refresh();
    },

    closeError(){
      this.set('isError', null);
      this.set('model', null);
    }
  }
});
