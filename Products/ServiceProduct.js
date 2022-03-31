const express = require("express");
const app = express()
const fs = require("fs")
const uuid = require("uuid")

const products = require('./products.json');

let getAllProducts = () => {
    try {
        const jsonProducts = fs.readFileSync('./Products/products.json');
        const res = JSON.parse(jsonProducts);

        return res;
    } catch (err) {
        console.log(err);
        return { code: 500, message: "Error while getting all products data." };
    }
}

let createProduct = (req, res) => {
    const newProduct = {
        "nom": req.body.nom,
        "description": req.body.description,
        "token": uuid.v4(),
        "prix": req.body.prix,
        "stock": req.body.stock,
        "reference": req.body.reference,
        "created_at": new Date().toLocaleString(),
        "updated_at": new Date().toLocaleString()
    }

    // Check if the current JSON is empty or not, creating or pushing on condition
    var productsList = products;

    // Ternaire
    productsList ? productsList.push(newProduct) : productsList = [newProduct];

    try {
        fs.writeFile('./Products/products.json', JSON.stringify(productsList), error => {
            if (error)
                console.log('An error occured, please try again', error)
            else
                console.log('Success')

        })
        return { code: 200, message: 'Product created successfully' }
    }
    catch (error) {
        return { code: 500, message: 'An error occured while creating the product ' + error }
    }
}

let updateProduct = req => {
    const updatedProduct = products.map(product => {
        if (product.token === req.params.token) {
            return {
                ...product,
                "nom": req.body.nom ?? product.nom,
                "description": req.body.description ?? product.description,
                "prix": req.body.prix ?? product.prix,
                "stock": req.body.stock ?? product.stock,
                "reference": req.body.reference ?? product.reference,
                "updated_at": new Date().toLocaleString()
            };
        }

        return product
    })

    try {
        fs.writeFile("./Products/products.json", JSON.stringify(updatedProduct), err => {
            if (err) console.log('An error occured, please try again', error)
            else console.log('Success updating')

        });

        return { code: 200, message: 'Product updated successfully' }
    }
    catch (error) {
        return { code: 500, message: 'An error occured while updating the product ' + error }
    }
}

let deleteProduct = req => {
    const token = req.params.token;

    let formatedProducts = JSON.parse(fs.readFileSync('./Products/products.json', 'utf8'));

    let index = -1;

    formatedProducts.find(function (product, i, req) {
        if (product.token === token) {
            index = i;
            return i;
        }
    });

    formatedProducts.splice(index, 1);

    const arrayWithoutProduct = JSON.stringify(formatedProducts, null, 2)

    try {
        fs.writeFile("./Products/products.json", arrayWithoutProduct, err => {
            if (err) console.log('An error occured, please try again', error)
            else console.log('Success deleting')

        });

        return { code: 200, message: 'Product deleted successfully' }
    }
    catch (error) {
        return { code: 500, message: 'An error occured while deleting the product ' + error }
    }
}

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };