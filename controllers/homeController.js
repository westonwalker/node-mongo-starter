const mongoose = require('mongoose')

exports.homePage = async (req, res) => { 
  
  res.render('pages/index', {
    title: 'Some Site'
  })
}
