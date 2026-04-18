import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, default: 'Hybrid' },
    type: { type: String, enum: ["Full-time", "Part-time", "Contract"], default: "Full-time" },
    description: { type: String, required: true },
    requirements: [String],
    badges: [String],
    isActive: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdated' } });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
