

class report {
    constructor(absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position) {
      this.absensi_id = absensi_id;
      this.pegawai_id = pegawai_id;
      this.nama_pegawai = nama_pegawai;
      this.status_absen_nama = status_absen_nama;
      this.waktu_absen = waktu_absen;
      this.email = email;
      this.position = position;
    }
async save() {
        const { ReportConnection } = require('../index'); 
        const insertQuery = `
          INSERT INTO reportabsen_v (absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position;
        `;
        try {
          const result = await ReportConnection.one(insertQuery, [
            this.absensi_id, this.pegawai_id, this.nama_pegawai,
            this.status_absen_nama, this.waktu_absen, this.email, this.position,
        ]);
          return result;
        } catch (error) {
            return error.message;
        }
      }
}


async function FindReportByPegawaiId(payload) {
    const { ReportConnection } = require('../index'); 
    const { pegawai_id,  startDate, endDate } = payload;
    const query = {
        text: `SELECT * FROM reportabsen_v WHERE pegawai_id = $1 AND waktu_absen BETWEEN $2 AND $3 ORDER BY waktu_absen ASC`,
        values: [pegawai_id, startDate+' 00:00:00 ', endDate+' 23:59:59'],
    };
    try {
        const result = await ReportConnection.query(query);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error finding user');
    }
}


async function FindAllReport() {
    const { ReportConnection } = require('../index'); 
    const query = {
        text: `SELECT * FROM reportabsen_v ORDER BY resumeabsen_id ASC`,
    };

    try {
        const result = await ReportConnection.query(query);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error finding user');
    }
}


module.exports = {
report,
FindAllReport,
FindReportByPegawaiId,
};

