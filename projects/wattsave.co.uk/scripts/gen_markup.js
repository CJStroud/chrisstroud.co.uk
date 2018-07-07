var handlebars = require('handlebars')
var layouts = require('handlebars-layouts')
var fs = require('fs')
const chalk = require('chalk')
const figures = require('figures')

var products = require('../data/products.json')

// Register helpers
handlebars.registerHelper(layouts(handlebars))

// Register partials
handlebars.registerPartial('layout', fs.readFileSync('src/layout.hbs', 'utf8'))

var indexTemplate = handlebars.compile(fs.readFileSync('src/pages/index.html', 'utf8'))
const index = indexTemplate({
  title: 'Home',
  products: products
})

var aboutTemplate = handlebars.compile(fs.readFileSync('src/pages/about.html', 'utf8'))
const about = aboutTemplate({title: 'About'})

var contactTemplate = handlebars.compile(fs.readFileSync('src/pages/contact.html', 'utf8'))
const contact = contactTemplate({title: 'Contact'})

const pages = {
  'index.html': index,
  'about.html': about,
  'contact.html': contact
}

var productTemplate = handlebars.compile(fs.readFileSync('src/pages/product.html', 'utf8'))

// Add a page for each product in products.json
products.forEach(product => {
  const templateData = product
  templateData.title = product.name
  pages[product.href] = productTemplate(templateData)
})

Object.entries(pages).map(([path, template]) => {
  const pathParts = path.split('/')
  const dir = pathParts.length > 1 ? pathParts.slice(0, pathParts.length - 1).join('/') : null
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFile(path, template, function (err) {
    if (err) {
      const icon = chalk.red(figures.cross)
      console.log(`${icon} Error generating ${path}`)
      console.log(err)
    } else {
      const icon = chalk.green(figures.tick)
      console.log(`${icon} Generated ${path}`)
    }
  })
})
