const express = require('express');
const app = express();

const isValidDate = (date) => { // verifies if the given date is valid
    return date instanceof Date && !isNaN(date);
}

app.get("/api/timestamp", (req, res) => { // this route handles the case where no date is given 
    let date = new Date(); // find the current date and time 

    res.send({
        "unix": date.getTime(), // returns the current date's Unix timestamp 
        "utc": date.toUTCString() // returns the current date's UTC string
    });
})

app.get("/api/timestamp/:time", (req, res) => {
    let date;

    //check to see if req.params.time is not a number
    if (isNaN(req.params.time)) { //it's not a number, so process it as a string
        date = new Date(req.params.time);
    }
    else { //it's a number, so process it as a number
        date = new Date(parseInt(req.params.time));
    }
            
    if (isValidDate(date)) {
        res.send({
            "unix": date.getTime(),
            "utc": date.toUTCString()
        });
    }
    else {
        res.send({
            "error": "Invalid Date"
        });
    }
})

app.listen(3000, () => {
    console.log("Timestamp Microservice is ready.");
});
