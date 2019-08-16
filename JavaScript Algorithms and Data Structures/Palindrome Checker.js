function palindrome(str) {
  let pal = str.replace(/[\W_]/g, "").toLowerCase();
  return pal === pal.split("").reverse().join("");
}

console.log(palindrome("A man, a plan, a canal. Panama"));
