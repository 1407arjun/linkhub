const { MongoClient } = require('mongodb');
const router = require('next/router');

module.exports = function addToMailList (req, res) {
	if (req.method === "POST") {
		const uri = process.env.MONGODB_STRING
		const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
		try {
			client.connect(async err => {
				if (err) {
					console.log(err);
				} else {
					collection = await client.db("MailList").collection("Subscribe");
					var response = await collection.insertOne({email: req.body.email});
					if (response.acknowledged)
						router.replace("/landing?id=success");
					else
						res.status(500).redirect("/landing?id=error");
				}				
			});
		} catch (e) {
			res.status(500).json(e);
		}	
	}        
}
