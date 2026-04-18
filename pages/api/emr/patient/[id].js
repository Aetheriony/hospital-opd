import connectDB from "../../../../lib/db";
import Patient from "../../../../models/Patient";
import Prescription from "../../../../models/Prescription";
import Appointment from "../../../../models/Appointment";

export default async function handler(req, res) {
    await connectDB();
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const patient = await Patient.findById(id).populate('doctor', 'name department');
            if (!patient) return res.status(404).json({ error: "Patient not found" });

            const prescriptions = await Prescription.find({ patient: id })
                .populate('doctor', 'name department')
                .sort({ creationDate: -1 });

            const pastAppointments = await Appointment.find({ patient: id })
                .populate('doctor', 'name department')
                .sort({ appointmentDate: -1 });

            return res.status(200).json({
                patient,
                prescriptions,
                pastAppointments
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
