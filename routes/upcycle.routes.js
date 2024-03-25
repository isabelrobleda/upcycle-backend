const router = require("express").Router(); 
const Vendor = require("../models/Vendor.model");
const mongoose = require("mongoose");
const upload = require("../middleware/upload");
const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'isabel.robleda@gmail.com',
    pass: 'uhrs oejz vwkv qtjb'
  }
});

const sendEmail = (formData, files) => {

  const {
    ProductInformation,
    VendorInformation,
    PaymentInformation,
  } = formData;

  const mailOptions = {
    from: "upcyclevendor@gmail.com",
    to: "isabel.robleda@gmail.com", // Change this to the recipient's email address
    subject: "Upcycle Vendor Form",
    text: `Form Data:\nProduct: ${ProductInformation ? ProductInformation.Product : 'N/A'}\nDescription: ${ProductInformation ? ProductInformation.Description : 'N/A'}\nState of Product: ${ProductInformation ? ProductInformation.StateofProduct : 'N/A'}\nVendor Information: ${VendorInformation ? `${VendorInformation.City}, ${VendorInformation.PostalCode}, ${VendorInformation.Address}, ${VendorInformation.Region}, ${VendorInformation.Colony}, ${VendorInformation.Specifications}` : 'N/A'}\nPayment Information: ${PaymentInformation ? `${PaymentInformation.DeliveryAdoption}, ${PaymentInformation.BankDetails}, ${PaymentInformation.Name}` : 'N/A'}`,
    attachments: files.map((file) => ({
      filename: file.originalname,
      content: fs.readFileSync(file.path), 
      encoding: 'base64' // Set encoding to base64
    })),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
  //GET /vendor-form/

router.get("/vendor-form", (req, res) => {
    Vendor.find()
      .then((vendor) => {
        console.log("Retrieved vendor ->", vendor);
        res.json(vendor);
      })
      .catch((error) => {
        console.error("Error while retrieving vendor ->", error);
        res.status(500).send({ error: "Failed to retrieve vendor" });
      });
  }
); 

//GET /vendor-form/:vendorId

router.get("/vendor-form/:vendorId", (req, res) => {
    const { vendorId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Vendor.findById(vendorId)
      .then((vendor) => {
        console.log("Retrieved vendor ->", vendor);
        res.json(vendor);
      })
      .catch((error) => {
        console.error("Error while retrieving vendor ->", error);
        res.status(500).send({ error: "Failed to retrieve vendor" });
      });
  
});

//POST /vendor-form
router.post("/vendor-form", upload.array("UploadImages", 5), (req, res, next) => {
  const {
    ProductInformation,
    VendorInformation,
    PaymentInformation,
  } = req.body;

  const files = req.files;

  if (files) {
    files.forEach((file) => {
      console.log(file.path);
    });
  }

  Vendor.create({ ProductInformation, VendorInformation, PaymentInformation })
    .then((newVendor) => {

       // Send email with form data
       sendEmail({ ProductInformation, VendorInformation, PaymentInformation }, req.files);
       res.json(newVendor);

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error occurred while uploading file");
    });
});

//PUT /vendor-form/:vendorId
router.put("/vendor-form/:vendorId", (req, res) => {
    const { vendorId } = req.params;
    const {
      ProductInformation: { Product, StateofProduct, Description, Label, Usage, Measures, Weight, Material, UploadImage },
      VendorInformation: { City, PostalCode, Address, Region, Colony, Specifications },
      PaymentInformation: { DeliveryAdoption, BankDetails, Name }
    } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Vendor.findByIdAndUpdate(
      vendorId,
      {
        ProductInformation: { Product, StateofProduct, Description, Label, Usage, Measures, Weight, Material, UploadImage },
        VendorInformation: { City, PostalCode, Address, Region, Colony, Specifications },
        PaymentInformation: { DeliveryAdoption, BankDetails, Name }
      },
      { new: true }
    )
      .then((vendor) => {
        res.json(vendor);
      })
      .catch((error) => {
        console.error("Error while updating vendor ->", error);
        res.status(500).send({ error: "Failed to update vendor" });
      });
  });

//DELETE /vendor-form/:vendorId
router.delete("/vendor-form/:vendorId", (req, res) => {
    const { vendorId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Vendor.findByIdAndDelete(vendorId)
      .then(() => {
        res.json({ message: `Vendor with id ${vendorId} is removed successfully.` });
      })
      .catch((error) => {
        console.error("Error while removing vendor ->", error);
        res.status(500).send({ error: "Failed to remove vendor" });
      });
  });



module.exports = router;