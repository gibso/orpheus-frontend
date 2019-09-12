import EmberObject from '@ember/object';
import {formatSpec2Html} from "../controllers/utils/spec-formatter";
import { computed } from '@ember/object';

export default EmberObject.extend({
  formattedSpecs: computed('genericSpace', 'blend', 'input1', 'input2', function () {
    const specs = this.getProperties('genericSpace', 'blend', 'input1', 'input2');
    Object.keys(specs).forEach(specKey =>
      specs[specKey] = formatSpec2Html(specs[specKey])
    );
    return specs
  })
});
