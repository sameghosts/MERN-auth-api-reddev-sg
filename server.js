
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// middleware
  //cors
app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Routes
app.get('/', (req,res) => {
  res.json({ message: 'MERN app API Home'})
})

// Controllers
app.use('/api', require('./controllers/auth'));

app.listen(process.env.port || 3001, () => 
  console.log(`🎧 You're listening to the smooth sounds of Port ${process.env.PORT || 3001}`)
)