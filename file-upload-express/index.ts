import * as express from 'express'
import * as multer from 'multer'
import * as cors from 'cors'
import * as fs from 'fs'
import * as path from 'path'
import * as bodyParser from 'body-parser'

// setup
const UPLOAD_PATH = 'uploads/';
const upload = multer({ dest: UPLOAD_PATH,
 storage: multer.diskStorage({
      destination: UPLOAD_PATH,
      filename: (req, file, cb) => cb(null, file.originalname)}) 
    });

// app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api', async (req, res) => {
    try {
        res.send('OK');
    } catch (err) {
        res.sendStatus(400);
    }
})

app.post('/api/profile', upload.single('video'), async (req, res) => {
    try {
        console.log('req', req.file)
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
    }
})

app.listen(process.env.PORT || 3000, function () {
    console.log('listening on port 3000!');
})