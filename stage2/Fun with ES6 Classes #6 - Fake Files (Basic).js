class File {
  constructor(fullName, contents) {
    const lastDot = fullName.lastIndexOf(".");
    this._filename = fullName.slice(0, lastDot);
    this._extension = fullName.slice(lastDot + 1);

    Object.defineProperty(this, "fullName", {
      value: fullName,
      writable: false,
    });

    Object.defineProperty(this, "filename", {
      value: this._filename,
      writable: false,
    });

    Object.defineProperty(this, "extension", {
      value: this._extension,
      writable: false,
    });

    this._contents = contents;

    this._lineIndex = 0;
    this._charIndex = 0;

    this._lines = contents.split("\n");
  }

  getContents() {
    return this._contents;
  }

  write(str) {
    if (this._contents) this._contents += "\n" + str;
    else this._contents = str;
    this._lines = this._contents.split("\n");
  }

  gets() {
    if (this._lineIndex >= this._lines.length) return undefined;
    return this._lines[this._lineIndex++];
  }

  getc() {
    if (this._charIndex >= this._contents.length) return undefined;
    return this._contents[this._charIndex++];
  }
}
