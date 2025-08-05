**Project Description**
EcoReport is a mobile-first environmental incident reporting platform that enables citizens to document issues like pollution, flooding, and deforestation. Reports are pre-screened with AI, verified by trusted community validators, and rewarded with blockchain-based EcoTokens. The system gamifies climate monitoring to build a real-time community-driven environmental intelligence network.

---

**Key Features & Functionalities**

* **Multi-Role Access**

  * Residents report incidents and earn tokens
  * Validators verify reports for additional rewards
  * Administrators monitor platform health and analytics

* **Report Submission Workflow**

  * Camera-first interface for photo/video capture
  * GPS-based location tagging
  * Predefined classification tagging
  * Multilingual descriptions (English, Hausa, Yoruba, Igbo)

* **AI-Powered Validation**

  * Image classification and NLP models assign confidence scores
  * High-confidence reports auto-approved
  * Medium/low confidence routed to human validators

* **Community Validator Dashboard**

  * Human review of pending reports
  * Token incentives for validation decisions
  * Defined validation criteria and rejection guidelines

* **Gamification Layer**

  * Token-based progression and badges
  * Leaderboards (local and national)
  * Achievement unlocks and redemption marketplace

* **Real-Time Environmental Map**

  * Visual incident pins filtered by status
  * Incident-level detail cards with AI insights

* **Admin System Dashboard**

  * System metrics (reports, users, verification rates)
  * Service status monitoring (AI, blockchain, USSD)
  * Management tools for users and configurations

* **USSD Offline Mode**

  * Feature phone support for submissions and wallet actions
  * Accessible menu-driven reporting with SMS notifications

---

**Tools & Technologies Used**

* Frontend: Next.js 15 (mobile-first, server-side rendering)
* Backend/Data: Firebase Firestore
* AI Services: Hugging Face image models, Afriberta multilingual NLP
* Blockchain: Cardano testnet via Cardano Wallet APIs
* Communications: Africa’s Talking for USSD & SMS

---

**Cardano / Web3 Integration**

* EcoTokens are minted on the Cardano blockchain as reward tokens
* Smart contract logic issues:

  * 50 tokens for each AI and community-verified report
  * 10 tokens or 5 tokens for validator verdicts
* Token transactions contain metadata (report ID, timestamps) for auditability
* Integrated Cardano wallet inside the app shows token balance, address, and on-chain transaction history
* Testnet deployment enables transparent token distribution with future mainnet scalability


## Deployment

The project is live at:

**[https://vercel.com/umars-projects-ed30f02e/v0-environmental-reporting-platform](https://vercel.com/umars-projects-ed30f02e/v0-environmental-reporting-platform)**
