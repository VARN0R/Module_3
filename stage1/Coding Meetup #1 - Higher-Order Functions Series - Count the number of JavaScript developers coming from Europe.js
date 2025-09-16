function countDevelopers(list) {
  return list.filter(
    (dev) => dev.continent === "Europe" && dev.language === "JavaScript"
  ).length;
}
