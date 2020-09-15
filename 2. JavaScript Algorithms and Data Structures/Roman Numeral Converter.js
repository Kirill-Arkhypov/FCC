function convertToRoman(num) {
  const romanNumerals = { 
                          'M': '1000',
                          'CM': '900',
                          'D': '500',
                          'CD': '400',
                          'C': '100',
                          'XC': '90',
                          'L': '50',
                          'XL': '40',
                          'X': '10',
                          'IX': '9',
                          'V': '5',
                          'IV': '4',
                          'I': '1', 
                        };
  let comparison = 0;
  let converted = '';
  for (let i in romanNumerals) {
    while (comparison !== num) {
      comparison += +romanNumerals[i];
      if (comparison > num) {
        comparison -= +romanNumerals[i];
        break;
      }
      converted += i;
    }
  }
  return converted;
}

console.log(convertToRoman(641));

