// src/lib/db.ts

import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function initializeDatabase(): Promise<void> {
  if (db) {
    console.log('Database already initialized');
    return;
  }

  const dbPath = path.resolve(process.cwd(), 'planefinder.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS flights (
      id TEXT PRIMARY KEY,
      aircraft_type TEXT,
      flight_date TEXT,
      origin_airport TEXT,
      destination_airport TEXT,
      total_distance INTEGER,
      flight_time TEXT,
      remaining_time TEXT,
      airline TEXT,
      last_updated TEXT
    )
  `);

  console.log('Database initialized');
}

export function getDatabase(): Database<sqlite3.Database, sqlite3.Statement> {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
    console.log('Database connection closed');
  }
}