'use strict';

var Prompt = require('prompt-confirm');

module.exports = function(composer, fn) {
  return function(name, message, yes, no) {
    var key = name + '-';
    var prompt = new Prompt({name: key, message: message});
    if (typeof fn === 'function') {
      fn(prompt);
    }

    composer.task(key + 'yes', yes);
    composer.task(key + 'no', no || []);
    composer.task(name, function(cb) {
      prompt.ask(function(yes) {
        composer.build(key + (yes ? 'yes' : 'no'), cb);
      });
    });
  };
};
