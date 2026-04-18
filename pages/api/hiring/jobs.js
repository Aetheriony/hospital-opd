import connectDB from "../../../lib/db";
import Job from "../../../models/Job";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        try {
            const job = new Job(req.body);
            await job.save();
            return res.status(201).json(job);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        try {
            const { department, includeInactive } = req.query;
            let filter = {};
            
            if (includeInactive !== 'true') filter.isActive = true;
            if (department) filter.department = department;

            const jobs = await Job.find(filter).sort({ creationDate: -1 });
            return res.status(200).json(jobs);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
