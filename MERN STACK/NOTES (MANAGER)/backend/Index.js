const express = require('express')
const User=require('./Models/User');
const Note=require('./Models/Notes');
var cors = require('cors')
const mongoconnect=require('./db');
const app = express()
const port = 3000
mongoconnect();
app.use(express.json());
app.use(cors())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})