const express = require('express');
import router from './routes/index';

const app = expresss();
const port = 3000;

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', router);

module.exports = app;
