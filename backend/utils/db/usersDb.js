import sqlite3 from "sqlite3";
import fs from "fs";

// Create a new SQLite database if it doesn't exist
export function createUsersDb() {
	const usersDbPath = "./users.sqlite";
	console.log(`PATH TO USERS DB FROM /backend: ${usersDbPath}`);
	if (!fs.existsSync(usersDbPath)) {
		const db = new sqlite3.Database("./users.sqlite");
		db.serialize(() => {
			db.run(
				"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR NOT NULL, password VARCHAR NOT NULL, role TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
			);

			const stmt = db.prepare(
				"INSERT INTO users (email, password, role) VALUES (?, ?, ?)"
			);

			// Administrator account for testing purposes
			stmt.run("admin@testing.com", "admin", "admin");

			stmt.finalize();
		});
	} else {
		console.log("Database file exists. Skipping creation.");
	}
}
