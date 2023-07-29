import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import Connection from './database/db.js'
import DefaultData from './default.js'
import Router from './router/route.js'
import { v4 as uuid} from 'uuid'
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();


dotenv.config()

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/', Router);

const PORT = process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@flipkart-clone.qpmclyp.mongodb.net/Flipkart-Clone`


Connection(URL)

//static files
/*
app.use(express.static(path.join(__dirname,'.server/client/build')))
app.get('*', function (req, res){
   res.sendFile(path.join(__dirname,'.server/client/build/index.html'));
});*/
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)

const __dirname = path.dirname(__filename);
/*console.log('directory-name ', __dirname);

console.log(path.join(__dirname, '/dist', 'index.html'));*/
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*', function (req, res){
   res.sendFile(path.join(__dirname,'./client/build/index.html'));
});


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`))

DefaultData()

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'callback'
paytmParams['EMAIL'] = 'salonidiwad@gmail.com'
paytmParams['MOBILE_NO'] = '1234567852'