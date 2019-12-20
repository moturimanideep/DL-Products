var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const trueLog = require('true-log');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const defaultRouter = require('./routers/default.router');
const userRouter = require('./routers/users.router');
const productRouter = require('./routers/products.router');
const authorization = require('./middlewares/basicAuth');
const defaultCtrl = require('./controllers/default.ctrl');
const reviewRouter = require('./routers/reviews.router');
var cors = require('cors');
var whitelist = [
    'http://localhost:4200'
];

var corsOptions = {
    credentials: true,
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: 'accept, content-type'
};

app.use(cors(corsOptions));

const ws = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: 'a' });
app.use(trueLog({level:'full',stream:ws}));

app.use(express.static('uploads/'));
app.use(bodyParser.json());

app.get('/', defaultCtrl.defaultCheck);
app.use('/', defaultRouter);
app.use('/api', userRouter);
// app.use(basicAuthorization.basicAuth);
// app.use(authorization.jwtAuth);
app.use('/api/reviews', reviewRouter);
app.use('/api', productRouter);

// fs.readFile('log.txt', function(err, buf) {
//     const a = buf.toString();
//     const b = a.split('}');
//     for(let i = 0; i < b.length; i++){
//         console.log(b[i]);
//     }
// })
// app.set('view engine', 'hbs');

// app.engine( 'hbs', hbs( {
//   extname: 'hbs',
//   defaultView: 'default',
//   layoutsDir: __dirname + '/views/',
//   partialsDir: __dirname + '/views/partials/'
// }));

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/dl-products', (error, response) => {
//     if(response){
//         console.log('DB Connected successfully');
//     }else{
//         console.log('Failed in connecting to db.');
//     }
// })
mongoose.connect('mongodb://admin:admin123@ds053429.mlab.com:53429/dl-products', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error, response) => {
    if(response){
        console.log('DB Connected successfully');
    }else{
        console.log('Failed in connecting to db.');
    }
})


app.listen(PORT, function(){
    console.log('Server runing on 3000 port');
})