////////// The convolution ker //////////

/**
 * convolutionKer 
 */
function convolutionKer(){
	return [-1,-1,-1,-1,8,-1,-1,-1,-1];
}

////////// Computing the new value of the current pixel //////////

/**
 * newValue
 * @param {*} ker 
 * @param {*} pixels 
 * @param {*} n 
 * @returns {*} {R,G,B,A}
 */
function newValue(ker,pixels,n){
	const m = Math.trunc(n/2)+n;
	let newVal = {R:0,G:0,B:0,A:pixels[m]};
	for (let i=0 ; i < n*n ; ++i){
		const R = pixels[i];
		const G = pixels[i+1];
		const B = pixels[i+2];
		newVal['R'] += ker[i]*R;
		newVal['G'] += ker[i]*G;
		newVal['B'] += ker[i]*B;
	}
	return newVal;
}

////////// Extracting the local pixels //////////

/**
 * extractPixels
 * @param {*} t 
 * @param {*} i 
 * @param {*} j 
 * @param {*} n 
 * @param {*} height 
 * @param {*} width  
 */
function extractPixels(t,i,j,n,height,width){
	let pixels = new Array();
    //console.log(n);
	for (let k=-n ; k < n ; ++k){
		for (let l=-n ; l < n ; ++l){
			const p = i+k;
			const q = j+l;
			if ( (p < 0) || (p >= width) || (q < 0) || (q >= height) ){
				const m = 4*(i*width+j);
				const newElement = t.slice(m,m+4);
				pixels.push(newElement);
			}

			else {
				const m = 4*(p*width + q);
				const newElement = t.slice(m,m+4);
				pixels.push(newElement);
			}
			//console.log(pixels.length);
		}
	}
	return pixels;  
}

////////// The main function //////////

/**
 * convolutionFilter
 * @param {Object} args 
 * @param {Array} imgs 
 */
function convolutionFilter(args,imgs){
	const t = imgs[0].data;
	//const width = args.width
	//const height = args.height
	let n = 0; // Index inside the image array
	const newImage = t.slice();
	const ker = convolutionKer();
	const dimKer = ker.length;
	for (let i = 0; i < args.height; i++) {
		for (let j = 0; j < args.width; j++, n += 4) {
			const pixels = extractPixels(t,i,j,Math.trunc(dimKer/2),args.height,args.width);
			const R = newValue(ker,pixels,dimKer).R;
			const G = newValue(ker,pixels,dimKer).G;
			const B = newValue(ker,pixels,dimKer).B;
			const A = newValue(ker,pixels,dimKer).A;
			newImage[n] = R;
			newImage[n+1] = G,
			newImage[n+2] = B,
			newImage[n+3] = A;
		}
	}
	return newImage;
}

exports.convolutionFilter = convolutionFilter;
