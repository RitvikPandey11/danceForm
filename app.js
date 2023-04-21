const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;


//schema, model 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    mychoice: {type:String, possibleValues: ['HIP-HOP','SALSA','KATHAK']}
});
var Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})
app.get('/services', (req, res) => {
    res.status(200).render('services.pug');
})
app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
})
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})
app.get('/allContact', (async (req, res) => {         
    const contact123435 = await Contact.find();      
    console.log(contact123435)
    res.json(contact123435)
}))
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(async () => {
        const contact12 = await Contact.find()
        res.json(contact12)
    }).catch((e) => {
        console.log(e)
        res.status(400).send("item was not saved")
    });
})       


//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})
