const express = require('express');

const router = express.Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
  if (req.query.cruzid !== undefined) {
    User.findOne({
      cruzid: {
        $regex: req.query.cruzid,
        $options: 'i',
      },
    })
      .then(user => res.send(user))
      .catch(err => res.status(404).json(
        { success: true },
      ));
  } else if (req.query.id !== undefined) {
    User.findById(req.query.id)
      .then(user => res.send(user))
      .catch(err => res.status(404).json({ success: true }));
  }
});

router.get('/list', (req, res) => {
  User.find()
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
      });
  });
});

router.get('/testlist', async (req, res) => {
  const users = await User.find().exec();

  res.json(users);
});


router.get('/pages', async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 25 } = req.query;

  try {
    // execute query with page and limit values
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await User.countDocuments();

    // return response with posts, total pages, and current page
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
});

// delete

router.delete('/remove/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
      res.send('Deleted successfully!');
  })
});


router.delete('/remove/:cruzid', (req, res) => {
  User.findByIdAndRemove(req.params.cruzid, function (err) {
    if (err) return next(err);
      res.send('Deleted successfully!');
  })
});


module.exports = router;
