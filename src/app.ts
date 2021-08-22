import * as express from 'express';
import config from './config'
import * as user from './user'
import * as post from './posts'

const app = express();
app.use(express.json())

app.listen(config.port, () => console.log(`Server Running on http://localhost:${config.port}`));

app.use('/user',user);
app.use('/blog',post);

app.get('/', (req,res) => {
    res.sendFile('welcome.html', {root: __dirname })
})