
// Functions on trees
function node(_val, _children) { return { val: _val, children: _children }; }
function val(tree)      { return tree['val']; }
function children(tree) { return tree['children']; }


exports.node = node;
exports.val = val;
exports.children = children;

