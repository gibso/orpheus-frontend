import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('thesis');
  this.route('concept-specifier');
  this.route('input-specifier');
  this.route('amalgamation');
});

export default Router;
