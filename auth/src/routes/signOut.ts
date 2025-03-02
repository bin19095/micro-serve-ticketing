import express from 'express';

const router = express.Router();

router.post('/api/user/signout', ( req, res) => {
    res.send('You are not logged In!');
});

export { router as signOutRouter};
