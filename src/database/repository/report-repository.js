
const { ReportModel } = require('../models');

class ReportRepository {

    async CreateReport(payload){
        const { absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position } = payload;
        const user = new ReportModel.report(
            absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position
        )
        const userResult = await user.save();
        return userResult;
    }

    async FindReportByPegawaiId(payload){
        const { pegawai_id,  startDate, endDate } = payload;
        const existingPegawai = await ReportModel.FindReportByPegawaiId({ pegawai_id,  startDate, endDate });
        return existingPegawai;
    }

    async FindAllReport(){

        const existingPegawai = await ReportModel.FindAllReport();
        return existingPegawai;
    }
}

module.exports = ReportRepository;
