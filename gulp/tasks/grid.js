var smartgrid = require('smart-grid');
global.GRID = require('../config/gridConfig.js');
smartgrid('./source/style/mixins', GRID.settings);