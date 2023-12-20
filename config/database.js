const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/javascriptNote', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Close the Mongoose connection when the Node process is terminated
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to application termination');
        process.exit(0);
    });
});
