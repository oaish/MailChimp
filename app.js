const express = require("express")
const https = require("https");
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname,
                }
            }
        ]
    }

    const url = "https://us21.api.mailchimp.com/3.0/lists/711f4b6ae1"

    const options = {
        method: 'POST',
        auth: "oaish:522c8c06d169967979afc440d01eb130-us21"
    }

    const request = https.request(url, options, (response) => {
        response.on("data", () => {
            console.log(data)
        })
        const code = response.statusCode;
        if (code >= 200 && code <300) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
    })

    request.write(JSON.stringify(data));
    request.end();
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port http://localhost:3000 or " + process.env.PORT)
})

//522c8c06d169967979afc440d01eb130-us21
//711f4b6ae1.