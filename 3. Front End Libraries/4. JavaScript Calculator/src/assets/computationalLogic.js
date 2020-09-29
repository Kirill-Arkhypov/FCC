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

  result = Math.round(1e19 * result) / 1e19;
  return result.toString();
};

export default compute;
