import express from "express";
import fs from "fs";
import { google } from "googleapis";
import {espReplaceController, updateLocationController} from '../controllers/image_upload.js'
const router = express.Router();

const CLIENT_ID=process.env.CLIENT_ID,
    CLIENT_SECRET=process.env.CLIENT_SECRET,
    REDIRECT_URI=process.env.REDIRECT_URI,
    REFRESH_TOKEN=process.env.REFRES_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

router.post("/image", espReplaceController);
router.post("/location", updateLocationController);
export default router;
