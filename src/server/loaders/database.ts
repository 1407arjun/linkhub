import mongoose from 'mongoose'

//@ts-ignore
mongoose.connect(process.env.MONGODB_STRING!, {useNewUrlParser: true, useUnifiedTopology: true}, (err: object): void => {
    if (err)
        console.log(err)
})

export default mongoose