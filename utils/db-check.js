const ObjectID = require("mongoose").Types.ObjectId;
const lodash = require("lodash");

let _isValid = (input) => {
  if (!input) return false;
  let inputForCheck = input.toString();
  if (ObjectID.isValid(input.toString())) {
    if (String(new ObjectID(input)) === inputForCheck) return true;
    return false;
  }
  return false;
};

export const checkObjectIDs = (...params) => {
  let flag = true;
  let arrParams = lodash.flattenDeep(params);
  for (let i = 0; i < arrParams.length; i++) {
    if (!_isValid(arrParams[i])) return (flag = false);
  }
  return flag;
};
