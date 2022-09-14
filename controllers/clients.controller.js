const clientsService = require("../services/clients.service");
const db = require("../config/db.config.js");

exports.register = (req, res, next) => {
    const data = { 
        name: req.body.name,
        phone:req.body.phone,
        court: req.body.court,


    };
    clientsService.register(data, (error, results)=>{
        if(error){
            console.log(error)
            return res.status(400).send({success:0, data: "bad request"});
        } return res.status(200).send({success:1, data: results})
    });
},
exports.getAllClients = (req, res, next) => {
    const data = {};
    clientsService.getAllClients(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ success: 0, data: "bad request" });
      }
      return res.status(200).send({ success: 1, data: results });
    });
  };

  exports.getClientPayments = (req, res, next) => {
    const data = {
        client: req.params.client
    };
    clientsService.getClientPayments(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ success: 0, data: "bad request" });
      }
      return res.status(200).send({ success: 1, data: results });
    });
  };

  