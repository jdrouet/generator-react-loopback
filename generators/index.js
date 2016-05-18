const directoryActions = require('../actions/directory');
const questions = require('../questions');
const yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    this.prompt([
      questions.appname.apply(this),
      questions.serverport.apply(this)
    ], (answers) => {
      Object.assign(this, answers);
      done();
    });
  },
  dispatchServer: function() {
    this.composeWith('react-loopback:server', {
      options: {
        nested: true,
        appname: this.appname,
        serverport: this.serverport
      }
    }, {
      local: `${__dirname}/server`
    });
  },
  dispatchClient: function() {
    this.composeWith('react-loopback:client', {
      options: {
        nested: true,
        appname: this.appname,
        serverport: this.serverport
      }
    }, {
      local: `${__dirname}/client`
    });
  },
  end: function() {
    this.config.set('appname', this.appname);
    this.config.save();
  }
});
