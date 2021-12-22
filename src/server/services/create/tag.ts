import client from "../../loaders/database"

export default async function createTagIfNotExists(tags: string[]): Promise<boolean> {
    try {
        const mClient = await client
        let res: boolean = true
        tags.forEach(async (tag) => {
            const response = await mClient.db("Client").collection("tags").findOneAndUpdate({name: tag}, {
                "$setOnInsert": { name: tag, related: [] }
            }, {upsert: true})
            res = (res && response.ok === 1)
        })
        return res
    } catch (e) {
        console.log(e)
        return false
    }
}