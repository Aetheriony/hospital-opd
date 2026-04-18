const BASE_URL = 'http://localhost:3000/api';

async function post(endpoint, body) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.ok) {
            console.log(`✅ Seeded: ${endpoint} (${body.name || body.title || body.testName || body.bedNumber || 'Data'})`);
            return data;
        } else {
            console.error(`❌ Failed ${endpoint}:`, data);
            return null;
        }
    } catch (err) {
        console.error(`💥 Error seeding ${endpoint}:`, err.message);
        return null;
    }
}

async function seed() {
    console.log('🌱 Information System Seeding Started...\n');

    console.log('--- Seeding Doctors ---');
    const d1 = await post('/doctors', { name: "Dr. Alice Sharma", department: "Cardiology", contact: "9988776655", consultationFee: 800 });
    const d2 = await post('/doctors', { name: "Dr. Bob Mehta", department: "Orthopedics", contact: "8877665544", consultationFee: 600 });
    const d3 = await post('/doctors', { name: "Dr. Clara Kent", department: "Pediatrics", contact: "7766554433", consultationFee: 500 });

    console.log('\n--- Seeding Patients ---');
    await post('/patients', { name: "Rahul Singh", age: 45, gender: "Male", contact: "9000000001", doctorId: d1?._id, department: "Cardiology" });
    await post('/patients', { name: "Sita Devi", age: 62, gender: "Female", contact: "9000000002", doctorId: d2?._id, department: "Orthopedics" });
    await post('/patients', { name: "Master Aryan", age: 8, gender: "Male", contact: "9000000003", doctorId: d3?._id, department: "Pediatrics" });

    console.log('\n--- Seeding Pharmacy ---');
    await post('/pharmacy/inventory', { name: "Amoxicillin", genericName: "Antibiotic", batchNumber: "AMX001", expiryDate: "2026-10-15", mrp: 120, stockQuantity: 500, reorderLevel: 50 });
    await post('/pharmacy/inventory', { name: "Ibuprofen", genericName: "Painkiller", batchNumber: "IBU099", expiryDate: "2025-05-20", mrp: 45, stockQuantity: 200, reorderLevel: 30 });
    await post('/pharmacy/inventory', { name: "Cough Syrup", genericName: "Expectorant", batchNumber: "CS123", expiryDate: "2024-12-01", mrp: 90, stockQuantity: 15, reorderLevel: 20 });

    console.log('\n--- Seeding Lab Catalog ---');
    await post('/labs/catalog', { testName: "Complete Blood Count (CBC)", category: "Pathology", price: 350, normalRange: "Various" });
    await post('/labs/catalog', { testName: "Chest X-Ray", category: "Radiology", price: 1200, normalRange: "Normal/Abnormal" });
    await post('/labs/catalog', { testName: "Lipid Profile", category: "Pathology", price: 800, normalRange: "Healthy/At-risk" });

    console.log('\n--- Seeding IPD Beds ---');
    await post('/ipd/beds', { wardName: "A-Ward (ICU)", bedNumber: "ICU-01", type: "ICU", pricePerDay: 5000 });
    await post('/ipd/beds', { wardName: "A-Ward (ICU)", bedNumber: "ICU-02", type: "ICU", pricePerDay: 5000 });
    await post('/ipd/beds', { wardName: "B-Ward (General)", bedNumber: "GEN-101", type: "General", pricePerDay: 1200 });
    await post('/ipd/beds', { wardName: "B-Ward (General)", bedNumber: "GEN-102", type: "General", pricePerDay: 1200 });

    console.log('\n--- Seeding Website CMS ---');
    await post('/website/notices', { title: "Blood Donation Camp", content: "Join us on April 25th for our annual blood donation drive.", targetAudience: "Public" });
    await post('/website/notices', { title: "New OPD Timings", content: "Effective from next Monday, OPD will start at 8:00 AM.", targetAudience: "Patients" });

    console.log('\n--- Seeding Hiring ---');
    await post('/hiring/jobs', { title: "Resident Medical Officer", department: "Emergency", description: "Looking for an RMO for night shifts.", requirements: ["MBBS", "2+ years experience"] });
    await post('/hiring/jobs', { title: "Lead Pharmacist", department: "Pharmacy", description: "Manage the central drug store and pharmacy operations.", requirements: ["B.Pharm/M.Pharm", "5+ years experience"] });

    console.log('\n✨ Seeding Complete. The platform is ready for demonstration!');
}

seed();
