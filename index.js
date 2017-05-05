'use strict';

var Enquirer = require('enquirer');

module.exports = function(composer, enquirer) {
  enquirer = enquirer || new Enquirer();
  enquirer.register('confirm', require('prompt-confirm'));

  return function(name, message, yes, no) {
    var key = name + '-';
    composer.task(key + 'yes', yes);
    composer.task(key + 'no', no);
    composer.task(name, function(cb) {
      enquirer.question(key, {message: message, type: 'confirm'});
      enquirer.ask(key)
        .then(function(answers) {
          composer.build(key + (answers[key] ? 'yes' : 'no'), cb);
        })
        .catch(cb);
    });
  };
};
