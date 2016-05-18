const directoryActions = require('../actions/directory');
const questions = require('../questions');
const yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    this.prompt([
      questions.appname.apply(this)
    ], (answers) => {
      Object.assign(this, answers);
      done();
    });
  },
  writing: function() {
    directoryActions.setRoot.apply(this);
    this.fs.copyTpl(
      this.templatePath('package.ejs.json'),
      this.destinationPath('package.json'),
      this
    );
  },
  dispatch: function() {
    this.composeWith('react-loopback:client', {
      options: {
        nested: true,
        appname: this.appname
      }
    }, {
      local: `${__dirname}/client`
    });
    this.composeWith('react-loopback:server', {
      options: {
        nested: true,
        appname: this.appname
      }
    }, {
      local: `${__dirname}/server`
    });
  },
  end: function() {
    this.config.set('appname', this.appname);
    this.config.save();
  }
});
