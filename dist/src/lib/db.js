"use strict";
// src/lib/db.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.getDatabase = exports.initializeDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
let db = null;
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (db) {
            console.log('Database already initialized');
            return;
        }
        const dbPath = path_1.default.resolve(process.cwd(), 'planefinder.db');
        db = yield (0, sqlite_1.open)({
            filename: dbPath,
            driver: sqlite3_1.default.Database,
        });
        yield db.exec(`
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
    });
}
exports.initializeDatabase = initializeDatabase;
function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}
exports.getDatabase = getDatabase;
function closeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (db) {
            yield db.close();
            db = null;
            console.log('Database connection closed');
        }
    });
}
exports.closeDatabase = closeDatabase;
