

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGOOSE_CONNECTION_URL)
.then(() => {
    console.log("database connection is established")
})
.catch((err) => {
    console.log(`db error : ${err}`)
})