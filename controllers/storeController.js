const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.addStore = (req, res) => {
  res.render('pages/editStore', { title: 'Add Store' })
}

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save()
  req.flash('success', `Successfully created ${store.name}.`)
  res.redirect('/')
}

exports.getStores = async (req, res) => {
  const stores = await Store.find()
  res.render('pages/stores', { title: 'Stores', stores })
}

exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id })
  res.render('pages/editStore', { title: `Edit ${store.name}`, store })
}

exports.updateStore = async (req, res) => {
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  }).exec()
  req.flash('success', `Updated ${store.name}`)
  res.redirect(`/stores/${store._id}/edit`)
  // new: true = return the new store instead of old one
  // runValidators: true = force model to use validators on edit. Default it only does on create
}
