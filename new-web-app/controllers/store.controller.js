const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
    console.log(req.name)
    res.render('index');
}

exports.addStore = (req, res) => {
    res.render('editStore', {title: 'Add Store'})
}
// generally need to wrap await in try catch
// we can handle this with composition
// wrap it in another function, that handles all
// of the error handling
exports.createStore = async (req, res) => {
    // since our slug is auto-generated,
    // we do this in one line, so it's saved in the store object
    // otherwise we only have access to the form field values
    const store = await (new Store(req.body)).save();
    // the flash object is instantiated in app.js, so it is globally available
    req.flash('success', `Successfully created ${store.name}. Leave a review?`)
    res.redirect(`/store/${store.slug}`)
    console.log('saved store into DB')
}

exports.getStores = async (req, res) => {
    const stores = await Store.find();
    // since the key and value that we want to pass below for stores is the same,
    // we can eliminate having to show the value utilizing ES6 by just putting the 
    // name that both key and value share, which is stores in this case
    res.render('stores', {title : 'Stores', stores })
}

exports.editStore = async (req, res) => {
    const store = await Store.findOne({ _id: req.params.id });
    res.render('editStore', { title: `Edit ${store.name}`, store})
}

exports.updateStore = async (req, res) => {
    // casts location to type Point on update
    req.body.location.type = 'Point';
    // runValidators, make sure that the validation that is required to create a store is also used to update one
    const store = Store.findOneAndUpdate({ _id : req.params.id }, req.body, {new : true, runValidators : true}).exec();
    req.flash('success', `Successfully updated ${store.name} <a href="/stores/${store.slug}">View Store </a>`);
    res.redirect(`/stores/${store._id}/edit`);

}