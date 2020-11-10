const mongoose = require('mongoose')
const Template = mongoose.model('Template')
const fs = require('fs');

exports.show = async (req, res) => {
  const template = await Template.findOne({ slug: req.params.slug })
  if (!template) {
    req.flash('warning', `Could not find site template.`)
    res.redirect('/')
    return
  }
  const templateHtml = fs.readFileSync(`./public/themes-8919/${template.htmlFile}`);
  res.render('pages/showTheme', { title: `${template.name}`, template, templateHtml })
}
