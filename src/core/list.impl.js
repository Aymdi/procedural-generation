// Functions on pointed pairs
function cons(_car, _cdr) { return { car: _car, cdr: _cdr }; }
const nil = {};
function car(cons)        { return cons['car']; }
function cdr(cons)        { return cons['cdr']; }

// Functions on lists
function head(l)    { return car(l); }
function tail(l)    { return cdr(l); }
function isEmpty(l) { return l === nil; }


exports.cons = cons;
exports.nil = nil;
exports.head = head;
exports.tail = tail;
exports.isEmpty = isEmpty;
