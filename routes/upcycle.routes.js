const router = require("express").Router();
const Vendor = require("../models/Vendor.model");
const upload = require("../middleware/upload");
const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "isabel.robleda@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (formData, files) => {
  
    const { FirstForm, ProductInformation, VendorInformation, PaymentInformation } = formData;
    
    const mailOptions = {
      from: "hola@upcyclemex.com",
      to: "hola@upcyclemex.com", 
      subject: "Upcycle Forma Vendedor",
      text: `Datos del Vendedor:
      \nUrgencia: ${FirstForm ? FirstForm.Urgency : "N/A"}
      \nFundación a Donar: ${FirstForm ? FirstForm.FoundationToDonate : "N/A"
      }\nProducto: ${
        ProductInformation ? ProductInformation.product : "N/A"
      }\nDescripcion: ${
        ProductInformation ? ProductInformation.description : "N/A"
      }\nEstado del Producto: ${
        ProductInformation ? ProductInformation.stateOfProduct : "N/A"
      }\nMarca: ${ProductInformation ? ProductInformation.brand : "N/A"
      }\nUso: ${ProductInformation ? ProductInformation.usage : "N/A"
      }\nAlto en cm: ${ProductInformation ? ProductInformation.height : "N/A"
      }\nLargo en cm: ${ProductInformation ? ProductInformation.width : "N/A"
      }\nAncho en cm: ${ProductInformation ? ProductInformation.depth : "N/A"
      }\nPeso en kg: ${ProductInformation ? ProductInformation.weight : "N/A"
      }\nPrecio si fuera nuevo: ${ProductInformation ? ProductInformation.priceInput : "N/A"
      }\nPrecio deseado: ${ProductInformation ? ProductInformation.desiredSellingPrice : "N/A"
      }\nPrecio aproximado: ${ProductInformation ? ProductInformation.approxSellingPrice : "N/A"
      }\nCiudad: ${VendorInformation ? VendorInformation.city : "N/A"
      }\nCódigo Postal: ${VendorInformation ? VendorInformation.postalCode : "N/A"
      }\nCalle: ${VendorInformation ? VendorInformation.address : "N/A"
      }\nAlcaldía: ${VendorInformation ? VendorInformation.region : "N/A"
      }\nColonia: ${VendorInformation ? VendorInformation.colony : "N/A"
      }\nLink Mapa: ${VendorInformation ? VendorInformation.map : "N/A"
      }\nSe Vuela: ${VendorInformation ? VendorInformation.seVuela : "N/A"
      }\nNo. pisos a volar: ${VendorInformation ? VendorInformation.floors : "N/A"
      }\nElevador: ${VendorInformation ? VendorInformation.elevator : "N/A"
      }\nNo. pisos sin elevador: ${VendorInformation ? VendorInformation.noElevatorFloors : "N/A"
      }\nSe desarma: ${VendorInformation ? VendorInformation.elevator : "N/A"
      }\nCelular: ${PaymentInformation ? PaymentInformation.phone : "N/A"
      }\nEmail: ${PaymentInformation ? PaymentInformation.name : "N/A"
      }\nNombre Completo: ${PaymentInformation ? PaymentInformation.fullName : "N/A"
      }
      `,
      attachments: files.map((file) => {
        return {
          filename: file.originalname,
          path: file.path,
        };
      }),
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        reject(err);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
};

router.post("/vendor-form", upload.array("UploadImages", 10), (req, res, next) => {
  

  const { FirstForm, ProductInformation, VendorInformation, PaymentInformation } = req.body;
  
  const files = req.files;

   if (files) {
    files.forEach((file) => {
      console.log(file.path);
    });
  }

  Vendor.create({
    FirstForm: req.body.FirstForm || {},
    ProductInformation: req.body.ProductInformation || {},
    VendorInformation: req.body.VendorInformation || {},
    PaymentInformation: req.body.PaymentInformation || {},
  })
    .then((newVendor) => {
      sendEmail(
        {
          FirstForm: req.body.FirstForm || {},
          ProductInformation: req.body.ProductInformation || {},
          VendorInformation: req.body.VendorInformation || {},
          PaymentInformation: req.body.PaymentInformation || {},
        },
        req.files
      );
        res.json(newVendor); 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error occurred while uploading file");
    });
});

module.exports = router;
