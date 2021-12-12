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