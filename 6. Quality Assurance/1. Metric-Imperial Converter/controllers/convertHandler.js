/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const units = [
  'gal',
  'l',
  'mi',
  'km',
  'lbs',
  'kg',
  'GAL',
  'L',
  'MI',
  'KM',
  'LBS',
  'KG',
];
const regex = /[a-z]+|[^a-z]+/gi;

function ConvertHandler() {
  this.getNum = function (input) {
    const result = input.match(regex);

    if (result.length === 1) {
      result.unshift('1');
    }

    const num = result[0];

    if (num.includes('/')) {
      const x = num.split('/');
      if (x.length > 2) {
        return 'invalid number';
      }
      return +(+x[0] / +x[1]).toFixed(5);
    }

    return +num;
  };

  this.getUnit = function (input) {
    const result = input.match(regex)[1] || input.match(regex)[0];

    if (!units.includes(result)) {
      return 'invalid unit';
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    const unit = initUnit.toLowerCase();

    switch (unit) {
      case 'l':
        return 'gal';

      case 'gal':
        return 'l';

      case 'kg':
        return 'lbs';

      case 'lbs':
        return 'kg';

      case 'km':
        return 'mi';

      case 'mi':
        return 'km';

      default:
        return;
    }
  };

  this.spellOutUnit = function (unit, value) {
    let result;
    switch (unit.toLowerCase()) {
      case 'l':
        result = 'liter';
        break;

      case 'gal':
        result = 'gallon';
        break;

      case 'kg':
        result = 'kilogram';
        break;

      case 'lbs':
        result = 'pound';
        break;

      case 'km':
        result = 'kilometer';
        break;

      case 'mi':
        result = 'mile';
        break;

      default:
        return;
    }

    if (value === 1) {
      return result;
    }

    return result + 's';
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case 'l':
        result = initNum / galToL;
        break;

      case 'gal':
        result = initNum * galToL;
        break;

      case 'kg':
        result = initNum / lbsToKg;
        break;

      case 'lbs':
        result = initNum * lbsToKg;
        break;

      case 'km':
        result = initNum / miToKm;
        break;

      case 'mi':
        result = initNum * miToKm;
        break;

      default:
        return;
    }

    return +result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit,
      initNum
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit, returnNum)}`;
  };
}

module.exports = ConvertHandler;
