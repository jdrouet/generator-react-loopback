var yeoman = require('yeoman-generator');
var loopback = require('generator-loopback');
var questions = require('../../questions');
var directoryActions = require('../../actions/directory');

module.exports = loopback.extend({
  constructor: function() {
    loopback.apply(this, arguments);
  },
  changeRoot: function() {
    return directoryActions.setRoot.apply(this);
  },
  injectWorkspaceCopyRecursiveChild: function() {
    return this.injectWorkspaceCopyRecursive();
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
    this.prompt(prompts, (answers) => {
      Object.assign(this, answers);
      done();
    });
  },
  setTemplate: function() {
    this.wsTemplate = 'api-server';
  },
  initWorkspaceChild: function() {
    this.log('init workspace');
    this.initWorkspace();
  },
  detectExistingProjectChild: function() {
    this.log('detect existing');
    this.detectExistingProject();
  },
  installDevDependencies: function() {
    this.npmInstall([
        'nodemon'
    ], {saveDev: true});
  },
  projectChild: function() {
    this.log('project');
    this.project();
  },
  updatePackageScripts: function() {
    this.log('Update package scripts');
    var info = this.fs.readJSON(this.destinationPath('package.json'));
    info.scripts['server:watch'] = 'nodemon server/server.js';
    this.fs.writeJSON(this.destinationPath('package.json'), info);
  }
});
