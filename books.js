const { MongoClient } = require("mongodb");

async function insertBooks() {
  const uri = "mongodb://127.0.0.1:27017"; // replace with your Atlas URI if needed
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log(" Connected to MongoDB");

    const db = client.db("libraryDB");
    const books = db.collection("books");

    // Insert sample books
    await books.insertMany([
      { title: "Clean Code", author: "Robert C. Martin", year: 2008, genre: "Programming" },
      { title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999, genre: "Programming" },
      { title: "Design Patterns", author: "Erich Gamma", year: 1994, genre: "Software Engineering" },
      { title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018, genre: "Programming" },
      { title: "Introduction to Algorithms", author: "Thomas H. Cormen", year: 2009, genre: "Algorithms" }
    ]);

    console.log(" Books inserted successfully!");

  } catch (err) {
    console.error(" Error:", err);
  } finally {
    await client.close();
  }
}

insertBooks();
