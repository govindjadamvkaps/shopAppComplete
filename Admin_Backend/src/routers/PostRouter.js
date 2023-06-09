import express from "express";
import { fetchPost, fetchPostAndDelete, fetchPostAndUpdate, fetchPostByObjId, savePost } from "../controllers/PostController.js";
import multer from "multer";

const PostRouter = express.Router()

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/images')
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage:storage})

PostRouter.post('/posts',upload.single('image') , savePost)
PostRouter.get("/posts", fetchPost)
PostRouter.get("/posts/:id", fetchPostByObjId)
PostRouter.put('/posts/update/:id', upload.single('image'),fetchPostAndUpdate)
PostRouter.delete('/posts/delete/:id',fetchPostAndDelete)


export default PostRouter