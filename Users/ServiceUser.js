const express = require("express");
const app = express()
const fs = require("fs")
const uuid = require("uuid")

const users = require('./users.json');

let getAllUsers = () => {
    try {
        const jsonUsers = fs.readFileSync('./Users/users.json');
        const res = JSON.parse(jsonUsers);

        return res;
    } catch (err) {
        console.log(err);
        return { code: 500, message: "Error while getting all users data." };
    }
}

let createUser = (req, res) => {
    const newUser = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "token": uuid.v4(),
        "role": req.body.role,
        "created_at": new Date().toLocaleString(),
        "updated_at": new Date().toLocaleString()
    }

    // Check if the current JSON is empty or not, creating or pushing on condition
    var usersList = users;

    // Ternaire
    usersList ? usersList.push(newUser) : usersList = [newUser];

    try {
        fs.writeFile('./Users/users.json', JSON.stringify(usersList), error => {
            if (error)
                console.log('An error occured, please try again', error)
            else
                console.log('Success')

        })
        return { code: 200, message: 'User created successfully' }
    }
    catch (error) {
        return { code: 500, message: 'An error occured while creating the user ' + error }
    }
}

let updateUser = req => {

    const updatedUser = users.map(user => {
        if (user.token === req.params.token) {
            return {
                ...user,
                "firstname": req.body.firstname ?? user.firstname,
                "lastname": req.body.lastname ?? user.lastname,
                "role": req.body.role ?? user.role,
                "updated_at": new Date().toLocaleString()
            };
        }

        return user
    })

    try {
        fs.writeFile("./Users/users.json", JSON.stringify(updatedUser), err => {
            if (err) console.log('An error occured, please try again', error)
            else console.log('Success updating')

        });

        return { code: 200, message: 'User updated successfully' }
    }
    catch (error) {
        return { code: 500, message: 'An error occured while updating the user ' + error }
    }
}

let deleteUser = req => {
    // adds null on the list when deleted

    // const index = users.findIndex(el => {
    //     return el.token === req.params.token;
    // });
    // const arrayWithoutUser = users.map(user => {
    //     if (user.token === req.params.token) {
    //         !!users.splice(index, 1)
    //     }
    //     return user
    // })
    const token = req.params.token;

    let formatedUsers = JSON.parse(fs.readFileSync('./Users/users.json', 'utf8'));

    let index = -1;

    formatedUsers.find(function (user, i, req) {
        if (user.token === token) {
            index = i;
            return i;
        }
    });

    formatedUsers.splice(index, 1);

    const arrayWithoutUser = JSON.stringify(formatedUsers, null, 2)

    try {
        fs.writeFile("./Users/users.json", arrayWithoutUser, err => {
            if (err) console.log('An error occured, please try again', error)
            else console.log('Success deleting')

        });

        return { code: 200, message: 'User deleted successfully' }
    }
    catch (error) {
        return { code: 500, message: 'An error occured while deleting the user ' + error }
    }
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser };