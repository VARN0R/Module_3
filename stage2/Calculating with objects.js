class Numex {
  constructor(num) {
    this.num = num;
  }

  toString() {
    return "The number is " + this.num;
  }

  valueOf() {
    return { num: this.num };
  }

  [Symbol.toPrimitive](hint) {
    return +this.num;
  }
}

Num = Numex;
