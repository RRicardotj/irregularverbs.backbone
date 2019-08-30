const validatorjs = require('../../../shared/infraestructure/common/validator');

module.exports = async (params, rules) => {
  if (rules.password && rules.password.includes('confirmed')) {
    // eslint-disable-next-line no-param-reassign
    params.password_confirmation = params.passwordConfirmation;
  }
  const valid = await validatorjs.validateAsync(params, { rules });

  if (valid !== true) {
    return {
      result: false,
      fields: valid,
    };
  }

  return { result: true };
};
