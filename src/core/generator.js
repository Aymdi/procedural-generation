const { createImageData } = require('canvas');


/*
 * A single color image
 * args entries : width, height, color
 */
function mono(args) {
    if (typeof args.color === 'undefined') { args.color = [255,0,0,255]; }

    let image = createImageData(args.width, args.height);
    let n = 0;
    for (let x = 0; x < args.height; x++) {
	for (let y = 0; y < args.width; y++, n+= 4) {
            for (let i = 0; i < 4; i++) {
                image.data[n+i] = args.color[i];
            }
        }
    }
    return image;
}


exports.mono = mono;
