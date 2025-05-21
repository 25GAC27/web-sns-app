const express = require('express');
const app = express();
const userRoute = require('./routes/users');
const PORT = 3000;

// Middleware
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
