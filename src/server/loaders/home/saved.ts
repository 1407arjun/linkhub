import client from '../database'
import { ObjectId } from 'mongodb'
import { Response } from '../../types/response'

export default async function initializeHome(profileSaved: ObjectId[]): Promise<Response> {
    try {
        const mClient = await client

        //const oidArray = profile.saved.map(id => { return new ObjectId(id) })
        const oidArray = [new ObjectId(profileSaved[profileSaved.length - 1]), new ObjectId(profileSaved[profileSaved.length - 2]), new ObjectId(profileSaved[profileSaved.length - 3])]
        const saved = await mClient.db("Client").collection("posts").find({_id: {"$in": oidArray}}).limit(3).toArray()
        saved.reverse()

        return { error: false, data: { saved: saved }}
    } catch (e: object|unknown) {
        console.log(e)
        return { error: true, data: e }
    }
}