const router = require("express").Router(); 
const Vendor = require("../models/Vendor.model");
const mongoose = require("mongoose");


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
router.post("/vendor-form", (req, res, next) => {
    const {
      ProductInformation: { Product, StateofProduct, Description, Label, Usage, Measures, Weight, Material, UploadImage },
      VendorInformation: { City, PostalCode, Address, Region, Colony, Specifications },
      PaymentInformation: { DeliveryAdoption, BankDetails, Name }
    } = req.body;
  
    const newVendor = {
      ProductInformation: { Product, StateofProduct, Description, Label, Usage, Measures, Weight, Material, UploadImage },
      VendorInformation: { City, PostalCode, Address, Region, Colony, Specifications },
      PaymentInformation: { DeliveryAdoption, BankDetails, Name }
    };
  
    Vendor.create(newVendor)
      .then(() => {
        res.json(newVendor);
      })
      .catch((err) => {
        res.status(500);
        console.log(err);
      });
  })

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