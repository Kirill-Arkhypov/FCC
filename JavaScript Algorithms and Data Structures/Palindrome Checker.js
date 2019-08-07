function palindrome(str) {
  let pal = str.replace(/[\W_]/g, "").toLowerCase();
  console.log(pal);
  console.log(pal.split("").reverse().join(""));
  if (pal === pal.split("").reverse().join("")) {
    return true;
  }
  return false;
}

console.log(palindrome("A man, a plan, a canal. Panama"));