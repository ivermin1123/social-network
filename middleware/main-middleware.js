// Check
import checkAuth from "./helpers/checkAuth";
import checkUser from "./helpers/checkUser";
import checkEmailEnv from "./helpers/checkEmailEnv";
import verificationCheck from "./helpers/verificationCheck";
// import * as changeActivityStatus from "./helpers/verificationCheck";
// import * as checkRoom from "./helpers/verificationCheck";

// Validator
import * as userValidator from "./schemaValidators/userValidator";
import * as postValidator from "./schemaValidators/postValidator";
import * as reactionValidator from "./schemaValidators/reactionValidator";
import * as commentValidator from "./schemaValidators/commentValidator";
import * as conversationValidator from "./schemaValidators/conversationValidator";
import * as messageValidator from "./schemaValidators/messageValidator";
// import * as notificationValidator from "./schemaValidators/userValidator";

export const helpers = {
  checkAuth,
  checkUser,
  checkEmailEnv,
  verificationCheck,
  // changeActivityStatus,
  // checkRoom,
};

export const validator = {
  commentValidator,
  // notificationValidator,
  messageValidator,
  conversationValidator,
  reactionValidator,
  postValidator,
  userValidator,
};
