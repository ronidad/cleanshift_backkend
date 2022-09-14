const postsService = require("../services/posts.service");

exports.addPost = (req, res, next) => {
    const data = {
        description: req.body.description,
        imagePath:req.body.imagePath,
        addedByUserId: req.body.addedByUserId,


    };
    postsService.addPost(data, (error, results)=>{
        if(error){
            console.log(error)
            return res.status(400).send({success:0, data: "bad request"});
        } return res.status(200).send({success:1, data: results})
    });
},

exports.GetAllPosts = (req, res, next) => {
    const data = {};
    postsService.GetAllPosts(data, (error, results)=>{
        if(error){
            console.log(error)
            return res.status(400).send({success:0, data: "bad request"});
        } return res.status(200).send({success:1, data: results})
    });
},

exports.addPostComment = (req, res, next) => {
    const data = {
        postId: req.body.postId,
        comment:req.body.comment,
        addedByUserId: req.body.addedByUserId,


    };
    postsService.addPostComment(data, (error, results)=>{
        if(error){
            console.log(error)
            return res.status(400).send({success:0, data: "bad request"});
        } return res.status(200).send({success:1, data: results})
    });
}