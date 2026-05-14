# Hospital OPD Management System

![image](https://github.com/user-attachments/assets/3d7973ec-6c88-4bb0-9f9d-bdd6ea21bab4)

## Description

This is a web application built with Next.js for managing Outpatient Department (OPD) activities in a hospital. The application allows for scheduling appointments, managing patient records, and providing an interface for doctors and staff to handle daily operations efficiently.


## Technologies Used

- **Next.js**: React framework for server-rendered applications.
- **JavaScript**: Main programming language.
- **CSS**: Styling of the application.
- **Node.js**: Backend server.
- **MongoDB**: Database for storing patient records and appointments.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yhimanshu22/hospital-opd.git
```

2. Navigate to the project directory:

```bash
cd hospital-opd
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a `.env.local` file in the root directory and add the following variables:

```env
# Database (use either name — the app reads both)
MONGO_URI=<your_mongodb_connection_string>
# or: MONGODB_URI=<your_mongodb_connection_string>

# Required for sign-in (JWT cookie)
JWT_SECRET=<a_long_random_string>

NEXT_PUBLIC_API_KEY=<your_api_key>
```

5. Start the development server: 

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## MongoDB Atlas & Vercel (fix signup / `ENOTFOUND` / connection errors)

Do this in the [MongoDB Atlas](https://cloud.mongodb.com) UI (it cannot be done from this repo alone).

1. **Use a current connection string**  
   **Database** → your cluster → **Connect** → **Drivers** → copy the **`mongodb+srv://...`** URI. Replace `<password>` with your database user password.  
   If tools report **`Non-existent domain`** / **`querySrv ENOTFOUND`** for your hostname, the cluster was removed/renamed or the URI is outdated—copy a fresh URI from Atlas, do not reuse an old host. **Network Access (`0.0.0.0/0`) does not fix a hostname that does not exist in DNS**—you must replace `MONGO_URI` with the host Atlas shows today, then update **Vercel → Environment Variables** and **Redeploy**.

2. **Network Access (allow Vercel / the internet)**  
   **Network Access** → **Add IP Address** → choose **Allow Access from Anywhere** → enter **`0.0.0.0/0`** → **Confirm**. Wait until the entry is **Active** (about one minute).  
   (Tighter IP lists are possible but do not work well with Vercel’s changing outbound IPs unless you use Atlas–Vercel integration or Private Endpoint.)

3. **Database user**  
   **Database Access** → ensure a user exists with a known password and **Read and write to any database** (or appropriate custom role) → password must match what you put in the URI.

4. **Cluster not paused**  
   On M0/M2/M5, open the cluster and **Resume** if Atlas shows it paused.

5. **Vercel**  
   Vercel project → **Settings** → **Environment Variables** → set **`MONGO_URI`** or **`MONGODB_URI`** for **Production** (and **Preview** if you use preview URLs) → **Redeploy** the latest deployment.


## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.


![image](https://github.com/user-attachments/assets/3d7973ec-6c88-4bb0-9f9d-bdd6ea21bab4)  

![image](https://github.com/user-attachments/assets/41d0245b-3296-431f-87cc-844b065dee03)  

![image](https://github.com/user-attachments/assets/73af021c-bb25-4f5e-90ef-fd84ce1639ee)  

![image](https://github.com/user-attachments/assets/48a68b88-b24b-4c87-90cb-e6996ecf4c3a)  

![image](https://github.com/user-attachments/assets/2e8fd378-4402-4550-b240-8d2643474a8b)  

![image](https://github.com/user-attachments/assets/c42b84a5-d4d1-4320-8cda-63ef587f0cba)  

![image](https://github.com/user-attachments/assets/5c6aba61-bbd7-4ec7-abfd-75dee0df5c60)  

![image](https://github.com/user-attachments/assets/9f981c96-b15b-4950-859e-e090a100ab25)  

![image](https://github.com/user-attachments/assets/25a509db-94c3-422c-9b05-b51828a7b2b8)  

![image](https://github.com/user-attachments/assets/3c28e87e-b120-4432-92c5-bb48e1f19693)








