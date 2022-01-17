import * as express from 'express';
import { sign } from 'jsonwebtoken';
const router = express.Router();
import { fn } from './helper'

router.use(fn.tokenValidate);
// comment by branch1
// again one commit branch1
type USER = { user: string, password: string, email: string };

router.use(fn.tokenValidate);

router.post('/register', fn.bodyValidate, async (req, res) => {
    try {
        //comment by b2
        let User: USER = { ...req.body };
        let d = `{"${User.user}" : ${JSON.stringify(User)}}`;
        let json: any = await fn.readDB();
        if (!json) {
            fn.writeDB(d);
        }
        else {
            if (Object.keys(json).includes(User.user)) throw Error("USRNAME_ALREADY_EXIST");
            json[User.user] = User;
            fn.writeDB(json);
        }
        res.send("Registration success");
    } catch (e) {
        res.status(400).send('Registration failed :: ' + e.message);
    }
});

router.post('/login', fn.bodyValidate, async (req, res) => {
    try {
        let User: USER = { ...req.body };
        let json = await fn.readDB();
        let { user, password, email }: USER = { ...json[User.user] };
        if (user === User.user && password === User.password && email === User.email) {
            const token = sign(User, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
            res.send({
                token: token,
                msg: "Successfully Logged In"
            });
        }
        else throw new Error("NOT_VALID_USER");
    } catch (e) {
        console.log(e);
        res.status(401).send("Failed to Login :: " + e.message);
    }
});
router.get('/getusers', async (req, res) => {
    try {
        if (!req.query.user)
            throw new Error('Please provide user name to get the details');
        let json = await fn.readDB();
        if (!json[req.query.user]) {
            res.send('No user found for this query');
        } else {
            if (req.query.user.toLowerCase() == 'all') res.send(json);
            else res.send(json[req.query.user]);
        }
    } catch (e) {
        console.log(e);
        res.status(401).send("GetUsers Error:: " + e.message);
    }
});

router.put('/edit', async (req, res) => {
    try {
        let json = await fn.readDB();
        json[req.body.cur_user] = { ...json[req.body.cur_user], ...req.query };
        console.log('Edited data -', json);
        fn.writeDB(json);
        res.send("Succefully edited info");
    } catch (e) {
        res.status(401).send("ERROR_EDIT :: " + e.message);
    }
});

module.exports = router;