const d3 = require('d3');
const gauge = require('./gauge');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(``, { includeNodeLocations: true });
const document = dom.window.document;