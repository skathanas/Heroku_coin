const express = require('express');
const bodyParser = require('body-parser');
const axios = require ('axios');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) =>{
    let url = 'https://api.coindesk.com/v1/bpi/currentprice/eur.json';
    let currency = req.body.currency;
    let bcoin = req.body.bcoin;
    console.log(currency);
    axios.get(url)
    .then(function(response){
        let rate;
        if(currency === 'EUR'){
            rate = parseInt(response.data.bpi.EUR.rate.replace(/\,/g,''), 10);
            code= response.data.bpi.EUR.rate;
        } else {
            rate = parseInt(response.data.bpi.USD.rate.replace(/\,/g,''), 10);
            code = response.data.bpi.USD.rate;
        }
        let cash = bcoin * rate;
        let disclaimer = response.data.disclaimer;
        res.write(`<p>${bcoin} bitcoini on ${cash} ${currency}</p>`);
        res.write(`<p>Vahetus kurs on 1 bitcoin = ${code}${currency}</p>`);
        res.send();
    })
    .catch(function(error){
        console.log(error);
    });

});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started.");
});


