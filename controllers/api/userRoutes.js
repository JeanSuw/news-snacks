// give ways to find the password and username 
const router = require('express').Router();
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
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.userID = userData.id;
            req.session.username = userData.username,
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    }catch (err){
        res.status(400).json(err);
    }
});

// include log in
router.post('/login', async (req, res) => {
    try{
        const userData = User.findOne({where: {username: req.body.username}});
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
            req.session.logged_in = true;
            res.json("log in success!");
        });
    } catch (err){
        res.status(400).json(err);
    }
});


// include log out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
        res.status(204).end();
    });
    } else {
        res.status(404).end();
    }
});
module.exports = router;