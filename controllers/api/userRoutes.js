// give ways to find the password and username 
const router = require('express').Router();
const { urlencoded } = require('express');
const { User, ContentPost, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// GET localhost:3001/api/user
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(userData);
    } catch (err){
        res.status(500).json(err);
    }
});

// get one user according to the id
router.get('/:id', withAuth, async (req, res) => {
    try{
        const userData = await User.findOne({
            attributes: { exclude: ['password']},
            where: {id: req.params.id},
            include: [{model: ContentPost, attributes: ['id', 'title', 'description']},
                {model: Comments, attributes: ['id','description'], include: {model: ContentPost, attributes: ['title']}}
            ]
        });
        res.json(userData);
    }catch (err){
        res.status(500).json(err);
    }
});

// Create a user
// POST localhost:3001/api/user
router.post('/', async (req, res) =>{
    try{
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.userID = userData.id;
            req.session.username = userData.username,
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    }catch (err){
        res.status(400).json(err);
    }
});

// include log in
router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({where: {email: req.body.email}});
        console.log({userData, body: req.body});
        if (!userData){
            res.status(400).json("incorrect username, try again");
            return;
        }
        
        const correctPassword = await userData.checkPassword(req.body.password);
        if (!correctPassword){
            res.status(400).json("incorrect password, try again");
            return;
        }
        req.session.save(() => {
            req.session.userID = userData.id;
            req.session.loggedIn = true;
            res.json("log in success!");
        });
    } catch (err){
        res.status(400).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.userID, {
            attributes: { exclude: ['password'] },
            include: [{ model: ContentPost }],
          });
      
          const user = userData.get({ plain: true });
      
          res.render('contentpost', {
            ...user,
            logged_in: true
          });
    } catch (err) {
    res.status(500).json(err);
  }
});


// include log out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
        res.status(204).end();
    });
    } else {
        res.status(404).end();
    }
});
module.exports = router;