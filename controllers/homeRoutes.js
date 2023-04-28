const router = require('express').Router();
const { User, ContentPost, Comments } = require('../models');
const sequelize = require('../config/connection');
const { ADDRGETNETWORKPARAMS } = require('dns');
const { post } = require('./api');
const withAuth = require('../utils/auth');

// homeRoutes
router.get('/', async (req, res) => {
    try{
        const postData = await ContentPost.findAll({
            attributes: ['id','title','description'],
            include: [{
                model: Comments, 
                attributes: ['id', 'description', 'userPost_id'], 
                include: { model: User, attributes: ['username', 'email']}
            },
            { model: User, attributes: ['username', 'email']}
        ]});
        res.status(200).json(postData);

        res.render('homepage', {loggedIn: req.session.loggedIn});

    }catch (err){
        res.status(500).json(err);
    }
    
});

router.get('/post/:id', async (req, res) => {
    try{
        const postData = await ContentPost.findOne({
            where: {id: req.params.id},
            attributes: ['id','title','description'],
            include: [{
                model: Comments,
                attributes: ['id', 'description', 'userPost_id', 'user_id'], 
                include: { model: User, attributes: ['username']}
            },
                {model: User, attributes: ['username']}
            ]
        });
        res.status(200).json(postData);
        const onePost = postData.get({plain: true});
        res.render('contentpost', {onePost, loggedIn: req.session.loggedIn});
        
    }catch (err){
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: ContentPost}],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Sign up
// router.get('/signup', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }
//     res.render('signup');
// });

module.exports = router;