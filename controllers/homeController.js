const mongoose = require('mongoose')
const Template = mongoose.model('Template')

exports.homePage = async (req, res) => {
  const templates = await Template.find().sort({'createdDate': 'desc'})
  
  res.render('pages/index', {
    title: 'Responsive Tailwind Site Templates',
    templates
  })
}
