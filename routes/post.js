const express = require('express');

const PostController = require('../controllers/post');

const checkAuth = require('../middleware/check-auth');
const extractImage = require('../middleware/image-buffer');
const uploadAzure = require('../middleware/image-azure');

const router = express.Router();

router.get('', PostController.getPosts);

router.get('/:id', PostController.getPost);

router.post('', checkAuth, extractImage, uploadAzure, PostController.createPost);

router.put('/:id', checkAuth, extractImage, uploadAzure, PostController.updatePost);

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
