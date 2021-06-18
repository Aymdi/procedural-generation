const fs = require('fs');
const { createCanvas } = require('canvas');
const { makeGen, makeFilter, makeTexture } = require('./core.js');
const { mono } = require('./generator.js');
const { add } = require('./filter.js');



const width = 350, height = 250;
let canvas = createCanvas(width, height);
let context = canvas.getContext('2d');



let monoRed = makeGen(mono);
let monoGreen = makeGen(mono,{'color': [0,255,0,127]});

let addRedGreen = makeFilter(add, [monoRed, monoGreen]);

let image = makeTexture(addRedGreen);


context.putImageData(image, 0, 0);
let buffer = canvas.toBuffer('image/png');
fs.writeFileSync('test.png', buffer);
