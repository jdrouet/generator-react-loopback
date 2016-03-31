var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.composeWith('loopback');
  }
});
