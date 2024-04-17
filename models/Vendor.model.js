const { Schema, model } = require("mongoose");

const vendorSchema = new Schema({
  
  FirstForm: {
    Urgency: {
      type: String,
    },
  
    FoundationToDonate: {
      type: String,
    },
  },

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
    priceInput: {
      type: String,
    },
    desiredSellingPrice: {
      type: String,
    },
    approxSellingPrice: {
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
    elevator: {
      type: Boolean,
    },
    noElevatorFloors: {
      type: Number,
    },
    dismantle: {
      type: Boolean,
    },
    seVuela: {
      type: Boolean,
    },
    floors: {
      type: Number,
    },
    map: {
      type: String,
    },
  },

  PaymentInformation: {
    nameOfHolder: {
      type: String,
    },
    bankDetails: {
      type: Number,
    },
    accountNumber: {
      type: String,
    },
    nameOfBank: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    fullName: {
      type: String,
    },
    nationality: {
      type: [String],
    },
    gender: {
      type: [String],
    },
    birthDate: {
      type: Date,
    },
    reasonOfSale: {
      type: [String],
    }
  },
});

const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
