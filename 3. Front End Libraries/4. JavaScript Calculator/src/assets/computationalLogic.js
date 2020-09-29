const compute = (current, previous, operator) => {
  let result;

  switch (operator) {
    case '+':
      result = previous + current;
      break;

    case '-':
      result = result = previous - current;
      break;

    case '*':
      result = result = previous * current;
      break;

    case '/':
      result = result = previous / current;
      break;

    default:
      return;
  }

  result = Math.round(1000000000000000 * result) / 1000000000000000;
  return result.toString();
};

export default compute;
