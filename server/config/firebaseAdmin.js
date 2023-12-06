const admin = require('firebase-admin');
const serviceAccount = require('./marketmatefx-firebase-adminsdk-tu7h7-b4ddaffa0c.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;







