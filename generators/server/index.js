var yeoman = require('yeoman-generator');
var loopback = require('generator-loopback');

module.exports = loopback.extend({
  constructor: function() {
    loopback.apply(this, arguments);
  },
  beforePrompting: function() {
    this.injectWorkspaceCopyRecursive();
  },
  prompting: function() {
    var prompts = [];
    if (this.options.nested && this.options.appname) {
      prompts.push(questions.appname.apply(this));
    }
    if (this.options.nested && this.options.serverport) {
      prompts.push(questions.serverport.apply(this));
    }
    var done = this.async();
    this.prompt(prompts, function(answers) {
      Object.assign(this, answers);
      done();
    });
  },
  afterPrompting: function() {
    this.wsTemplate = 'api-server';
    this.initWorkspace();
    this.detectExistingProject();
    this.project();
  }
});
