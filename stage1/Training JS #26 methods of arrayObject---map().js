function isolateIt(arr) {
  return arr.map((str) => {
    const len = str.length;
    const mid = Math.floor(len / 2);

    if (len % 2 === 0) {
      return str.slice(0, mid) + "|" + str.slice(mid);
    } else {
      return str.slice(0, mid) + "|" + str.slice(mid + 1);
    }
  });
}
