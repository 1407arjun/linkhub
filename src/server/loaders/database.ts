import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_CLIENT_URI!
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  keepAlive: true
}

//@ts-ignore
let client = new MongoClient(uri, options)
let clientPromise: Promise<MongoClient> = client.connect()

export default clientPromise