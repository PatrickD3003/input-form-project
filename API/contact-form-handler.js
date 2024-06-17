const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DbPath = path.join(__dirname, "../Data/db.sqlite");

const handleContactForm = {
  postMessage: async (req, res) => {
    const body_ = await req.body;
    console.log(body_);
    // TODO: biar databasenya gak dipanggil everytime, find a way biar gak dipanggil terus"
    // keyword : session storage
    const db = new sqlite3.Database(DbPath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log("Error happened at opening the DB connection: ", err);
        res.send({ Message: "Something went wrong, please try again." });
        return;
      }

      console.log("Connected to DB Successfully.");

      const checkQuery =
        "SELECT COUNT(*) AS count FROM contact_form WHERE Customer_Name = ?";
      db.get(checkQuery, [body_.Name], (err, row) => {
        if (err) {
          console.log("Error checking for existing customer name: ", err);
          res.send({ Message: "Something went wrong, please try again." });
          db.close();
          return;
        }

        if (row.count > 0) {
          res.send({
            Message:
              "Customer name already exists. Please use a different name.",
          });
          db.close();
          return;
        }

        const queryStr =
          "INSERT INTO contact_form (Customer_Name, Loan_Limit, Ongoing_Loan, Payment_Frequency) VALUES (?, ?, ?, ?)";
        db.run(
          queryStr,
          [
            body_.name,
            body_.loanLimit,
            body_.ongoingLoan,
            body_.paymentFrequency,
          ],
          (err) => {
            if (err) {
              console.log("Error happened at adding data to the DB: ", err);
              res.send({ Message: "something wrong!" });
            } else {
              res.sendFile(path.join(__dirname, "../client/inputNew.html"));

              // res.send({ Message: "Thank you for submitting" });
            }
            db.close((err) => {
              if (err) {
                console.error("Error closing the database connection:", err);
              }
              console.log("Database connection closed.");
            });
          }
        );
      });
    });
  },

  getAllMessages: async (req, res) => {
    console.log("Fetching all messages...");
    const db = new sqlite3.Database(DbPath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log("Error happened at opening the DB connection: ", err);
        res.send({ Message: "Something went wrong, please try again." });
        return;
      }

      const queryStr = "SELECT * FROM contact_form";
      db.all(queryStr, [], (err, rows) => {
        if (err) {
          console.log("Error happened at fetching data from the DB: ", err);
          res.send({ Message: "Something went wrong, please try again." });
        } else {
          console.log("Fetched data: ", rows);
          res.json(rows);
        }
        db.close((err) => {
          if (err) {
            console.error("Error closing the database connection:", err);
          }
          console.log("Database connection closed.");
        });
      });
    });
  },

  deleteMessage: async (req, res) => {
    const message = req.params.customerName;

    const db = new sqlite3.Database(DbPath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log("Error happened at opening the DB connection: ", err);
        res.send({ Message: "Something went wrong, please try again." });
        return;
      }

      console.log("Connected to DB Successfully.");

      const deleteQuery = "DELETE FROM contact_form WHERE Customer_Name = ?";
      db.run(deleteQuery, [message], function (err) {
        if (err) {
          console.log("Error happened at deleting data from the DB: ", err);
          res.send({
            Message:
              "An error occurred while deleting the data. Please try again.",
          });
        } else if (this.changes === 0) {
          res.send({ Message: "No record found with the provided Name." });
        } else {
          res.send({ Message: "Data deleted successfully." });
        }
        db.close((err) => {
          if (err) {
            console.error("Error closing the database connection:", err);
          }
          console.log("Database connection closed.");
        });
      });
    });
  },

  editData: async (req, res) => {
    const customerData = req.body;

    const db = new sqlite3.Database(DbPath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log("Error happened at opening the DB connection: ", err);
        res.send({ Message: "Something went wrong, please try again." });
        return;
      }

      console.log("Connected to DB Successfully.");

      const editQuery = `
                UPDATE contact_form
                SET Loan_Limit = ?, Ongoing_Loan = ?, Payment_Frequency = ?
                WHERE Customer_Name = ?
            `;
      // customerData = {customerName, loanLimit, ongoingLoan, paymentFrequency};
    //   body_.name,
    //   body_.loanLimit,
    //   body_.ongoingLoan,
    //   body_.paymentFrequency,
      db.run(
        editQuery,
        [
          customerData.loanLimit,
          customerData.ongoingLoan,
          customerData.paymentFrequency,
          customerData.name,
        ],
        function (err) {
          if (err) {
            console.log("Error happened at deleting data from the DB: ", err);
            res.send({
              Message:
                "An error occurred while deleting the data. Please try again.",
            });
          } else if (this.changes === 0) {
            res.send({ Message: "No record found with the provided Name." });
          } else {
            res.sendFile(path.join(__dirname, "../client/customerData.html"));
          }
          db.close((err) => {
            if (err) {
              console.error("Error closing the database connection:", err);
            }
            console.log("Database connection closed.");
          });
        }
      );
    });
  },
};

module.exports = handleContactForm;
