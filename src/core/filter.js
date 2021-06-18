

/*
 * Add two images (first image is overwritten)
 * args entries : width, height
 */
function add(args, imgs) {
    let img1 = imgs[0];
    let img2 = imgs[1];
    let n = 0;
    for (let x = 0; x < args.height; x++) {
	for (let y = 0; y < args.width; y++, n+= 4) {
            for (let i = 0; i < 4; i++) {
                img1.data[n+i] = Math.min(255, img1.data[n+i]+img2.data[n+i]);
            }
        }
    }
    return img1;
}


exports.add = add;
    
