const mongoose = require('mongoose');
const { stringify } = require('postcss');
mongoose.Promise = global.Promise;
const slug = require('slugs');

// we are using strict schema for data validation
const storeSchema = new mongoose.Schema({
    name : {
        // it's best practice to do all data normalization on the model instead of before you save it
        // for example, trim is set to true below, so this will trim off any leading or trailing white spaces, if the user
        // accidently introduces them when they are filling in the form on front end
        type: String,
        trim: true,
        required: 'Please enter a store name'
    },
    slug: String,
    descritpion : {
        type: String,
        trim : true
    },
    description : {
        type: String,
        trim: true
    },
    tags: [String]

});

storeSchema.pre('save', function(next){
    if(!this.isModified('name')){
        return next()
    }
    this.slug = slug(this.name);
    next();
})

module.exports = mongoose.model('Store', storeSchema)