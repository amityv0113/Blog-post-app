
const express = require('express')
const app = express()

app.use(express.json())
// connnect to db
const connectToMongo=require('./database/db')
connectToMongo()


const port = 3000

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/blog', require('./routes/blogs'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})