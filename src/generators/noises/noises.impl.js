const { createImageData } = require('canvas');


/**
 * Creates a Perlin tab
 * @returns 
 */
function createPerlinTab() {
    let p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180 ];
    for (let x = 0; x < 256; x++) {
        p.push(p[x]);
    }
    return p;
}


/**
 * gradient function
 * @param {*} h 
 * @param {*} x 
 * @param {*} y 
 */
function gradient(h,x,y) {
    h = h%4;
    if(h === 0)
        return x+y;
    else if(h === 1)
        return -x+y;
    else if(h === 2)
        return x-y;
    return -x-y;
}

/**
 * interpolation function
 * @param {*} bl 
 * @param {*} br 
 * @param {*} tl 
 * @param {*} tr 
 * @param {*} x 
 * @param {*} y 
 * @param {*} f 
 */
function interpolation(bl,br,tl,tr,x,y,f) {
    return f(1-x)*f(y)*bl+f(x)*f(y)*br+f(1-x)*f(1-y)*tl+f(x)*f(1-y)*tr;
}

/**
 * smoothstep function
 * @param {*} x 
 */
function smoothstep(x) {
    return x*x*x*(6*x*x-15*x+10);
}

/**
 * perlinNoise function
 * @param {Object} args : p, color1 and color2 are used.
 */
function perlinNoise(args) {

    if(typeof args.p === undefined) { args.p = 10;}
    if(typeof args.color1 === undefined) { args.color1 = [0,0,0,255];}
    if(typeof args.color2 === undefined) { args.color2 = [255,255,255,255];}
    
    let image = createImageData(args.width, args.height);
    let t = createPerlinTab();
    let n = 0;
    for(let y = 0; y < args.height; y++) {
        for(let x = 0; x < args.width; x++, n+=4) {
            let xi = x/(args.width/args.p);
            let yi = y/(args.height/args.p);
            let x0 = Math.floor(xi)%256;
            let y0 = Math.floor(yi)%256;
            let xc = xi-Math.floor(xi);
            let yc = yi-Math.floor(yi);
            let tl = t[t[x0]+y0];
            let tr = t[t[x0+1]+y0];
            let bl = t[t[x0]+y0+1];
            let br = t[t[x0+1]+y0+1];
            let k = interpolation(gradient(bl,xc,yc-1), gradient(br,xc-1,yc-1), gradient(tl,xc,yc), gradient(tr,xc-1,yc), xc, yc, smoothstep);
            k=(k+1)/2;
            image.data[n] = args.color1[0] + k*(args.color2[0]-args.color1[0]);
            image.data[n+1] = args.color1[1] + k*(args.color2[1]-args.color1[1]);
            image.data[n+2] = args.color1[2] + k*(args.color2[2]-args.color1[2]);
            image.data[n+3] = 255;
        }
    }
    return image;
}



//! fractalNoise function
/*! fractalNoise
 *\param args: p, color1 and color2 are used.
*/
/**
 * fractalNoise function
 * @param {Object} args : p, color1 and color2 are used.
 */
function fractalNoise(args) {

    if(typeof args.p === undefined) { args.p = 10;}
    if(typeof args.color1 === undefined) { args.color1 = [0,0,0,255];}
    if(typeof args.color2 === undefined) { args.color2 = [255,255,255,255];}
    
    let image = createImageData(args.width, args.height);
    let t = createPerlinTab();
    let n = 0;

    for(let y = 0; y < args.height; y++) {
        for(let x = 0; x < args.width; x++, n+=4) {

            let freq = 2;
            let ampl = 0.5;
            let k = 0;

            for(let i = 0; i < args.p; i++) {
                let xi = x/(args.width/freq);
                let yi = y/(args.height/freq);
                let x0 = Math.floor(xi)%256;
                let y0 = Math.floor(yi)%256;
                let xc = xi-Math.floor(xi);
                let yc = yi-Math.floor(yi);
                let tl = t[t[x0]+y0];
                let tr = t[t[x0+1]+y0];
                let bl = t[t[x0]+y0+1];
                let br = t[t[x0+1]+y0+1];
                k += ampl*interpolation(gradient(bl,xc,yc-1), gradient(br,xc-1,yc-1), gradient(tl,xc,yc), gradient(tr,xc-1,yc), xc, yc, smoothstep);
                freq *= 2;
                ampl /= 2;
            }

            k=(k+1)/2;

            image.data[n] = args.color1[0] + k*(args.color2[0]-args.color1[0]);
            image.data[n+1] = args.color1[1] + k*(args.color2[1]-args.color1[1]);
            image.data[n+2] = args.color1[2] + k*(args.color2[2]-args.color1[2]);
            image.data[n+3] = 255;
        }
    }
    return image;
}





exports.perlinNoise = perlinNoise;
exports.fractalNoise = fractalNoise;
