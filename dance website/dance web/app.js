const express = require('express')
const path = require('path')
const port = 80;
const app = express();
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/love');

  
}

app.use('/static', express.static('static'))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded())

const mycontact = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    location:String,
});
const Contact = mongoose.model('Kitten', mycontact);

app.get('/', (req, res) => {
    res.status(200).render('index.pug')
})
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    console.log(myData)
    myData.save().then(()=>{
    res.status(200).render('Contact.pug')
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")

    
})
})
app.get('/videos', (req, res) => {
    res.status(200).render('video.pug')
})


app.listen(port, () => {
    console.log("i am working here")
})