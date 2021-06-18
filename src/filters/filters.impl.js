/**
 * Add two images (first image is overwritten)
 * @param {Object} args : entries are width and height
 * @param {Array} imgs : list of images
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


/**
 * Subtract two images (first image is overwritten) 
 * @param {Object} args : entries are width and height
 * @param {Array} imgs : list of images
 */
function subtract(args, imgs){
    let n=0;
    for (let i=0;i<args.height;i++) {
        for(let j=0; j<args.width; j++, n+=4) {
            for (let k = 0; k < 4; i++) {
                imgs[0].data[n+k] = Math.max(0, imgs[0].data[n+k]-imgs[1].data[n+k]);
            }
        }
    }
    return imgs[0];
}


/**
 * Multiply two images (first image is overwritten) 
 * @param {Object} args : entries are width and height
 * @param {Array} imgs : list of images
 */
function multiply(args, imgs) {
    let n = 0;
    for (let i = 0; i < args.height; i++) {
        for(let j = 0; j < args.width; j++, n+=4) {
            for (let k=0; k<4; k++)
                imgs[0].data[n+k] *= imgs[1].data[n+k]/255;
        }
    }
    return imgs[0];
}


/**
 * Darken an image (the image is overwritten)
 * @param {Object} args : entries are width, height and p the degree of blackening between 0 and 1 (0.8 by default)
 * @param {Array} imgs : list of images
 */
function dark(args, imgs) {

    if(typeof args.p === undefined) { args.p = 0.8;}
    
    let n=0;
    for (let i = 0; i < args.height; i++) {
        for(let j = 0; j < args.width; j++, n+=4) {
            for (let k=0; k<4; k++){
                imgs[0].data[n+k] *= args.p;
            }
        }
    }
    return imgs[0];
}


/**
 * Divide an image (the image is overwritten) 
 * @param {Object} args : entries are width and height 
 * @param {Array} imgs : list of images
 */
function divide(args, imgs){
    let n=0;
    for (let i=0;i<args.height;i++) {
        for(let j=0;j<args.width;j++,n+=4) {
            for (let k=0; k<4; k++ ){
                imgs[0].data[n+k] = Math.min(Infinity, imgs[0].data[n+k] / imgs[1].data[n+k]);
            }
        }
    }
    return imgs[0];
}


/**
 * Increase the brightness of an image (the image is overwritten)
 * @param {Object} args : entries are width, height and p the degree of brightness (5 by default)
 * @param {Array} imgs : list of images
 */
function luminosity_up(args, imgs){

    if(typeof args.p === undefined) { args.p = 5;}

    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){
            for (let k=0; k<4; k++){
                imgs[0].data[n+k] = Math.min(255, imgs[0].data[n+k] + args.p);
            }
        }
    }
    return imgs[0];
}


/**
 * Decrease the brightness of an image (the image is overwritten)
 * @param {Object} args : entries are width, height and p the degree of dullness (5 by default)
 * @param {Array} imgs : list of images
 */
 function luminosity_down(args, imgs){
    
    if(typeof args.p === undefined) { args.p = 5;}

    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){
            for (let k=0; k<4; k++){
                imgs[0].data[n+k] = Math.max(0, imgs[0].data[n+k]-args.p);
            }
        }
    }
    return imgs[0];
}


/**
 * Increase the contrast of an image (the image is overwritten)
 * @param {Object} args : entries are width, height and p the degree of contrast (5 by default)
 * @param {Array} imgs : list of images
 */
function contrast_up(args, imgs){

    if(typeof args.p === undefined) { args.p = 5;}

    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++){
            for (let k=0; k<4; k++){
                if (imgs[0].data[n+k] < 127)
                    imgs[0].data[n+k] += Math.min(255,imgs[0].data[n+k] +args.p);
                else
                    imgs[0].data[n+k] -= Math.max(0,imgs[0].data[n+k]-args.p);
            }
        }
    }
    return imgs[0];
}



/**
 * Increase the contrast of an image (the image is overwritten)
 * @param {Object} args : entries are width, height and p the degree of contrast (5 by default)
 * @param {Array} imgs : list of images
 */
function contrast_down(args, imgs){

    if(typeof args.p === undefined) { args.p = 5;}

    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++){
            for (let i=0; i<4; i++){
                if (imgs[0].data[n+i] >= 127)
                    imgs[0].data[n+i] += Math.min(255,imgs[0].data[n+i] +args.p);
                else
                    imgs[0].data[n+i] -= Math.max(0,imgs[0].data[n+i]-args.p);
            }
        }
    }
    return imgs[0];
}


/**
 * Reverse the colors of an image (the image is overwritten)
 * @param {Object} args : entries are width and height
 * @param {Array} imgs : list of images
 */
function reverse(args, imgs){

    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){
            for (let k=0; k<3; k++){
                imgs[0].data[n+k] = 255-imgs[0].data[n+k];
            }
        }
    }
    return imgs[0];
}


/**
 * Converts a color image to grayscale (the image is overwritten)
 * @param {Object} args : entries are width and height
 * @param {Array} imgs : list of images
 */
function grayscale(args,imgs){
    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){
            let m = Math.trunc((imgs[0].data[n] + imgs[0].data[n+1] + imgs[0].data[n+2])/3);
            for (let k=0; k<4; k++){
                imgs[0].data[n+k] = m;
            }
        }
    }
    return imgs[0];
}


/**
 * Returns a blurry image (the image is overwritten)
 * @param {Object} args : entries are width and height
 * @param {Array} imgs : list of images
 */
function blurry(args,imgs){
    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){

            let m =0;

            if ((i===0) && (j===0))
                m = (imgs[0].data[n+4] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width+1)])/3;
            else if ((i===0) && (j === args.width-1))
                m = (imgs[0].data[n-4] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width-1)])/3;
            else if ((i === args.height-1) && (j === 0))
                m = (imgs[0].data[n+4] + imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width-1)])/3;
            else if ((i === args.height-1) && (j ===args.width-1))
                m = (imgs[0].data[n-4] + imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width+1)])/3;
            
            else if ((i%(args.height-1) !== 0) && (j === 0))
                m = (imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width-1)] + imgs[0].data[n+4] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width+1)])/5;
            else if ((i === 0) && (j%(args.width-1) !== 0))
                m = (imgs[0].data[n+4] + imgs[0].data[n+4*(args.width+1)] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width-1)] + imgs[0].data[n-4])/5;
            else if ((i === args.height-1) && (j%(args.width-1) !== 0))
                m = (imgs[0].data[n+4] + imgs[0].data[n-4*(args.width-1)] + imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width+1)] + imgs[0].data[n-4])/5;
            else if ((i%(args.height-1) !== 0) && (j === args.width-1))
                m = (imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width-1)] + imgs[0].data[n-4] + imgs[0].data[n-4*(args.width+1)] + imgs[0].data[n-4*args.width])/5;
            
            else
                m = (imgs[0].data[n+4] + imgs[0].data[n+4*(args.width+1)] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width-1)] + imgs[0].data[n-4] + imgs[0].data[n-4*(args.width+1)] + imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width-1)])/8;
            
            for (let k=0; k<4; k++){
            imgs[0].data[n+k] = m;
            }
        
        }
    }

    let a=0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, a += 4){
            if (a === 3)
                imgs[0].data[a] = 255;
        }
    }

    
    return imgs[0];
}

/**
 * Returns a blurry image (the image is overwritten)
 * @param {Object} args : entries are width, height and d the distance from the center where the filter is applicated
 * @param {Array} imgs : list of images
 */
function blurryGenerate(args,imgs){

    if(typeof args.d === undefined) { args.d = 0;}

    let middle_height = args.height/2;
    let middle_width = args.width/2;

    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){
            if ( (i-middle_height)**2 + (j-middle_width)**2 <= (args.d)**2 ){
                
                let m =0;

                if ((i===0) && (j===0))
                    m = (imgs[0].data[n+4] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width+1)])/3;
                else if ((i===0) && (j === args.width-1))
                    m = (imgs[0].data[n-4] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width-1)])/3;
                else if ((i === args.height-1) && (j === 0))
                    m = (imgs[0].data[n+4] + imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width-1)])/3;
                else if ((i === args.height-1) && (j ===args.width-1))
                    m = (imgs[0].data[n-4] + imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width+1)])/3;
            
                else if ((i%(args.height-1) !== 0) && (j === 0))
                    m = (imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width-1)] + imgs[0].data[n+4] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width+1)])/5;
                else if ((i === 0) && (j%(args.width-1) !== 0))
                    m = (imgs[0].data[n+4] + imgs[0].data[n+4*(args.width+1)] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width-1)] + imgs[0].data[n-4])/5;
                else if ((i === args.height-1) && (j%(args.width-1) !== 0))
                    m = (imgs[0].data[n+4] + imgs[0].data[n-4*(args.width-1)] + imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width+1)] + imgs[0].data[n-4])/5;
                else if ((i%(args.height-1) !== 0) && (j === args.width-1))
                    m = (imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width-1)] + imgs[0].data[n-4] + imgs[0].data[n-4*(args.width+1)] + imgs[0].data[n-4*args.width])/5;
            
                else
                    m = (imgs[0].data[n+4] + imgs[0].data[n+4*(args.width+1)] + imgs[0].data[n+4*args.width] + imgs[0].data[n+4*(args.width-1)] + imgs[0].data[n-4] + imgs[0].data[n-4*(args.width+1)] + imgs[0].data[n-4*args.width] + imgs[0].data[n-4*(args.width-1)])/8;
            
                for (let k=0; k<4; k++){
                    imgs[0].data[n+k] = m;
                }
            }
        }
    }

    return imgs[0];
}


/**
 * Translates to the right the space between j1 and j2 (the image is overwritten)
 * @param {Object} args : entries are width, height, j1 and j2 which are indexs of columns
 * @param {Array} imgs : list of images
 */
function translateRight(args,imgs){

    if(typeof args.j1 === undefined) { args.j1 = 0;}
    if(typeof args.j2 === undefined) { args.j2 = 0;}
    if(typeof args.backgroundColor === undefined) { args.backgroundColor = [255,255,255,255];}

    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){
            if ((j > args.j1) && (j <= args.j2)){ 
                for (let k=0; k<3; k++){
                    imgs[0].data[n+k] = imgs[1].data[n+k-4];
                }
            }
            else if (j < args.j1){
                for (let k=0; k<3; k++)
                    imgs[0].data[n+k] = args.backgroundColor[k];
            }
        }
    }

    return imgs[0];
}

/**
 * Translates to the left the space between j1 and j2 (the image is overwritten)
 * @param {Object} args : entries are width, height, j1 and j2 which are indexs of columns
 * @param {Array} imgs : list of images
 */
function translateLeft(args,imgs){

    if(typeof args.j1 === undefined) { args.j1 = 0;}
    if(typeof args.j2 === undefined) { args.j2 = 0;}
    if(typeof args.backgroundColor === undefined) { args.backgroundColor = [255,255,255,255];}

    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){
            if ((j > args.j1) && (j <= args.j2)){ 
                for (let k=0; k<3; k++){
                    imgs[0].data[n+k] = imgs[1].data[n+k+4];
                }
            }
            else if (j > args.j2){
                for (let k=0; k<3; k++)
                    imgs[0].data[n+k] = 255;
            }
        }
    }

    return imgs[0];
}

/**
 * Translates to the right the space between j1 and j2 with a Torus effect (the image is overwritten)
 * @param {Object} args : entries are width, height, j1 and j2 which are indexs of columns
 * @param {Array} imgs : list of images
 */
function translateTorusRight(args, imgs){

    if(typeof args.j1 === undefined) { args.d = 0;}  

    let origin = imgs[0];
    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){
            if (j  < args.d){
                for (let k=0; k<3; k++)
                    imgs[0].data[n+k] = origin.data[args.width-args.d+j+i*args.height+k];
            }
            else{
                for (let k=0; k<3; k++)
                    imgs[0].data[n+k] = origin.data[n+k-4*args.d];
            }
        }
    }
    return imgs[0];
}

/**
 * Translates to the left the space between j1 and j2 with a Torus effect (the image is overwritten)
 * @param {Object} args : entries are width, height, j1 and j2 which are indexs of columns
 * @param {Array} imgs : list of images
 */
function translateTorusLeft(args, imgs){

    if(typeof args.j1 === undefined) { args.d = 0;}  

    let origin = imgs[0];
    let n = 0;
    for (let i=0; i<args.height; i++){
        for (let j=0; j<args.width; j++, n += 4){
            if (j  > args.width - args.d){
                for (let k=0; k<3; k++)
                    imgs[0].data[n+k] = origin.data[j+i*args.height+k];
            }
            else{
                for (let k=0; k<3; k++)
                    imgs[0].data[n+k] = origin.data[n+k+4*args.d];
            }
        }
    }
    return imgs[0];
}


exports.divide = divide;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.dark = dark;
exports.luminosity_up = luminosity_up;
exports.luminosity_down = luminosity_down;
exports.contrast_up = contrast_up;
exports.contrast_down = contrast_down;
exports.reverse = reverse;
exports.grayscale = grayscale;
exports.blurry = blurry;
exports.blurryGenerate = blurryGenerate;
exports.translateRight = translateRight;
exports.translateLeft = translateLeft;
exports.translateTorusLeft = translateTorusLeft;
exports.translateTorusRight = translateTorusRight;
