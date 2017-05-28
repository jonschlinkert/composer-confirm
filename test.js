'use strict';

require('mocha');
var Enquirer = require('enquirer');
var Composer = require('composer');
var composerConfirm = require('./');
var composer;
var enquirer;
var confirm;

function answer(enquirer, val) {
  enquirer.on('prompt', function(def, q, a, prompt) {
    setImmediate(function() {
      prompt.rl.write(val);
    });
  });
}

describe('composer-confirm', function() {
  beforeEach(function() {
    composer = new Composer();
    enquirer = new Enquirer();
    confirm = composerConfirm(composer, enquirer);
  });

  it('should call the "yes" callback', function(cb) {
    answer(enquirer, 'y\n');
    confirm('default', 'Want to run this?', [], function(next) {
      next(new Error('expected the first callback to be called'));
    });

    composer.build('default', cb);
  });

  it('should call the "no" callback', function(cb) {
    answer(enquirer, 'n\n');
    confirm('default', 'Want to run this?', function(next) {
      next(new Error('expected the first callback to be called'));
    }, []);

    composer.build('default', cb);
  });

  it('should work when a "no" callback is not given', function(cb) {
    answer(enquirer, 'n\n');
    confirm('default', 'Want to run this?', function(next) {
      next(new Error('expected the first callback to be called'));
    });

    composer.build('default', cb);
  });
});
