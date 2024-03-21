const HttpError = require("../models/errorModel")

const Post = require('../models/postModel')
const User = require('../models/userModel')

const path = require('path')
const fs = require('fs')
const {v4 : uuid} = require('uuid')


//+========================== get all Posts
// GET : api/posts/
// UNPROTECTED
const getPosts = async (req ,res ,next) => {
    try {
        const posts = await Post.find().sort({updatedAt : -1}); // sort it by the most recent post
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


//+========================== get single Post
// GET : api/posts/:id
// PROTECTED
const getPost = async (req ,res ,next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        
        if(!post){
            return next( new HttpError ('Post not found',404))
        }
        res.status(200).json(post)
        
    } catch (error) {
        return next(new HttpError(error))
    }
}


//+========================== get Post BY CATEGORY
// GET : api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req ,res ,next) => {
    try {
        // const category = req.params.category ;
        const {category} = req.params ;
        const catPosts = await Post.find({category: category}).sort({createdAt:-1}) 

        if(catPosts.length === 0) {
            return next(new HttpError('posts not fount with this category', 404))
        }
        
        res.status(200).json(catPosts)

    } catch (error) {
        return next(new HttpError(error));
    }
}

//+========================== get Post BY Authors
// GET : api/posts/users/:id
// UNPROTECTED
const getAuthorPosts = async (req ,res ,next) => {
    try {
        const {id}= req.params;
        const posts = await Post.find({creator: id}).sort( { createdAt: -1 });
        if (!posts || posts.length == 0 ) {
            return next(new HttpError('No post by this user'));
        }

        // res.status(200).json({posts, message:"Successfully got the posts by author"})
        res.status(200).json(posts)

    } catch (error) {
        return next(new HttpError(error))
    }
}


//+========================== Create Post
// POST : api/posts/
// PROTECTED
const createPost = async (req ,res ,next) => {
    try {
        let {title,category,description} = req.body;
        if(!title || !category || !description || !req.files){
            return next(new HttpError('Fill in all fields and choose thumbnail',422));
        }

        const {thumbnail} = req.files

        //check the file size
        if(thumbnail.size > 200000) {
            return next(new HttpError("thumbnail too big.Files should be less than 2mb",422))
        }
        
        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' +splittedFilename[splittedFilename.length -1]
        thumbnail.mv(path.join(__dirname, '..' , 'uploads' , newFilename) , async (err) => {
            if(err) {
                return next(new HttpError(err))
            }else{
                const newPost = await Post.create({title,category,description,thumbnail: newFilename,creator: req.user.id})
                if(!newPost){
                    return next(new HttpError('Post couldnt be created.'),422)
                }

                //Find user and increate post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1 ;
                await User.findByIdAndUpdate(req.user.id , {posts: userPostCount})

                res.status(201).json(newPost)
            }
        })

    } catch (error) {
        return next(new HttpError(error))
    }
}

//+========================== edit Post
// PATCH : api/posts/:id
// PROTECTED
const editPost = async (req ,res ,next) => {
    try {
        
        let fileName ;
        let newFilename;
        let updatePost;

        const postId = req.params.id;

        if (!postId) {
            return next(new HttpError("Post unvailable",400))
        }

        // Check if postId exists
        const existsIdpost = await Post.findById(postId)
        if (!existsIdpost) {
            return next(new HttpError("There is no such a post.", 422));
        }
        
        let {title,category,description} = req.body;

        //ReactQuill has a paragraph opening and closing tag with a break tag in between  so there are 11
        // characters in there already

        if (!title || !category || description.length < 12) {
            return next(new HttpError("Please provide all fields.",422));
        }


        //get old post from database
        const oldPost = await Post.findById(postId);

        if(req.user.id == oldPost.creator) {
            //if user ne change pas l'image
            if(!req.files) {
                updatePost = await  Post.findByIdAndUpdate(postId , {title , category , description}, {new: true});
            
                //si il update image
            } else {
                //delete old thumbnail from uploads
                fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail) , async (err) => {
                    if (err) {
                        return next(new HttpError(err))
                    }
                }) 

                //upload new thumbnail
                const {thumbnail} = req.files;

                // check size  of the image
                if (thumbnail.size > 200000) {
                    return next(new HttpError('thumbnail too big , should be less than 2mn'))
                }

                fileName = thumbnail.name;
                let splittedFilename = fileName.split('.');
                newFilename = splittedFilename[0] + uuid() + '.' +splittedFilename[splittedFilename.length - 1]
                thumbnail.mv(path.join(__dirname, '..', 'uploads',newFilename ), async (err)=> {
                    if (err) {
                        return next(new HttpError(err))
                    }
                })

                //update post with new thumbnail
                updatePost = await  Post.findByIdAndUpdate(postId, {title,category,description,thumbnail: newFilename}, {new: true})
            }
        }

        if(!updatePost) {
            return  next(new HttpError('Could not update post'),400);
        }

        res.status(200).json(updatePost);
        
    } catch (error) {
        return next(new HttpError(error))
    }

}


//+========================== delete Post
// DELETE : api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;

        if (!postId) {
            return next(new HttpError("Post unvailable",400))
        }

        const post = await Post.findById(postId);
        const fileName = post?.thumbnail;

        if (req.user.id == post.creator) {
           // delete thumbnail from uploads folder
        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if (err) {
                return next(new HttpError(err));
            } else {
                Post.findByIdAndDelete(postId)
                // find user and reduce post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser?.posts -  1;
                await User.findByIdAndUpdate(req.user.id , {posts: userPostCount})
                res.json(`Post ${postId} deleted successfully`);
            }
        }); 
        } else {
            return next(new HttpError('post couldnt be deleted. You do not have permission to perform this action!',403));
        }
        
        

    } catch (error) {
        return next(new HttpError(error));
    }
}





module.exports = {createPost,editPost,deletePost,getAuthorPosts,getCatPosts,getPost,getPosts}