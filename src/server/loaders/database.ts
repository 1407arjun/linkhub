import mongoose from 'mongoose'

if (mongoose.connection.readyState === 0) {
    //@ts-ignore
    mongoose.connect(process.env.MONGODB_STRING! + "Client?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, (err: object): void => {
        if (err)
            console.log(err)
    })
}

export default mongoose