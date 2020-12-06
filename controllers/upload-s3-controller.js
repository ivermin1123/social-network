import { GENERATE_LINK_S3 } from "../routes/upload-file-s3";
import { v4 as uuidv4 } from "uuid";

export const uploadFile_S3 = async (req, res) => {
  try {
    if (!req.userData)
      return res.json({ error: true, message: "Access denied." });
    let { userID } = req.userData;

    let { name, size, type, path } = req.body;
    let extName = name && name.split(".").pop().toLowerCase();

    if (type.includes("image") && !type.includes(".dwg")) {
      name = `${uuidv4()}.${extName}`;
    }
    const pathFile = `${path}/${name}`;
    await GENERATE_LINK_S3(path, name, type)
      .then((linkUpload) => {
        // console.log(linkUpload, path, type);
        res.json({ error: false, linkUpload, path: pathFile, type });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: true, message: "cannot_create_link" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};
