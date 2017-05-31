'use strict';

require('mocha');
var Composer = require('composer');
var composerConfirm = require('./');
var composer;
var confirm;
var unmute;

describe('composer-confirm', function() {
  beforeEach(function() {
    composer = new Composer();
  });

  it('should call the "yes" callback', function(cb) {
    confirm = composerConfirm(composer, function(prompt) {
      unmute = prompt.mute();
      prompt.once('ask', function() {
        prompt.rl.emit('line', 'y');
      });
    });

    confirm('default', 'Want to run this?', [], function(next) {
      unmute();
      next(new Error('expected the first callback to be called'));
    });

    composer.build('default', cb);
  });

  it('should call the "no" callback', function(cb) {
    confirm = composerConfirm(composer, function(prompt) {
      unmute = prompt.mute();
      prompt.once('ask', function() {
        prompt.rl.emit('line', 'n');
      });
    });

    confirm('default', 'Want to run this?', function(next) {
      next(new Error('expected the first callback to be called'));
    }, []);

    composer.build('default', cb);
  });

  it('should work when a "no" callback is not given', function(cb) {
    confirm = composerConfirm(composer, function(prompt) {
      unmute = prompt.mute();
      prompt.once('ask', function() {
        prompt.rl.emit('line', 'n');
      });
    });

    confirm('default', 'Want to run this?', function(next) {
      next(new Error('expected the first callback to be called'));
    });

    composer.build('default', cb);
  });
});
