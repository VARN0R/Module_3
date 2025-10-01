function oddBall(arr) {
  const index = arr.findIndex((elem) => elem === "odd");

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === index) {
      return true;
    }
  }

  return false;
}
