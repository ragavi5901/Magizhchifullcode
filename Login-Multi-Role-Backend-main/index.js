import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path';

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
// app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(UserRoute);
app.use(ProductRoute); 
app.use(AuthRoute);

// store.sync();

app.post('/register', (req, res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confPassword = req.body.confPassword;

    con.query('INSERT INTO USERS (username,email,password,confPassword) VALLUES(?,?,?)',[username,email,password,confPassword],
        (err, result)=>{
            if(result){
                res.send (result);
            }else{
                res.send({message:  'invalid' })
             }
         }
    )
}); 

app.post('/login', (req, res)=>{
   
    const username = req.body.username;
    const password = req.body.password;

    con.query('SELECT * FROM users WHERE username=? AND password = ?)',[username,password],
        (err, result)=>{
            if(err){
                res.setEncoding ({err: err });
            }else{
               if(result.length >0 ){
                res.send(result);
               }else{res.send({message:'wrong username or password' });
             }
         }
        }
    )
}); 

// let storage = multer.diskStorage({
//     destination : (req, file ,cb)=>{
//         cb(null, './public/images')
//     },
//     filename:(req,file, cb)=>{
//         cb(null, file.fieldname+ '_' + Date.now() + path.extname( file.originalname))
//     }
// })

// let maxSize = 2 * 1000*1000;
// let upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: maxSize
//     }
// })

// let uploadHandler = upload.single('file');

// app.post('/products', (req, res)=>{
//     uploadHandler(req,res,function(error){
//         if(err instanceof multer.MulterError){
//             if(err.code == 'LIMIT_FILE_SIZE'){
//                 res.status(400).json({message:"Maximum file size is 2mb"})
//             }
//             return;
//         }
//         if(!req.file){
//             res.status(400).json({message:"no file"});
//         }else{
//             res.status(200).json({message:"Uploaded to the server"})
//         }
//     })
// })

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
