const config = {
  appname: function() {
    return {
      type: 'input',
      name: 'appname',
      message: 'What is your project name ?',
      default: this.appname
    }
  },
  serverport: function() {
    return {
      type: 'input',
      name: 'serverport',
      message: 'What is your server listening port ?',
      default: this.serverport
    }
  }
};

module.exports = config;
