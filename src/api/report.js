const ReportService = require('../services/report-service');
const bodyParser = require('body-parser');
const { PublishPegawaiEvent } = require('../helper/index.js')
const moment = require('moment');

module.exports = (app, channel) => {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true }));
    const service = new ReportService();

    app.get('/getAllReport' , async (req,res) => {
        try {
            const { data } = await service.GetAllReport();
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const startIdx = (page - 1) * pageSize;
            const endIdx = startIdx + pageSize;
            const itemsOnPage = data.slice(startIdx, endIdx);
            const totalPages = Math.ceil(data.length / pageSize);
          
            res.status(200).json({
              data: itemsOnPage,
              total_data: data.length,
              currentPage: page,
              totalPages: totalPages,
            });
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    });

    app.get('/getReport' , async (req,res) => {
        try {
            const { pegawai_id } = req.query;
            const { startDate } = req.query || '2023-10-01 00:00:00';
            const { endDate } = req.query || '2023-10-30 23:59:35';
            const { page } = req.query || 1;
            const { pageSize } = req.query || 10;
            const { data } = await service.getReport({ pegawai_id, startDate, endDate });
            const startIdx = (page - 1) * pageSize;
            const endIdx = startIdx + pageSize;
            const itemsOnPage = data.slice(startIdx, endIdx);
            const totalPages = Math.ceil(data.length / pageSize);
          
            res.status(200).json({
              data: itemsOnPage,
              total_data: data.length,
              currentPage: page,
              totalPages: totalPages,
            });

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    });


    app.post('/addReport',  async (req,res,next) => {
        try {
            const { absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position } = req.body;
            const { data } = await service.addReport({ absensi_id, pegawai_id, nama_pegawai, status_absen_nama, waktu_absen, email, position });
            if(!data) return;
            res.json(data);
        } catch (error) {
            return res.status(500).json({message: error.message})
        }

    });
}
