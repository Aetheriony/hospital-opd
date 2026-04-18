import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    targetAudience: { type: String, enum: ["Public", "Staff", "Doctors", "Patients", "All"], default: "Public" },
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdated' } });

export default mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
