// Check
import * as checkAuth from "./helpers/checkAuth";
import * as checkUser from "./helpers/checkUser";
import * as checkEmailEnv from "./helpers/checkEmailEnv";
import * as verificationCheck from "./helpers/verificationCheck";
// import * as changeActivityStatus from "./helpers/verificationCheck";
// import * as checkRoom from "./helpers/verificationCheck";

// Validator
import * as userValidator from "./schemaValidators/userValidator";
// import * as postValidator from "./schemaValidators/postValidator";
// import * as commentValidator from "./schemaValidators/commentValidator";
// import * as chatValidator from "./schemaValidators/chatValidator";
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
    // chatValidator,
    // commentValidator,
    // notificationValidator,
    // postValidator,
    userValidator,
};