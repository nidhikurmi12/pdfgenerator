const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const pdfTemplate = require("./documents");
const morgan = require('morgan')
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("combined"))


app.get('/',(req,res)=>{
  res.status(200).send({ message: "This is home page",  });
})


// POST Route - PDF Generation and fetching the data
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("certificate.pdf", (err) => {
    if (err) {
      res.status(500).send({ message: "PDF generation failed", error: err });
    } else {
      res.status(200).send({ message: "PDF successfully created" });
    }
  });
});

// GET Route - Send generated PDF to the client
app.get("/fetch-pdf", (req, res) => {
  const filePath = `${__dirname}/certificate.pdf`;
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send({ message: "Failed to send PDF", error: err });
    }
  });
});

app.listen(port, () => console.log(`Listening on Port ${port}`));
