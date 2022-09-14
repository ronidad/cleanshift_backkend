const db = require("../config/db.config");

(exports.register = (data, callback) => {
  db.query(
    `INSERT INTO clients (name, phone, court, reg_date)
        VALUES(?, ?, ?, ?)`,
    [data.name, data.phone, data.court, new Date()],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, "client added successfully");
    }
  );
}),
  (exports.getAllClients = (data, callback) => {
    db.query(`SELECT * FROM clients`, [], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  }),
  (exports.getClientPayments = (data, callback) => {
    db.query(
      `SELECT payments.id as payment_id, clients.name, clients.id as client_id, payments.amount, payments.payment_date FROM payments INNER JOIN clients on payments.client_id = clients.id where clients.id =?`,
      [data.client],

      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  });


