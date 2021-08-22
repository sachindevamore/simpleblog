import { verify } from 'jsonwebtoken';
import { promises as fs } from 'fs';
import { access, constants } from 'fs';
require('dotenv').config();
import config from './config'

class helper {
    constructor(){
        access(config.db, constants.F_OK, (err) => {
            err && fs.writeFile(config.db, "", { encoding: 'utf-8' })
        });
    }
    async tokenValidate(req: any, res: any, next: Function) {
        try {
            if (req.originalUrl == '/user/register' || req.originalUrl == '/user/login') {
                next();
            } else {
                if(!req.headers['authorization']) throw new Error("Authorization Token provided");
                let recToken: string = req.headers['authorization'].split(' ')[1];
                const valid: any = verify(recToken, process.env.SECRET_KEY);
                if (valid) {
                    req.body.cur_user = valid.user;
                    next();
                }
                else 
                   throw new Error("Not valid Token Please Login Again");
            }    
        } catch (error) {
            res.status(401).send("UN_AUTHORISED :: " + error.message);
        }
    }
    bodyValidate(req: any, res: any, next: Function) {
        if (!req.body.user || !req.body.password || !req.body.email)
            res.status(400).send('INVALID_ARGUMENTS');
        else next();
    }
    async readDB() {
        try {
            let db = await fs.readFile(config.db, 'utf-8');
            return new Promise((resolve, reject) => {
                if(db)
                    resolve(JSON.parse(db));
                else 
                    resolve(db);
            })    
        } catch (e) {
            throw new Error(e.message); 
        }
    }
    async writeDB(db) {
        if(typeof db == 'string')
            await fs.writeFile(config.db, db, { encoding: "utf-8" });
        else
            await fs.writeFile(config.db, JSON.stringify(db), { encoding: "utf-8" });
        return;
    }
}
export const fn = new helper()
