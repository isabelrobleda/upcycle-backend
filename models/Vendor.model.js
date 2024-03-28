const { Schema, model } = require("mongoose");

const vendorSchema = new Schema({
  PaymentInformation: {
    product: {
      type: String,
    },
    stateOfProduct: {
      type: String,
    },
    description: {
      type: String,
    },
    brand: {
      type: [String],
    },
    usage: {
      type: [String],
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    depth: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    material: {
      type: [String],
    },
    UploadImage: {
      type: String,
    },
  },

  VendorInformation: {
    city: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    address: {
      type: String,
    },
    region: {
      type: String,
    },
    colony: {
      type: String,
    },
    seVuela: {
      type: Boolean,
    },
  },

  PaymentInformation: {
    deliveryAdoption: {
      type: String,
    },
    bankDetails: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
});

const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
