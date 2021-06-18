/////////////////////////////////////////////////////////// 
/*     A CommonJS module for 2D polygons and points
Points are dictionaries with two entries:
 - x is a number
 - y is a number
Polygons are dictionaries with three entries:
 - vertices is an array of points
 - width is a number
 - height is a number
ADDITIONAL INFO:
The x axis is vertical and oriented south
The y axis horizontal and oriented east
Polygons are anchored to the origin, meaning the top left corner of their bounding box is located at (0, 0)
*//////////////////////////////////////////////////////////


/**
 * returns a point with coordinates x and y.
 * @param {Number} x 
 * @param {Number} y 
 * @returns {Object} point
 */
function point(x, y) { return {x: x, y: y}; }

/**
 * a predicate telling if two points a and b have the same coordinates
 * @param {Object} a : the first point
 * @param {Object} b : the second point
 * @returns 
 */
function pointsAreEqual(a, b) { return (a.x === b.x && a.y === b.y); }

const origin = point(0, 0);


/**
 * two points describing an axis aligned box which bounds an array of points
 * @param {Array} A : array of points
 */
function bounds(A) {
    let min = {x: A[0].x, y: A[0].y};
    let max = {x: A[0].x, y: A[0].y};
    for (let i = 0; i < A.length; i++) {
        if (A[i].x < min.x)
            min.x = A[i].x;
        if (A[i].x > max.x)
            max.x = A[i].x;
        if (A[i].y < min.y)
            min.y = A[i].y;
        if (A[i].y > max.y)
            max.y = A[i].y;
    }
    return {topLeft: min, bottomRight: max};
}


/**
 * translate an array of points
 * @param {Object} A : array of points
 * @param {Object} d : point
 */
function translate(A, d) {
    for (let i = 0; i < A.length; i++) {
        A[i].x += d.x;
        A[i].y += d.y;
    }
}



/**
 * a polygon from an array of points
 * post-conditions: bounds(polygon(A).vertices).topLeft = {x: 0, y: 0}
 * @param {Array} A : array of points
 * @returns {Object} {vertices, width, height}
 */
function polygon(A) {
    let vertices = [];
    for (let i = 0; i < A.length; i++) {
        vertices[i] = point(A[i].x, A[i].y);
    }
    let d = bounds(vertices).topLeft;
    translate(vertices, {x: -d.x, y: -d.y});
    let dim = bounds(vertices).bottomRight;
    return {vertices: vertices, width: dim.y, height: dim.x};
}


/**
 * a predicate telling if a point is in a polygon
 * @param {Object} poly : {vertices, width, height}
 * @param {Object} a : {x, y}
 */
function pointIsIn(poly, a) {
    let isInside = false;

    if (a.x < 0 || a.x > poly.height || a.y < 0 || a.y > poly.width) {
        return false;
    }

    let v = poly.vertices;
    let i = 0, j = v.length - 1;
    for (i, j; i < v.length; j = i++) {
        if ( (v[i].y > a.y) !== (v[j].y > a.y) &&
                a.x < (v[j].x - v[i].x) * (a.y - v[i].y) / (v[j].y - v[i].y) + v[i].x ) {
            isInside = !isInside;
        }
    }

    return isInside;
}  
    
    




exports.point = point;
exports.pointsAreEqual = pointsAreEqual;
exports.bounds = bounds;
exports.translate = translate;
exports.polygon = polygon;
exports.pointIsIn = pointIsIn;
exports.origin = origin;
