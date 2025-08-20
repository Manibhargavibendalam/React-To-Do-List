
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://manibhargavibendalam:bhargavi225@cluster0.82w6id4.mongodb.net/")
    .then(() => console.log('MongoDB connected successfully'))
    .catch(error => console.log(`Error ocurred:${error}`));