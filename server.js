#!/usr/bin/env node

var budo = require('budo');

budo('./index.js', {
  serve: 'bundle.js',
  live: true,
  host: '127.0.0.1',
  port: 8880,
  wg: '**/*.{html,css,js,json}',
  stream: process.stdout,
  browserify: {
    transform: []
  }
})
