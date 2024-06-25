const express = require('express')
var cors = require('cors')

const dbconnect=require('./db')
const User = require('./routes/UserRoute')
const passwordM = require('./routes/PasswrodRoute')
const app = express()
const port = 3000
dbconnect();
app.use(express.json());
app.use(cors())
app.use('/User', User)
app.use('/Password', passwordM)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})