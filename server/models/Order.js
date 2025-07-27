const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined'],
    default: 'Pending'
  },
  vendorName: String,
  sellerName: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
