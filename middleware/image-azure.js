const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

azureUpload = (req, res, next) => {
  // Enter your storage account name and shared key
  const account = process.env.AZURE_ACCOUNT;
  const accountKey = process.env.AZURE_ACCOUNT_KEY;
  const accountContainer = process.env.AZURE_ACCOUNT_CONTAINER;

  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential);
  const containerClient = blobServiceClient.getContainerClient(accountContainer);

  // filename
  const name = req.file.originalname.toLowerCase().split(' ').join('-');
  const ext = MIME_TYPE_MAP[req.file.mimetype];

  // Create a blob
  const content = req.file.buffer;
  const blobName = name + '-' + Date.now() + '.' + ext;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const blobOptions = { blobHTTPHeaders: { blobContentType: 'image/jpeg' } };
  blockBlobClient.upload(content, Buffer.byteLength(content), blobOptions);
  req.file.url = blockBlobClient.url;

  next();
};

module.exports = azureUpload;
