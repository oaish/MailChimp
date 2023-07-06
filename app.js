const express = require("express")
const app = express();

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req, res) => {
    res.sendFile(__dirname + "/success/html")
})

app.listen(3000, () => {
    console.log("Listening on port http://localhost:3000")
})