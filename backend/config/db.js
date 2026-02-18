const { MongoClient, ServerApiVersion } = require('mongodb');

// Ensure variables are loaded if working locally
if (!process.env.MONGODB_URI) {
    require('dotenv').config();
}

const client = new MongoClient(process.env.MONGODB_URI || "", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
});

// We define the DB instance here
const db = client.db();

// We export the collections directly
const collections = {
    users: db.collection("users"),
    certificates: db.collection("certificates"),
    reviews: db.collection("reviews"),
    notices: db.collection("notices"),
    mentors: db.collection("mentors"),
};

// Background connection (Does not block app startup)
client.connect().catch(err => console.error("Database connection failed:", err));

module.exports = { client, collections };