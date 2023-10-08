const  {Item}  = require("./item.js")
// Create an edible `Food` class that inherits from the `Item` class
// Your code here

class Food extends Item {
    constructor(name, description) {
        super(name, description)
    }
}

module.exports = {
    Food,
};
