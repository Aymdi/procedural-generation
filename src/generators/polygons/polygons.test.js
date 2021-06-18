const Polygon = require("./polygons.impl.js");

let a = Polygon.point(1,3);
let b = Polygon.point(4,2);
let c = Polygon.point(0,6);
let T = [a, b, c];


test("point has entry x and y", () => {
    expect(Polygon.point(2,2)).toStrictEqual({x: 2, y: 2});
});


test("points which share coordinates are equal", () => {
    let i = Polygon.point(2,2), j = Polygon.point(2,2);
    expect(Polygon.pointsAreEqual(i, j)).toBe(true);
});


test("bounds returns the min and max of x and y coordinates from an array of points", () => {
    expect(Polygon.bounds(T)).toStrictEqual({topLeft: {x: 0, y: 2}, bottomRight: {x: 4, y: 6}});
});


test("translate alters an array of points accordingly", () => {
    let e = Polygon.point(3,1);
    let f = Polygon.point(6,0);
    let g = Polygon.point(2,4);
    let T2 = [e, f, g];
    let d = Polygon.point(-2, 2);
    Polygon.translate(T2, d);
    expect(T2).toStrictEqual(T);
});


let p = Polygon.polygon(T);

test("polygons are bounded correctly", () => {
    expect((Polygon.bounds(p.vertices))).toStrictEqual({topLeft: {x: 0, y: 0}, bottomRight: {x: p.height, y: p.width}});
});
