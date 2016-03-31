'use strict';
var fs = require('fs');
var path = require('path');
var questions = require('../../questions');
var directoryActions = require('../../actions/directory');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    var prompts = [];
    if (!this.options.appname) {
      prompts.push(questions.appname.apply(this));
    }
    if (!this.options.serverport) {
      prompts.push(questions.serverport.apply(this));
    }
    this.prompt(prompts, (answers) => {
      Object.assign(this, {
        appname: this.options.appname,
        serverport: this.options.serverport
      }, answers);
      done();
    });
  },
  writing: function() {
    /* Configure root directory */
    directoryActions.setRoot.apply(this);
    this.npmInstall([
        'babel-cli',
        'babel-core',
        'babel-loader',
        'babel-preset-es2015',
        'babel-preset-react',
        'counterpart',
        'json-loader',
        'material-ui',
        'react',
        'react-dom',
        'react-redux',
        'react-router',
        'react-router-redux',
        'react-tap-event-plugin',
        'redux',
        'redux-logger',
        'redux-thunk',
        'webpack'
    ], {save: true});
    this.npmInstall([
        'webpack-notifier',
        'webpack-dev-server'
    ], {saveDev: true});
    [
      'source/components/root/index.jsx',
      'source/containers/home-view/index.jsx',
      'source/reducers/language.js',
      'source/reducers/index.js',
      'source/locales/locale-en.json',
      'source/locales/locale-fr.json',
      'source/store.js',
      'build/main.css',
    ].forEach((item) => {
      this.fs.copy(
        this.templatePath(item),
        this.destinationPath(`client/${item}`)
      );
    });
    [
      'webpack.config.prod.ejs.js',
      'webpack.config.dev.ejs.js',
      'source/main.ejs.jsx',
      'build/index.ejs.html',
    ].forEach((item) => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(`client/${item.replace('.ejs','')}`),
        this
      );
    });
  },
  end: function() {
    this.config.set('appname', this.appname);
    this.config.set('serverport', this.serverport);
    this.config.save();
  }
});
