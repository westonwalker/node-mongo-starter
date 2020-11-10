const mongoose = require('mongoose')
mongoose.Promis = global.Promise

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Template name is required',
  },
  slug: {
    type: String,
    trim: true,
  },
  thumbnailImage: {
    type: String,
    trim: true,
  },
  desktopImage: {
    type: String,
    trim: true,
  },
  tabletImage: {
    type: String,
    trim: true,
  },
  mobileImage: {
    type: String,
    trim: true,
  },
  htmlFile: {
    type: String,
    trim: true,
  },
  isFreeThisMonth: {
    type: Boolean,
  },
  createdDate: {
    type: Date,
  },
})

templateSchema.pre('save', function(next) {
  // if (!this.isModified('name')) {
  //   next()
  //   return
  // }
  // this.slug = slug(this.name)
  next()
})

module.exports = mongoose.model('Template', templateSchema)
