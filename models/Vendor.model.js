const { Schema, model } = require("mongoose");

const vendorSchema = new Schema({
  ProductInformation: {
    Product: {
      type: String,
      required: true,
    },
    StateofProduct: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    Label: {
      type: [String],
    },
    Usage: {
      type: [String],
    },
    Measures: {
      height: { type: Number, required: true },
      width: { type: Number, required: true },
      depth: { type: Number, required: true },
    },
    Weight: {
      type: Number,
      required: true,
    },
    Material: {
      type: [String],
    },
    UploadImage: {
      type: String,
      required: true,
    },
  },
  VendorInformation:{
    City: {
      type: String,
      required: true,
    },
    PostalCode: {
      type: Number,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Region: {
        type: String,
        required: true,
    },
    Colony: {
        type: String,
        required: true,
    },
    Specifications: {
        type: Boolean,
        required: true,
    }
  },
  PaymentInformation:{
    DeliveryAdoption: {
        type: Number,
        required: true,
        },
    BankDetails: {
        type: Number,
        required: true,
        },
    Name: {
        type: String,
        required: true,
        },
    }
    });


const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
