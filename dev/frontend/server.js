const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const request = require('request-promise');
const bodyParser = require('body-parser');
const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/app/client'));

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var makeGetRequest = function (route, qParams, req, res) {
    var options = {
        uri: 'http://localhost:8080' + route,
        method: 'GET',
        qs: qParams
    }

    request(options)  
        .then(function (dataRecvd) {
            dataRecvd = JSON.parse(dataRecvd);
            
            // Request was successful
            if (dataRecvd.status === "success") {
                res.status(200)
                    .json({
                        status: dataRecvd.status,
                        data: dataRecvd["data"],
                        message: dataRecvd.message
                    });
            } else {
                res.status(400)
                    .json({
                        status: dataRecvd.status,
                        data: dataRecvd["data"],
                        message: dataRecvd.message
                    });
            }
        })
        .catch(function (err) {
            // An error occurred
            res.status(400).
            json({
                status: 'error',
                data: {},
                message: 'An error occurred'
            });
        });
}

app.get('/findUser', function(req, res) {
    
    makeGetRequest('/user', req.query, req, res);
});

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Frontend listening at http://%s:%s', host, port);
});