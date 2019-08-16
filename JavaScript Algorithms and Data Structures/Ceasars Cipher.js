function rot13(str) {
  return str.replace(/\w/gi, i => {
    return String.fromCharCode(i.charCodeAt(0) + (i <= 'M' ? 13 : -13 ))
  });
}

console.log(rot13("SERR PBQR PNZC"));
