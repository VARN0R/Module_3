function countAnimals(animals, count) {
  return count.map((animal) => {
    const regex = new RegExp(animal, "g");
    const matches = animals.match(regex);
    return matches ? matches.length : 0;
  });
}
