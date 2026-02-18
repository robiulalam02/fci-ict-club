const { MongoClient, ServerApiVersion } = require('mongodb');

// No top-level logic that can hang
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri || "", {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
});

const db = client.db();

const collections = {
    users: db.collection("users"),
    certificates: db.collection("certificates"),
    reviews: db.collection("reviews"),
    notices: db.collection("notices"),
    mentors: db.collection("mentors"),
};

// Start connection in the background so it doesn't block Passenger
client.connect().catch(err => console.error("DB Background Error:", err));

module.exports = { client, collections };