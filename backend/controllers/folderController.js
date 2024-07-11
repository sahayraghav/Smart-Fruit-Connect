import {google} from 'googleapis'
import {nanoid} from 'nanoid'
import dotenv from 'dotenv'

dotenv.config();


const CLIENT_ID=process.env.CLIENT_ID,
    CLIENT_SECRET=process.env.CLIENT_SECRET,
    REDIRECT_URI=process.env.REDIRECT_URI,
    REFRESH_TOKEN=process.env.REFRES_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

export async function createFolder(req, res) {
    try{
        const folderName = nanoid(10);
        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
        };
        const folder = await drive.files.create({
            resource: fileMetadata,
            fields: 'id',
        });
        return res.status(200).send({
            success: true,
            message: "Folder created!",
            folder_id: folder.data.id
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: "Folder not created!"
        });
    }
  }

export async function deleteFolder(req, res) {
    try {
        const {folderId} = req.body;
        await drive.files.delete({
            fileId: folderId,
        });
        console.log(`Folder with ID ${folderId} deleted successfully.`);
        return res.status(200).send({
            success: true,
            message: "Folder deleted!"
        });
    } catch (error) {
        console.error('Error deleting folder:', error.message);
        return res.status(500).send({
            success: false,
            message: "Folder not deleted!"
        });
    }
  }