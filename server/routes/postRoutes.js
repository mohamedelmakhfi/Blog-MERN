
const {Router} = require('express');
const { getAuthorPosts, getPost, getPosts, createPost, editPost, deletePost, getCatPosts } = require('../controllers/postControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = Router();


// router.get('/', (req, res, next) => {
//     res.json("Ceci est la route posts")
// })


router.get('/' , getPosts)
router.get('/users/:id' , getAuthorPosts)
router.get('/categories/:category' , getCatPosts)
router.get('/:id' , getPost)
router.patch('/:id' , authMiddleware , editPost)
router.delete('/:id' , authMiddleware ,deletePost)
router.post('/' , authMiddleware , createPost)



module.exports = router;
