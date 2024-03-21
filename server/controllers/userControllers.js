const HttpError = require("../models/errorModel")
const User = require('../models/userModel')

const fs = require('fs')
const path = require('path')

const {v4 : uuid} = require('uuid')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



// ------------------------ REGISTER A NEW USER
// POST : api/users/register
// UNPROTECTED


const registerUser = async (req, res, next) => {
    try {
        const {name,email,password,password2} = req.body;
        if(!name || !email || !password ) {
            return next(new HttpError('Fill in all fields.' , 422))
        }

        const newEmail = email.toLowerCase();
        const emailExists = await User.findOne({email:newEmail})

        if(emailExists) {
            return next(new HttpError('This Email is already exists!', 422))
        }

        if((password.trim()).length < 6) {
            return next(new HttpError('Password must be at least 6 characters long!',  422))
        }

        if(password !== password2) {
            return next(new HttpError('Passwords do not match!', 422))
        }

        const salt = await bcrypt.genSalt(10) //how hard salt is going to be 
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await  User.create({
            name,
            email:newEmail,
            password:hashedPassword,
        })

        res.status(201).json(`New user ${newUser.email} registed.`)
        
        
    } catch (error) {
        return next(new HttpError('User Registration failed', 422))
    }
}


// ------------------------ login a registered USER
// POST : api/users/login
// UNPROTECTED

const loginUser = async (req, res, next) => {
    try {
        const {email,password} = req.body;
        if(!email || !password ) {
            return next(new HttpError('Fill in all fields.' , 422))
        }
        const newEmail = email.toLowerCase();

        const user = await User.findOne({email :newEmail})
        if(!user) {
            return next(new HttpError('Invalid Credentials' , 422))
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return next(new HttpError("Wrong Password!", 422));
        }

        //* Les tokens JWT sont utilisés pour l'authentification et la sécurisation des routes dans une application web. Un token JWT contient des informations sur l'utilisateur (par exemple, l'ID de l'utilisateur), ainsi qu'une signature pour garantir son intégrité.  */

        const {_id : id , name} = user;
        const token = jwt.sign(
            {id,name}, 
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
            )
        
            res.status(200).json({token, id, name});

    } catch (error) {
        return next(new HttpError('Logging in Failed', 422));
    }
}



// ------------------------  USER Profile
// POST : api/users/:id
// PROTECTED


//! we should use req.user to get the current logged-in instead 
//! req.user.id from authorization/authMiddleware

const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password');
        if (!user){
            return next(new HttpError('Could not find a user with that ID' ,404))
        }
        res.status(200).json(user);
        
    } catch (error) {
        return next(new HttpError(error))
    }
}



// ------------------------ change user avatar (profile picture)
// POST : api/users/change-avatar
// ROTECTED

const changeAvatar = async (req, res, next) => {
    try {
        if(!req.files.avatar) {
            return  next( new HttpError("Please upload an image", 422))
        }

        // find user from database
        const user = await User.findById(req.user.id)  // req.user.id from authorization

        // delete old avatar if exists
        if(user.avatar) {
            fs.unlink(path.join(__dirname, '..' , 'uploads' , user.avatar) ,
                (err) => {
                    if(err) {
                        console.error("Error deleting old avatar:", err);
                        return next(new HttpError(err))
                    }
            })
        }

        const {avatar} = req.files;
        // check file size 
        if(avatar.size > 500000) {
           return next(new HttpError("Image is too big! Please keep it under 500kb.", 422));
        }

        // change name of evry file image 
        let fileName;
        fileName = avatar.name;

        let splittedFilename = fileName.split('.')   //avatar '.' png
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        avatar.mv(path.join(__dirname , '..', 'uploads' , newFilename) ,
        async (err) => {
            if(err) {
                console.error("Error saving avatar:", err);
                return next(new HttpError(err))
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {avatar: newFilename}, {new : true}).select('-password')
            if(!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changer",422))
            }
            res.status(200).json(updatedAvatar)
    })

    } catch (error) {
        console.error("Error in changeAvatar:", error);
        return next(new HttpError(error));
    }
}


// ------------------------ edit user details (from profile)
// POST : api/users/edit-user
// ROTECTED

const editUser = async (req, res, next) => {
    try {
        const {name,email,currentPassword,newPassword,confirmNewPassword}= req.body;
        if(!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError( "Please provide all fields",422));
        }

        //get user from database
        const user= await User.findById(req.user.id);  // req.user.id from authorization
        if (!user) {
            return next(new HttpError('Logged user not found',403));
        }

        // make sure new email doesn't exists
        const emailExists = await User.findOne({email});
        if (emailExists && emailExists._id != req.user.id ) {
            return next(new HttpError('This email is already taken',422));
        }
         
        // compare current password to db password 
        const validateUserPassword = await  bcrypt.compare(currentPassword , user.password) ;
        if(!validateUserPassword) {
            return next(new HttpError('Current password is wrong',422));
        }

        // compare new password
        if(newPassword !== confirmNewPassword){
            return next(new HttpError('Passwords do not match',422))
        }

        // hash the new password
        const salt = await bcrypt.genSalt(10) //how hard salt is going to be 
        const hashedPassword = await bcrypt.hash(newPassword,salt); 

        //update user info in databse 
        const newInfo = await User.findByIdAndUpdate(req.user.id, 
            {name,email,password: hashedPassword}, {new : true})

        res.status(200).json(newInfo)

    } catch (error) {
        return next(new HttpError(error))
    }
}


// ------------------------  get all authors (profile picture)
// POST : api/users/authors
// UNROTECTED

const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.status(200).json(authors);
        
    } catch (error) {
        return next(new HttpError(error))
    }
}



module.exports = {registerUser,loginUser,getUser,changeAvatar,editUser,getAuthors};