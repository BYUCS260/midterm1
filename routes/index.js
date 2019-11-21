var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', {
    useNewUrlParser: true
});

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    url: String,
    orders: Number,
});

const Product = mongoose.model('Product', productSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/products', async(req, res) => {
    console.log("Inside GET products");
    try {
        let products = await Product.find();
        res.send(products);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/products', async(req, res) => {
    console.log("Inside POST products");
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        url: req.body.url,
        orders: req.body.orders,
    });
    try {
        await product.save();
        res.send(product);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/products/increment/:id', async(req, res) => {
    try {
        let id = req.params.id;
        Product.findOne({ "_id": id }, function(err, product) {
            product.orders++;
            product.save();
            console.log(err);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/products/:id', async(req, res) => {
    console.log("Inside DELETE products");
    try {
        let id = req.params.id;
        Product.deleteOne({ "_id": id }, function(err) {
            console.log(err);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;
