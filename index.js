var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const defaultRouter = require('./routers/default.router');
const userRouter = require('./routers/users.router');
const productRouter = require('./routers/products.router');
const authorization = require('./middlewares/basicAuth');
const defaultCtrl = require('./controllers/default.ctrl');
const reviewRouter = require('./routers/reviews.router');

app.use(express.static('uploads/'));
app.use(bodyParser.json());

app.get('/', defaultCtrl.defaultCheck);
app.use('/', defaultRouter);
app.use('/api', userRouter);
// app.use(basicAuthorization.basicAuth);
// app.use(authorization.jwtAuth);
app.use('/api/reviews', reviewRouter);
app.use('/api', productRouter);


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