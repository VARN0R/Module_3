function numberFunc(n) {
  return function (op) {
    return op ? op(n) : n;
  };
}

function zero(op) {
  return numberFunc(0)(op);
}
function one(op) {
  return numberFunc(1)(op);
}
function two(op) {
  return numberFunc(2)(op);
}
function three(op) {
  return numberFunc(3)(op);
}
function four(op) {
  return numberFunc(4)(op);
}
function five(op) {
  return numberFunc(5)(op);
}
function six(op) {
  return numberFunc(6)(op);
}
function seven(op) {
  return numberFunc(7)(op);
}
function eight(op) {
  return numberFunc(8)(op);
}
function nine(op) {
  return numberFunc(9)(op);
}

function plus(r) {
  return function (l) {
    return l + r;
  };
}
function minus(r) {
  return function (l) {
    return l - r;
  };
}
function times(r) {
  return function (l) {
    return l * r;
  };
}
function dividedBy(r) {
  return function (l) {
    return Math.floor(l / r);
  };
}
