const List = require('./list.impl.js');
const Tree = require('./tree.impl.js');

/*
 * Textures are trees that contain filter and and generator nodes.
 * The first child of a node (either a filter or a generator) is a dictionary which contains the arguments for that node.
 * Generator nodes only have one child - their args dictionary.
 * Filter nodes have two: their args dictionary, and an array of generator nodes that they take as arguments to produce a new image.
 */


// a texture whose root is a generator function
function genNode(gen, args={}) {
    return Tree.node(gen, List.cons(args, List.nil));
}

// a texture whose root is a filter function
function filtNode(filter, genNodes, args={}) {
    return Tree.node(filter, List.cons(args, List.cons(genNodes, List.nil)));
}

// compute a texture, going bottom-up
function makeTexture(texture, width=100, height=100) {
    let l = Tree.children(texture);
    if (List.isEmpty(List.tail(l))) { // case: texture is a generator
	let gen = Tree.val(texture);
	let args = List.head(l);
	args.width = width;
	args.height = height;
	return gen(args);
    } else { // case: texture is a filter
	let filter = Tree.val(texture);
	let args = List.head(l);
	args.width = width;
	args.height = height;
	let genNodes = List.head(List.tail(l));
	let sourceImgs = [];
	for (let i = 0; i < genNodes.length; i++) {
            sourceImgs[i] = makeTexture(genNodes[i], width, height);
	}
	return filter(args, sourceImgs);
    }
}


exports.makeGen = genNode;
exports.makeFilter = filtNode;
exports.makeTexture = makeTexture;
