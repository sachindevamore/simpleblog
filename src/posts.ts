import * as express from 'express';
const router = express.Router();
import { fn } from './helper'

router.use(fn.tokenValidate);

router.post('/post', async (req, res) => {
    try {
        //hear is small comment by sachin
        let currUser: string = req.body.cur_user;
        // commit by b2
        if (!req.body.post || !req.body.title || !req.body.postid) throw new Error("Missing of post | titile");
        let json = await fn.readDB();
        !json[currUser]['posts'] && (json[currUser] = { ...json[currUser], "posts": {} });
        json[currUser]["posts"][req.body.postid] = { title: req.body.title, post: req.body.post };
        console.log('post - ', json);
        fn.writeDB(json);
        res.send("Blog is added successfully");
    } catch (e) {
        res.status(400).send("IMPROPER_DATA::" + e.message);
    }
});

router.post('/addcomment', async (req, res) => {
    try {
        let { author, postid, comment, cur_user } = req.body;
        let json = await fn.readDB();
        !json[author]["comments"] && (json[author]["comments"] = []);
        json[author]["comments"].push({
            "person": cur_user,
            "postno": postid,
            "comment": comment,
        });
        fn.writeDB(json);
        res.send("Comment added successfully.")
    } catch (e) {
        res.status(400).send("Internal Error while updating comment");
    }
});

router.get('/get/post', async (req, res) => {
    try {
        let json = await fn.readDB();
        if (req.query.postid == '*')
            res.send(json[req.query.author]["posts"]);
        else
            res.send(json[req.query.author]["posts"][req.query.postid]);
    } catch (e) {
        res.status(500).send("Internal Error while updating comment");
    }
});
router.get('/get/comments', async (req, res) => {
    try {
        let json = await fn.readDB();
        res.send(json[req.query.author]["comments"]);
    } catch (e) {
        res.status(500).send("Internal Error while updating comment");
    }
});
module.exports = router;