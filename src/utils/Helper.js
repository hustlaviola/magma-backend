import bcrypt from 'bcrypt';
import Responses from './Responses';

/**
 * @class Helper
 * @description An helper class containing utility methods
 * @exports Helper
 */
export default class Helper {
  /**
   * @method hashPassword
   * @description Hash password before saving in the database
   * @static
   * @param {string} password
   * @returns {string} string response
   * @memberof Helper
   */
  static async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  /**
   * @method buildErrorResponse
   * @description Set error response
   * @static
   * @param {object} data
   * @returns {object} JSON response
   * @memberof Helper
   */
  static buildErrorResponse(data) {
    if (data.error) {
      const allErrors = data.error.details;
      const errors = this.getErrorLabels(allErrors);
      if (errors) {
        Responses.setError(400, errors);
      }
      return errors;
    }
    return null;
  }

  /**
   * @method getErrorLabels
   * @param {object} allErrs
   * @returns {object} JSON response
   * @memberof Helper
   */
  static getErrorLabels(allErrs) {
    const errors = [];
    allErrs.forEach(error => {
      const { context } = error;
      if (error.type !== 'object.allowUnknown') errors.push(context.label);
    });
    const errs = errors.length > 0 ? errors : null;
    return errs;
  }
}