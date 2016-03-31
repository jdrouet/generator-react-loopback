'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  setRoot: function() {
    if (this.appname !== path.basename(this.destinationRoot())) {
      var root = path.join(this.destinationRoot(), this.appname);
      if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
      }
      this.destinationRoot(root);
      this.log('Change working directory to %s', root);
    }
  }
};
