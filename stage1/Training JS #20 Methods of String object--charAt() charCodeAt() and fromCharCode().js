function topSecret(str) {
  let result = "";

  for (let char of str) {
    const code = char.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      result += String.fromCharCode(((code - 65 - 3 + 26) % 26) + 65);
    } else if (code >= 97 && code <= 122) {
      result += String.fromCharCode(((code - 97 - 3 + 26) % 26) + 97);
    } else {
      result += char;
    }
  }

  const fileMatch = result.match(/Top secret files: No\. (\d+)/);
  const agentMatch = result.match(/Super agent (\w+),/);
  const treasureMatch = result.match(/stole the (.+?) from/);

  answer1 = fileMatch ? fileMatch[1] : "?";
  answer2 = agentMatch ? agentMatch[1] : "?";
  answer3 = treasureMatch ? treasureMatch[1] : "?";

  return result;
}
