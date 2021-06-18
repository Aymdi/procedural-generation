const fs = require('fs');
const { createCanvas, createImageData } = require('canvas');


const width = 350, height = 250;
let canvas = createCanvas(width, height);
let context = canvas.getContext('2d');

let image = createImageData(350,250);

context.putImageData(image, 0, 0);
let buffer = canvas.toBuffer('image/png');
fs.writeFileSync('test.png', buffer);
