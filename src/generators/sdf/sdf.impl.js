const { createImageData } = require('canvas');



/**
 * Returns 1 if x is positive, 0 otherwise
 * @param {*} x 
 */
function sign(x) { 
    if(x === 0)
        return 1;
    else {
        return x/Math.abs(x);
    }
}




/**
 *  Returns an array T2 where T2[i] = k*T[i]
 * @param {Array} T 
 * @param {Number} k 
 * @returns 
 */
function tabMultiply(T,k) { 
    let T2 = new Array(T.length);
    for(let i = 0; i < T.length; i++) {
        T2[i] = T[i]*k;
    }
    return T2;
}



/**
 * Returns an image of a circle drawn with signed distance
 * @param {Object} args : width, height and r the radius of the circle are used.
 */
function sdCircle(args) {

    if(typeof args.r === undefined) { args.r = 80;}

    
    let image = createImageData(args.width, args.height);

    let w = args.width;
    let h = args.height;
    let n = 0;

    for(let y = 0; y < args.height; y++){

        for(let x = 0; x < args.width; x++, n+=4){

            let k = Math.sqrt((w/2-x)**2 + (h/2-y)**2) - (w+h)/8; //The signed distance of the point to the center of the image

            // Computation of the colors to show
            let c = [1-sign(k)*0.2,1-sign(k)*0.5,1-sign(k)*0.6];
            c = tabMultiply(c,1-Math.exp(-0.05*Math.abs(k)));
            c = tabMultiply(c,0.8+0.2*Math.cos(k/2));

            image.data[n] = c[0]*255;
            image.data[n+1] = c[1]*255;
            image.data[n+2] = c[2]*255;
            image.data[n+3] = 255;
        }
    }
    return image;
}




/**
 * Returns an image of a rectangle drawn with signed distance
 * @param {Object} args : width, height and p are used.
 */
function sdRectangle(args) {

    if(typeof args.p === undefined) { args.p = 5;}
    
    let image = createImageData(args.width, args.height);
    
    let w = args.width;
    let h = args.height;
    let n = 0;

    for(let y = 0; y < args.height; y++){

        for(let x = 0; x < args.width; x++, n+=4){

            let xc = x - w/2;  //The coordonates of the point in the system 
            let yc = y - h/2;  //centered at the center of the image

            let k = Math.max(w/h*Math.abs(yc),Math.abs(xc)) - (w+h)/8 ; // The signed distance of the point to the center of the image, corresponding to a rectangle

            // Computation of the colors to show
            let c = [1-sign(k)*0.2,1-sign(k)*0.5,1-sign(k)*0.6];
            c = tabMultiply(c,1-Math.exp(-0.05*Math.abs(k)));
            c = tabMultiply(c,0.8+0.2*Math.cos(k/2));

            image.data[n] = c[0]*255;
            image.data[n+1] = c[1]*255;
            image.data[n+2] = c[2]*255;
            image.data[n+3] = 255;
        }
    }
    return image;
}




/**
 * Returns an image of a star drawn with signed distance
 * @param {Object} args : width, height, p and r are used.
 * @returns 
 */
function sdStar(args) {

    if(typeof args.p === undefined) { args.p = 5;}
    if(typeof args.r === undefined) { args.r = 80;}

    
    let image = createImageData(args.width, args.height);

    let w = args.width;
    let h = args.height;
    let an = Math.PI/args.p; // The angle of a section
    let n = 0;

    for(let y = 0; y < args.height; y++){

        for(let x = 0; x < args.width; x++, n+=4){

            let xc = x - w/2; //The coordinates of the point in the system 
            let yc = y - h/2; //centered at the center of the image


            // Computation of the angle of the point in the system
            let a = sign(yc)*Math.PI/2;

            if(xc > 0) {
                a = Math.atan(yc/xc);
            }
            else if (xc < 0) {
                a = Math.atan(yc/xc) + Math.PI;
            }

            a += Math.PI/2;

            //Local angle in the corresponding section
            let ac = a%(2*an);

            
            let d = ((w+h)/8-args.r)*Math.abs(ac-an)/an+args.r;
            
            //Signed distance corresponding to a star
            let k = Math.cos(a-(Math.trunc(a/(2*an))*2*an+an))*Math.sqrt((w/2-x)**2 + (h/2-y)**2) - d;

                        
            // Computation of the colors to show
            let c = [1-sign(k)*0.2,1-sign(k)*0.5,1-sign(k)*0.6];
            c = tabMultiply(c,1-Math.exp(-0.05*Math.abs(k)));
            c = tabMultiply(c,0.8+0.2*Math.cos(k/2));
            
            image.data[n] = c[0]*255;
            image.data[n+1] = c[1]*255;
            image.data[n+2] = c[2]*255;
            image.data[n+3] = 255;
        }
    }
    return image;
}






exports.sdCircle = sdCircle;
exports.sdRectangle = sdRectangle;
exports.sdStar = sdStar;

