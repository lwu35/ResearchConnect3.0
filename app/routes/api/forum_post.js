const express = require('express');

const router = express.Router();


// Schemas

const ForumPost = require('../../models/ForumPost');
const User = require('../../models/User');




router.post('/new', (req, res) => {
    // Create a forum post
    
    const relevantUser = User.findOne({
        'cruzid': {
          $regex: req.body.author.toLowerCase(),
          $options: 'i'
        }
      });
    
      relevantUser.then(data => {
        const post = new ForumPost({
            author: data._id,
            text: req.body.text,
            title: req.body.title,
            cruzid: req.body.author,
            tag: req.body.tag,
            
        });

        // Save forum post in the database
        post.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the forum post."
            });
        });
    
      });
});


router.get('/list', (req, res) => {
  ForumPost.find()
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
      });
  });
});

// Find a single note with a noteId
router.get('/:id', (req, res) => {
  ForumPost.findById(req.params.id)
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.id
          });            
      }
      res.send(note);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving note with id " + req.params.id
      });
  });
});





module.exports = router;
