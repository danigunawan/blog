const Article = require('../models/article.js');

module.exports = {
  create: (req,res) => {
    const { title, text } = req.body;
    let article = new Article({
      title, text,
      user: req.user._id,
    });
    article.save((err,data) => {
      if (err) {
        res.status(500).json({
          err
        });
      }
      res.status(200).json({
        message: "Success Create New Article",
        data
      });
    });
  },
  find: (req,res) => {
    Article.findOne({_id: req.params.id})
    .populate('user')
    .exec().then((data) => {
      res.status(200).json({
        message: "Success Read an Article",
        data
      });
    }).catch((err) => {
      console.log(err);
    })
  },
  authorArticle: (req,res) => {
    Article.find({user: req.params.id})
    .populate('user')
    .exec().then((data) => {
      res.status(200).json({
        message: "Success Read Author's Articles",
        data
      });
    }).catch((err) => {
      console.log(err);
    })
  },
  myArticle: (req,res) => {
    Article.find({user: req.user._id})
    .populate('user')
    .exec().then((data) => {
      res.status(200).json({
        message: "Success Read Articles",
        data
      });
    }).catch((err) => {
      console.log(err);
    })
  },
  index: (req,res) => {
    Article.find({})
    .populate('user')
    .exec().then((data) => {
      res.status(200).json({
        message: "Success Read Articles",
        data
      });
    }).catch((err) => {
      console.log(err);
    })
  },
  update: (req,res) => {
    Article.findOne({_id: req.params.id},function(err,data) {
      if(err) return res.status(500).json({
        message: "Something Went Wrong",
        err
        });
      if(data.user == req.user._id) {
        const  { title , text  } = req.body;
        let input = { title, text };
        Article.findOneAndUpdate({_id:req.params.id},input,{ new: true},(err,data) => {
          res.status(200).json({
            message: "Success Update Articles",
            data
          });
        });
      } else {
          res.status(500).json({
            message: "Don't Have Permission"
          });
       }
    })
  },
  addLike: (req,res) => {
    Article.findOne({_id: req.params.id},function(err,data) {
      if(err) return res.status(500).json({
        message: "Something Went Wrong",
        err
        });
        Article.findOneAndUpdate({_id:req.params.id},{likes: data.likes + 1},{ new: true},(err,data) => {
          res.status(200).json({
            message: "Success Add Like to Article",
            data
          });
        });
    })
  },
  destroy: (req,res) => {
    Article.findOne({_id: req.params.id},function(err,data) {
      if(err) return res.status(500).json({
        message: "Something Went Wrong",
        err
        });
      if(data.user == req.user._id) {
        Article.findOneAndRemove({_id:req.params.id},(err,data) => {
          if (err) {
            res.status(500).json({
              message: 'Something Went Wrong',
              err
            });
          }
          res.status(200).json({
            message: "Success Delete Articles",
            data
          });
        });
      } else {
          res.status(500).json({
            message: "Don't Have Permission"
          });
      }
    })
  }

};
