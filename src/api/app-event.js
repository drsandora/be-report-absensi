const ReportRepository = require("../services/report-service");
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true }));
    const service = new ReportRepository();

    app.use('/app-events', async (req,res,next) => {

        const { payload } = req.body;
        service.SubscribeEvents(payload);
        res.json(payload);

    });

}
