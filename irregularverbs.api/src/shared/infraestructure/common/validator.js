const Validator = require('validatorjs');
const moment = require('moment');

// Query functions

function getDefaultMessages() {
  return {
    required: 'Field required',
    regex: 'Invalid Format',
  };
}

/**
 * validate with moment.js if date have a valid format
 * @param {DATE} date dated to validate
 * @param {String} format valid format
 * @return {Boolean} true if date is valid, otherwise false
 */
function isDateValid(date, format) {
  return moment(date, format).isValid();
}

Validator.isDateValid = isDateValid;

// Configuration
Validator.useLang('en');

Validator.register(
  'isBefore',
  (value, attribute) => {
    const attributeValues = attribute.split(',');

    const day = attributeValues[0];

    const format = attributeValues[1] || 'YYYY-MM-DD';

    let dateToCompare;

    if (!isDateValid(value, format)) {
      return false;
    }

    const todayDate = moment().format(format);
    switch (day) {
      case 'TODAY': {
        // date isBefore today?
        dateToCompare = todayDate;
        break;
      }
      case 'TOMORROW': {
        // date isBefore tomorrow?
        dateToCompare = moment(todayDate)
          .add(1, 'days')
          .format(format);
        break;
      }
      case 'YESTERDAY': {
        // date isBefore yesterday?
        dateToCompare = moment(todayDate)
          .subtract(1, 'days')
          .format(format);
        break;
      }
      default:
        if (!isDateValid(day, format)) {
          return false;
        }

        dateToCompare = moment().format(format);
        break;
    }

    return moment(value).isBefore(dateToCompare);
  },
  'Fecha no válida',
);

Validator.register(
  'isAfter',
  (value, attribute) => {
    const attributeValues = attribute.split(',');

    const day = attributeValues[0];

    const format = attributeValues[1] || 'YYYY-MM-DD';

    let dateToCompare;

    if (!isDateValid(value, format)) {
      return false;
    }

    const todayDate = moment().format(format);

    switch (day) {
      case 'TODAY':
        // date isAfter today?
        dateToCompare = todayDate;
        break;
      case 'TOMORROW':
        // date isAfter tomorrow?
        dateToCompare = moment(todayDate)
          .add(1, 'days')
          .format(format);
        break;
      case 'YESTERDAY':
        // date isAfter yesterday?
        dateToCompare = moment(todayDate)
          .subtract(1, 'days')
          .format(format);
        break;
      default:
        if (!isDateValid(day, format)) {
          return false;
        }

        dateToCompare = moment().format(format);
        break;
    }

    return moment(value).isAfter(dateToCompare);
  },
  'Fecha no válida',
);

Validator.register(
  'validDateFormat',
  (value, attribute) => {
    const format = attribute || 'YYYY-MM-DD';
    return isDateValid(value, format);
  },
  'Fecha no válida',
);

// Custom functions
Validator.generate = (data, parms) => {
  const v = new Validator(data, parms.rules, parms.messages);
  // v.setAttributeNames(parms.titles)
  // v.stopOnError(true)
  return v;
};

Validator.firstError = (validator) => {
  // console.log(validator.errors.all());
  const firstAttribute = Object.keys(validator.errors.all()).shift();
  return validator.errors.first(firstAttribute);
};

Validator.firstByField = (validator) => {
  const errors = validator.errors.all();
  Object.keys(errors).forEach((key) => {
    const keyIndex = 0;
    errors[key] = errors[key][keyIndex];
  });

  return errors;
};

Validator.validateAsync = (data, parms, returnAll = true) =>
  new Promise((resolve) => {
    const messages = Object.assign(getDefaultMessages(), parms.messages);
    const v = new Validator(data, parms.rules, messages);
    v.checkAsync(
      () => resolve(true),
      () => resolve(returnAll ? Validator.firstByField(v) : Validator.firstError(v)),
    );
  });

module.exports = Validator;
