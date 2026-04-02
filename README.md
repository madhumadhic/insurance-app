**🛡️ SmartCover – AI Micro Insurance Platform**

SmartCover is a mobile-first AI-powered micro-insurance platform designed for gig workers and delivery partners.
The application allows users to register, activate policies, calculate dynamic premiums, and receive instant parametric payouts.

**This project includes:**

✅ Frontend UI
✅ Backend API
✅ API Integration
✅ Dashboard
✅ Claims System
✅ Workflow Diagram

**📁 Project Structure**
smartcover-app/
│
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── policy.html
│   ├── premium.html
│   ├── claims.html
│   ├── dashboard.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── routes/
│       ├── userRoutes.js
│       ├── policyRoutes.js
│       └── claimRoutes.js
│
├── assets/
│   ├── screenshots/
│   
│
└── README.md

**🚀 Features**
**👤 User Registration**
      Worker onboarding
      Zone-based risk selection
      Premium preview
      API-based data storage
      
**📜 Policy Management**
     Activate insurance policy
     Weekly coverage
     Dynamic premium calculation
     
**💳 Dynamic Premium**

Premium based on risk zone:

| Zone   | Risk   | Premium  |
| ------ | ------ | -------- |
| Zone 1 | Safe   | ₹20/week |
| Zone 2 | Medium | ₹30/week |
| Zone 3 | High   | ₹50/week |

**Instant Claims**
Parametric insurance payouts:
      Heavy Rain
      Flood
      Storm
Instant payout simulation.

**🏠 Dashboard**
     User profile
     Policy status
     Premium info
     Claims count
     Total payout
     
**🔗 API Integration**

Frontend connects to backend using REST APIs.

Example API call:

POST /api/users/register

Frontend:

fetch('http://localhost:5000/api/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData)
});

**⚙️ Backend APIs**
Register User
        POST /api/users/register
Activate Policy
        POST /api/policy/activate
Create Claim
        POST /api/claims/claim
        
**🧠 Technologies Used**

Frontend:

    HTML
    CSS
    JavaScript

Backend:

    Node.js
    Express.js
    REST API

Storage:

    LocalStorage (Frontend)
    API-based mock backend
    
**▶️ How to Run Project**
Step 1 — Run Backend

Open terminal:

cd backend
npm install
npm start

Server runs at:

http://localhost:5000
Step 2 — Run Frontend

Open:

frontend/index.html

OR open using Live Server.

**🔄 Application Flow**

Register → Select Zone → Premium Calculate → Activate Policy → Confirm → Dashboard → Claims

**📸 Screenshots**
Add images inside:

     assets/screenshots/

Example:

    register.png
    dashboard.png
    claims.png
    
**📊 Workflow Diagram**

Add diagram inside:

       assets/diagrams/workflow.png

Flow:

      User → Register → Policy → Premium → Dashboard → Claim → Payout
**💡 Innovation**
      AI based premium pricing
      Micro weekly insurance
      Parametric instant claims
      Mobile-first design
      API-driven architecture
      
**🎯 Target Users**

Gig workers:

   Swiggy
   Zomato
   Uber Eats
   Rapido
   Dunzo
