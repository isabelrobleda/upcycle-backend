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
  
    const { ProductInformation, VendorInformation, PaymentInformation } = formData;

    const mailOptions = {
      from: "upcyclevendor@gmail.com",
      to: "isabel.robleda@gmail.com", // Change this to the recipient's email address
      subject: "Upcycle Vendor Form",
      text: `Form Data:\nProduct: ${
        ProductInformation ? ProductInformation.product : "N/A"
      }\nDescription: ${
        ProductInformation ? ProductInformation.description : "N/A"
      }\nState of Product: ${
        ProductInformation ? ProductInformation.stateOfProduct : "N/A"
      }\nBrand: ${ProductInformation ? ProductInformation.brand : "N/A"
      }\nUsage: ${ProductInformation ? ProductInformation.usage : "N/A"
      }\nHeight: ${ProductInformation ? ProductInformation.height : "N/A"
      }\nWidth: ${ProductInformation ? ProductInformation.width : "N/A"
      }\nDepth: ${ProductInformation ? ProductInformation.depth : "N/A"
      }\nWeight: ${ProductInformation ? ProductInformation.weight : "N/A"
      }\nMaterial: ${ProductInformation ? ProductInformation.material : "N/A"
      
      }\nCity: ${VendorInformation ? VendorInformation.city : "N/A"
      }\nPostal Code: ${VendorInformation ? VendorInformation.postalCode : "N/A"
      }\nAddress: ${VendorInformation ? VendorInformation.address : "N/A"
      }\nRegion: ${VendorInformation ? VendorInformation.region : "N/A"
      }\nColony: ${VendorInformation ? VendorInformation.colony : "N/A"
      }\nSpecifications: ${VendorInformation ? VendorInformation.seVuela : "N/A"
      }
      
      \nDelivery Adoption: ${
        PaymentInformation ? PaymentInformation.deliveryAdoption : "N/A"
      }\nCLABE: ${
        PaymentInformation ? PaymentInformation.bankDetails : "N/A"
      }\nName: ${PaymentInformation ? PaymentInformation.name : "N/A"}`,

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

router.post("/vendor-form", upload.array("UploadImages", 5), (req, res, next) => {
  const { ProductInformation, VendorInformation, PaymentInformation } = req.body;

  const files = req.files;

   if (files) {
    files.forEach((file) => {
      console.log(file.path);
    });
  }

  Vendor.create({
    ProductInformation: req.body.ProductInformation || {},
    VendorInformation: req.body.VendorInformation || {},
    PaymentInformation: req.body.PaymentInformation || {},
  })
    .then((newVendor) => {
      sendEmail(
        {
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
