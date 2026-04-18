import connectDB from "../../../lib/db";
import Notice from "../../../models/Notice";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        try {
            const notice = new Notice(req.body);
            await notice.save();
            return res.status(201).json(notice);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        try {
            const { targetAudience } = req.query;
            let filter = { isActive: true };
            if (targetAudience) filter.targetAudience = { $in: [targetAudience, "All"] };
            
            // Exclude expired notices
            filter.$or = [
                { expiryDate: { $exists: false } },
                { expiryDate: null },
                { expiryDate: { $gte: new Date() } }
            ];

            const notices = await Notice.find(filter).sort({ creationDate: -1 });
            return res.status(200).json(notices);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
