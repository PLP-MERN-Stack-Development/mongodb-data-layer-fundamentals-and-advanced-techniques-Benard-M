const { MongoClient } = require("mongodb");

async function runQueries() {
  const uri = "mongodb://127.0.0.1:27017"; // replace with your Atlas URI if needed
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log(" Connected to MongoDB");

    const db = client.db("libraryDB");
    const books = db.collection("books");

    // Query 1: Find all books
    console.log("All Books:", await books.find().toArray());

    // Query 2: Find books by author
    console.log("Books by Robert C. Martin:", await books.find({ author: "Robert C. Martin" }).toArray());

    // Query 3: Find books published after 2000
    console.log("Books after 2000:", await books.find({ year: { $gt: 2000 } }).toArray());

    // Query 4: Count how many books are in the Programming genre
    console.log("Programming books count:", await books.countDocuments({ genre: "Programming" }));

    // Query 5: Sort books by year (newest first)
    console.log("Books sorted by year:", await books.find().sort({ year: -1 }).toArray());

  } catch (err) {
    console.error(" Error:", err);
  } finally {
    await client.close();
  }
}

runQueries();
