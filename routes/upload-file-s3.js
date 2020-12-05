import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import s3 from "@auth0/s3";

dotenv.config();

const {
  AWS_BUCKET,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

const AWS_SIGN_URL_EXP = 60000;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const AWS_S3 = new AWS.S3({
  signatureVersion: "v4",
  region: AWS_REGION,
});

const client = s3.createClient({
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
    // endpoint: 's3.yourdomain.com',
    // sslEnabled: false
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});

const render_link_upload_file_s3 = ({ path, fileName, type }) => {
  try {
    const bucket = `${AWS_BUCKET}/${path}`;

    const url = AWS_S3.getSignedUrl("putObject", {
      Bucket: bucket,
      Key: fileName,
      Expires: AWS_SIGN_URL_EXP,
      ACL: "public-read",
      ContentType: type,
    });

    return { error: false, url };
  } catch (error) {
    return { error: true, message: "cant_create_url" };
  }
};

function render_link_upload_s3(path, fileName, type) {
  return new Promise(async (resolve) => {
    try {
      if (!path || !fileName || !type)
        return resolve({ error: true, message: "params_invalid" });
      let result = await render_link_upload_file_s3({ path, fileName, type });
      if (!result.error) {
        return resolve({ error: false, data: result });
      } else {
        return resolve({ error: true, message: "Error" });
      }
    } catch (error) {
      return resolve({ error: true, message: error.message });
    }
  });
}

export { render_link_upload_s3 as GENERATE_LINK_S3 };
