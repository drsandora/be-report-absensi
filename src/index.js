const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { AuthRepository } = require('./database'); // Import the db module
const { report, appEvent } = require('./api');

// app.use(bodyParser.json());
// app.use(express.json());



// app.use('/x', (req,res,next) => {

//     return res.status(200).json({"msg": "Hello from Auth"})
// })

const StartServer = async() => {

    const app = express();
    const port = 8004;
    report(app);
    appEvent(app)
    app.listen(port, () => {

        console.log(`Pegawai is Listening to Port ${port}`)
    })
    
    

}

StartServer();

