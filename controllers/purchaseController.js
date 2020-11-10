const mongoose = require('mongoose')
const Store = mongoose.model('Store')

// pricing page
exports.pricing = (req, res) => {
  res.render('pages/pricing', {
    title: 'Responsive Tailwind Site Templates',
  })
}

exports.purchaseConfirmation = (req, res) => {
  res.render('pages/purchaseConfimration', {
    title: 'Purchase Successful! Responsive Tailwind Site Templates',
  })
}

// Webhook for gumroad license
exports.purchase = (req, res) => {
  let purchase = req.body

  console.log(req)
  res.sendStatus(200)
}

// Webhook for gumroad license
exports.purchase = (req, res) => {
  let purchase = req.body
  const send = require('gmail-send')({
    user: 'tailwindsites@gmail.com',
    pass: 'rZgdfB6ZM3Rn',
    to: purchase.email,
    subject: 'Your TailwindSites License',
  })

  const emailBody = `<h1 style="color: #F56565;">
      TailwindSites
    </h1>
    <h2>
      Thank you for purchasing a TailwindSites license :)
    </h2>
    <p>
      You still need to setup your TailwindSites account. Once your account is setup your license will automatically be linked to it and you will have access to all of our TailwindSite templates.
    </p>
    <p>
      <a style="background-color: #F56565; padding: 4px;color: white; border-radius: 5px;" href="${process.env.URL}/register/${purchase.license_key}">Click here to setup your TailwindSites account</a> 
    </p>`

  send(
    {
      html: emailBody,
    },
    (error, result, fullResult) => {
      if (error) console.error(error)
      console.log(result)
    }
  )

  res.sendStatus(200)
}

// exports.email = (req, res) => {
//   let purchase = {
//     license_key: '1231231',
//     email: 'walk8919@gmail.com'
//   }
//   const send = require('gmail-send')({
//     user: 'tailwindsites@gmail.com',
//     pass: 'rZgdfB6ZM3Rn',
//     to:   purchase.email,
//     subject: 'Your TailwindSites License',
//   })
//   send({
//     html: `Your tailwind sites license is ${purchase.license_key}.`,
//   }, (error, result, fullResult) => {
//     if (error) console.error(error);
//     console.log(result);
//   })
//   res.send("success")
// }
