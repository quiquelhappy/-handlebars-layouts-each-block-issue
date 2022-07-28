import fs from "fs"
import Handlebars from "handlebars"
import layouts from "handlebars-layouts"
import express from "express"

Handlebars.registerHelper(layouts(Handlebars));

const working = false // change to true if you wanna test WorkingLayout.hbs instead of layout.hbs

// load the base layout
Handlebars.registerPartial('layout', fs.readFileSync(`./layout/${working ? 'WorkingLayout' : 'Layout'}.hbs`, {
    encoding: 'utf8'
}));

// import the page contents which include the block contents
const page = fs.readFileSync(`./layout/Page.hbs`, {
    encoding: 'utf8'
})

const template = Handlebars.compile(page);

// base should loop over the modules array and only render the blocks listed on the array. this cannot be done with if-else helpers, since the array could be ordered in multiple ways and have repeated elements
const output = template({
    modules: ["a", "b", "c"]
})

// for output review purposes...

fs.writeFileSync("output.html", output, {
    encoding: 'utf8'
})

const app = express()
app.get('/', function (_, res) {
    res.send(output)
})

app.listen(1337, undefined, () => {
    console.log('preview', 'http://localhost:1337')
})