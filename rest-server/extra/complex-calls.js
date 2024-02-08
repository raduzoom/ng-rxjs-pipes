const fileHelpers = require("../node-helpers/file-helpers.util");
const https = require("https");
const fs = require("fs");


var viewSessionPath = `${__dirname}/tmp/document_viewingSessionId`;
/**
 *
 * @param {core.Express} app
 */
function setupComplexCalls(app) {

  app.get("/store-document-open-cookie", async (req, res) => {


    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    try {
      const opts = await fileHelpers.readProxy("POST", `/documents/2061/open`);

      opts.body = "{\"formName\":null,\"regenerateIdentifier\":false,\"pdfPassword\":null}";

      var reqProxy = https.get(opts, function(res2) {

        // console.log(res2);
        let buildString = "";
        // console.log('hmm');
        res2.on("data", function(d) {
          // console.log('data:', d.toString());
          buildString += d.toString();
        });

        res2.on("end", function() {
          // console.log('hmm');
          res.setHeader("Content-Type", "application/json");
          res.status(200);
          var resJson = JSON.parse(buildString);
          console.log(resJson.viewingSessionId);
          res.cookie("document_viewingSessionId", resJson.viewingSessionId);
          fs.writeFileSync(viewSessionPath, resJson.viewingSessionId);
          res.send(buildString);
        });

      });
      reqProxy.on("error", function(err) {
        console.log("error: " + err);
      });
    } catch (e) {
      console.log("e - ", e);
    }
  });
  app.get("/forms", async (req, res) => {
    console.log("req - ", req.query);
    res.setHeader("Content-Type", "application/json");
    // res.send('[2]')

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    if (req.query.pageNumber === "3") {
      const opts = await fileHelpers("GET", `/forms?pageNumber=1&pageSize=${req.query.pageSize}`);
      var reqProxy = https.get(opts, function(res2) {

        let buildString = "";
        console.log("hmm");
        res2.on("data", function(d) {
          console.log("data:", d.toString());
          buildString += d.toString();
        });

        res2.on("end", function() {
          console.log("hmm");
          res.send(buildString);
        });
      });
      reqProxy.on("error", function(err) {
        console.log("error: " + err);
      });

      return;
    }

    const filename = "form-list.json";
    fileHelpers.readFile(__dirname, filename, res);


  });



  app.post("/documents/:id/open", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    console.log("params", req.params);

    const filename = "form/documents-id-open.json";

    const viewSession = fs.readFileSync(__dirname, viewSessionPath,
      { encoding: "utf8", flag: "r" });

    let data = await fileHelpers.readFileSync(__dirname, filename, res);

    if (viewSession) {
      data = data.replace("{{doc_view_session_id}}", viewSession);

    }
    res.status(200);
    res.send(data);
  });
  app.post("/forms/open", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    console.log("params", req.params);

    const filename = "forms-open.json";

    const viewSession = fs.readFileSync(__dirname, viewSessionPath,
      { encoding: "utf8", flag: "r" });

    let data = await fileHelpers.readFileSync(__dirname, filename, res);

    if (viewSession) {
      data = data.replace("{{doc_view_session_id}}", viewSession);

    }
    res.status(200);
    res.send(data);
  });
}

module.exports.setupComplexCalls = setupComplexCalls;
