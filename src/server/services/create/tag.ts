import client from "../../loaders/database"

export default async function createTagIfNotExists(tags: string[]) {
    const mClient = await client
    let res = true
    tags.forEach(async (tag, index) => {
        const response = await mClient.db("Client").collection("tags").findOneAndUpdate({name: tag}, {
            "$setOnInsert": { name: tag, related: [] }
        }, {upsert: true})
        res = (res && response.ok === 1)
    })
    return res
}