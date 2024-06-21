const multer = require('multer');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const path = require('path');
const fs = require('fs');

// Azure Blob Storage configuration
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Function to upload file to Azure Blob Storage
const uploadFile = async (filePath, folder, blobName) => {
    const blockBlobClient = containerClient.getBlockBlobClient(`${folder}/${blobName}`);
    await blockBlobClient.uploadFile(filePath);
    console.log(`Upload of ${blobName} to ${folder} complete`);
};

// List files in Azure Blob Storage
const listFiles = async (folder) => {
    let blobs = [];
    for await (const blob of containerClient.listBlobsFlat({ prefix: folder })) {
        blobs.push(blob.name);
    }
    return blobs;
};

// Download file from Azure Blob Storage
const downloadFile = async (folder, blobName, downloadFilePath) => {
    const blockBlobClient = containerClient.getBlockBlobClient(`${folder}/${blobName}`);
    await blockBlobClient.downloadToFile(downloadFilePath);
    console.log(`Download of ${blobName} from ${folder} complete`);
};

// Delete file from Azure Blob Storage
const deleteFile = async (folder, blobName) => {
    const blockBlobClient = containerClient.getBlockBlobClient(`${folder}/${blobName}`);
    await blockBlobClient.delete();
    console.log(`Deletion of ${blobName} from ${folder} complete`);
};

// Express routes for file operations
const express = require('express');
const router = express.Router();

// Route to upload resumes
router.post('/upload/resume', upload.single('file'), async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const folder = 'resumes';
    const blobName = req.file.filename;
    await uploadFile(filePath, folder, blobName);
    res.send('Resume uploaded to Azure Blob Storage');
});

// Route to upload images
router.post('/upload/image', upload.single('file'), async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const folder = 'images';
    const blobName = req.file.filename;
    await uploadFile(filePath, folder, blobName);
    res.send('Image uploaded to Azure Blob Storage');
});

// Route to list files in a folder
router.get('/files/:folder', async (req, res) => {
    const folder = req.params.folder;
    const files = await listFiles(folder);
    res.send(files);
});

// Route to download a file from a specific folder
router.get('/download/:folder/:filename', async (req, res) => {
    const folder = req.params.folder;
    const blobName = req.params.filename;
    const downloadFilePath = path.join(__dirname, 'downloads', blobName);
    await downloadFile(folder, blobName, downloadFilePath);
    res.download(downloadFilePath);
});

// Route to delete a file from a specific folder
router.delete('/delete/:folder/:filename', async (req, res) => {
    const folder = req.params.folder;
    const blobName = req.params.filename;
    await deleteFile(folder, blobName);
    res.send(`File deleted from Azure Blob Storage in folder ${folder}`);
});

module.exports = router;
