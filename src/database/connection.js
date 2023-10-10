const {
  CONNECTION
} = require("../config");

const pgp = require('pg-promise')();

const db = pgp(CONNECTION);



module.exports = db;
// SQL query to create the schema

const createTableQuery1 = `
    CREATE TABLE IF NOT EXISTS reportabsen_v (
    resumeabsen_id SERIAL PRIMARY KEY,
    absensi_id INT,
    pegawai_id INT,
    nama_pegawai VARCHAR(255),
    status_absen_nama VARCHAR(255),
    waktu_absen TIMESTAMP,
    email VARCHAR(255),
    position VARCHAR(255)
    );

`;


async function createSchema() {
  try {
    await db.connect();
    await db.query(createTableQuery1);
    console.log('Schema created successfully.');
  } catch (error) {
    console.error('Error creating schema:', error);
  } 
}

createSchema();
