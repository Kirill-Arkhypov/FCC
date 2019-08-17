function checkCashRegister(price, cash, cid) {

  const result = { status: '', change: [], };
  const change = cash * 100 - price * 100;
  const nominals = [
                      ["ONE HUNDRED", 100 * 100],
                      ["TWENTY", 20 * 100],
                      ["TEN", 10 * 100],
                      ["FIVE", 5 * 100],
                      ["ONE", 1 * 100],
                      ["QUARTER", 0.25 * 100],
                      ["DIME", 0.1 * 100],
                      ["NICKEL", 0.05 * 100],
                      ["PENNY", 0.01 * 100],
                   ];
  const removeZeroValues = arr => arr.filter( i => i[1] > 0 );
  const floatingPointCorrection = arr => arr.map( i => [i[0], (i[1] * 100).toFixed(0)] );
  const setDefaultValues = arr => arr.map( i => [i[0], i[1] / 100]);

  const total = arr => {
    let total = 0;
    for (let i of arr) {
      total += +i[1];
    }
    return total;
  };

  let comparsion = 0;
  let currencyOnHands = [];
  let newCid = floatingPointCorrection(cid);
  newCid = newCid.reverse();

  for (let i = 0; i < nominals.length; i++) {
    let currentValue = 0;

    while (comparsion !== change) {

      if (newCid[i][1] <= 0) break;

      comparsion += nominals[i][1];
      newCid[i][1] -= nominals[i][1];
      currentValue += nominals[i][1];

      if (comparsion > change) {
        comparsion -= nominals[i][1];
        currentValue -= nominals[i][1];
        break;
      }
    }
    if (currentValue > 0) {
      currencyOnHands.push([nominals[i][0], currentValue]);
    }
  }

  if (total(floatingPointCorrection(cid)) === change) {
    result.status = 'CLOSED';
    result.change = cid;
    return result;

  } else if (total(floatingPointCorrection(cid)) < change
             || removeZeroValues(cid).length > currencyOnHands.length
             && total(currencyOnHands) !== change) {
    result.status = 'INSUFFICIENT_FUNDS';
    return result;
  }

  result.status = 'OPEN';
  result.change = setDefaultValues(currencyOnHands);
  return result;
}

// console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// //should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// //should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// //should return {status: "INSUFFICIENT_FUNDS", change: []}.
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// //should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

