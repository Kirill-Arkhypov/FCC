const compute = (current, previous, operator) => {
  let result;

  const x = parseFloat(previous);
  const y = parseFloat(current);

  switch (operator) {
    case '+':
      result = x + y;
      break;

    case '-':
      result = x - y;
      break;

    case '*':
      result = x * y;
      break;

    case '/':
      result = x / y;
      break;

    default:
      return;
  }

  result = Math.round(1e13 * result) / 1e13;
  return result.toString();
};

export default compute;
