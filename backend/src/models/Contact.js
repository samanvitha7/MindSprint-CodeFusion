import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;   // ✅ default export
