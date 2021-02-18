const db = require('./models');

db.User.create({
  name: 'Billy Bob',
  email: 'test1@test.com',
  password: '123123123'
}).then(user => {
  console.log(`🐙 Successfully created a user!`);
  console.log(user);
  process.exit();
}).catch(err => {
  console.log(`🚨 Error creating user:\n${err}`);
  process.exit();
})