const express = require("express");
const app = express();
const bodyParser = require('body-parser')

const UserService = require('./Users/ServiceUser');
const ProductService = require('./Products/ServiceProduct');

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(8081, () => {
  console.log('Server listening on port 8081 !');
});

 //#region USERS
app.get('/users', (req, res) => {
    res.send(
        UserService.getAllUsers()
    )
})

app.post('/users/create', (req, res) => {
    res.send(
        UserService.createUser(req)
    )
})

app.put('/users/update/:token', (req,res) => {
    res.send(
        UserService.updateUser(req)
    )
})

app.delete('/users/delete/:token', (req, res) => {
    res.send(
        UserService.deleteUser(req)
    )
})
//#endregion

//#region PRODUCTS
app.get('/products', (req, res) => {
    res.send(
        ProductService.getAllProducts()
    )
})

app.post('/products/create', (req, res) => {
    res.send(
        ProductService.createProduct(req)
    )
})

app.put('/products/update/:token', (req,res) => {
    res.send(
        ProductService.updateProduct(req)
    )
})

app.delete('/products/delete/:token', (req, res) => {
    res.send(
        ProductService.deleteProduct(req)
    )
})
//#endregion