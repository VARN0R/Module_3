function findAllJavascriptFiles(folder, callback) {
  const result = [];

  folder.size((len) => {
    if (len === 0) {
      return callback(result);
    }

    let count = 0;

    for (let i = 0; i < len; i++) {
      folder.read(i, (item) => {
        if (typeof item === "string") {
          if (item.endsWith(".js")) {
            result.push(item);
          }

          count++;

          if (count === len) {
            callback(result);
          }
        } else {
          findAllJavascriptFiles(item, (arr) => {
            result.push(...arr);
            count++;

            if (count === len) {
              callback(result);
            }
          });
        }
      });
    }
  });
}
