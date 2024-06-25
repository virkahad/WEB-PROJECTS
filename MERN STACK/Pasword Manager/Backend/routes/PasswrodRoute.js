const express = require('express')
const router = express.Router()


//end point for the  adding the password in the database
router.post('/', (req, res) => {
  res.send('Password Home ')
})

// end point for the deleting the password
router.delete('/', (req, res) => {
    res.send('Password Home ')
  })

// end point for the updating the password
  router.put('/', (req, res) => {
    res.send('Password Home ')
  })

// end pointdor getting the spexific user passwords
router.post('/about', (req, res) => {
  res.send('Password About page')
})

module.exports = router