function isSameLanguage(list) {
  if (list.length === 0) {
    return true;
  }

  const lang = list[0].language;
  return list.every((dev) => dev.language === lang);
}
