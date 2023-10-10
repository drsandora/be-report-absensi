const { FormateData } = require('../helper')
const { ReportRepository } = require('../database'); 
const { format } = require('date-fns');


class ReportService {

    constructor(){
        this.repository = new ReportRepository();
    }

    async addReport(userInputs){
        const { absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position } = userInputs;
        const addReport = await this.repository.CreateReport({ absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position });
        return FormateData(addReport );

    }

    async GetAllReport(){
        const data = await  this.repository.FindAllReport();
        data.forEach((item, index) => {
            item.waktu_absen = format(item.waktu_absen, 'dd-MM-yyyy HH:mm:ss');
          });
        return FormateData(data);
    }

    async getReport(payload){
        const { pegawai_id,  startDate, endDate } = payload;
        const data = await  this.repository.FindReportByPegawaiId({ pegawai_id , startDate, endDate});
        data.forEach((item, index) => {
            item.waktu_absen = format(item.waktu_absen, 'dd-MM-yyyy HH:mm:ss');
          });
        return FormateData(data);
    }


    async SubscribeEvents(payload){
 
        console.log('Triggering.... Report Events')
        const { event, data } =  payload;
        const { absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position} = data;

        switch(event){
            case 'CREATE_REPORT':
                this.addReport({absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position});
                break;
            default:
                break;
        }
 
    }

}

module.exports = ReportService;
