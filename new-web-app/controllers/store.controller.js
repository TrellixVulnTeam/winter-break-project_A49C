const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
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
    const store = new Store(req.body);
    await store.save();
    res.redirect('/')
    console.log('saved store into DB')
}