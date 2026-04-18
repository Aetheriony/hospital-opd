import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: Number, default: 0 },
    resumeUrl: { type: String }, // Link to cloud storage or file path
    status: { type: String, enum: ["Pending", "Reviewed", "Interviewed", "Rejected", "Hired"], default: "Pending" }
}, { timestamps: { createdAt: 'applicationDate', updatedAt: 'lastUpdated' } });

export default mongoose.models.Applicant || mongoose.model("Applicant", ApplicantSchema);
