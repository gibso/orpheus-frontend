import Mixin from '@ember/object/mixin';
import { not, and } from '@ember/object/computed';

export default Mixin.create({
  notError: not('error'),
  notLoading: not('currentlyLoading'),
  isSuccess: and('notError', 'model', 'notLoading'),
});
