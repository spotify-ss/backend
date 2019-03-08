const express = require('express')

const server = express();
const port = process.env.PORT || 9001;

server.get('/', (req, res) => {
    res.status(200).json({api: `Alive at port ${port}`})
})



server.get('*', (req, res) => {
    res.status(404).json({message: "route not found"})
})
server.listen(port, () => console.log(`\nServer live on: ${port}\n`));
