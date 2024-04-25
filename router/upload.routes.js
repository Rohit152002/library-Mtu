import stream from "node:stream";
import express from "express";
import multer from "multer";
import path from "node:path";
import { google } from "googleapis";

const upload = multer();

const app = express.Router();
const __dirname = path.resolve();
// const KEYFILEPATH = path.join(`${__dirname}/credentials.json`);
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  // keyFile: KEYFILEPATH,
  scopes: SCOPES,
  // projectId: process.env.project_id,
  credentials: {
    project_id: process.env.project,
    private_key: process.env.private_key
      .replace(/\\n/g, "\n")
      .replace(/"/g, ""),
    private_key_id: process.env.private_key_id,
    type: process.env.type,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
  },
});

app.post("/", upload.any(), async (req, res) => {
  try {
    const { files } = req;
    const fileName = await uploadFile(files[0]);
    return res.status(200).json({ message: "File Uploaded", id: fileName });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//<img src="https://drive.google.com/thumbnail?id=15gwHKykXRnfDgvNScAW0p1PPJu75ZlXN" alt="None" />

const uploadFile = async (fileObject) => {
  console.log(process.env.private_key);
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google
    .drive({
      version: "v3",
      auth: auth,
    })
    .files.create({
      media: {
        mimeType: fileObject.mimetype,
        body: bufferStream,
      },
      requestBody: {
        name: `${fileObject.fieldname}-${Date.now()}`,
        parents: ["1Fwro_Jd5Xax0Ot8wQMo_wLJiPvGinwAA"],
      },
      fields: "id,name",
    });
  return data.id;
};
export { uploadFile };
