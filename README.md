# EcoReport Platform - Complete Walkthrough

Let me give you a comprehensive tour of this environmental incident reporting platform with AI verification and blockchain rewards.

## ️ **Platform Overview**

EcoReport is a **mobile-first community platform** that enables citizens to report environmental incidents, validates them through AI and community verification, and rewards users with blockchain tokens. It supports three distinct user roles with different capabilities.

<img width="308" height="545" alt="image" src="https://github.com/user-attachments/assets/0d9453e5-8c39-476d-86e9-c8f4f283d138" />

---

## **User Roles & Access**

### **1. Residents (Default Role)**

- **Primary users** who submit environmental incident reports
- **Earn EcoTokens** for verified reports (50 tokens each)
- **Access features**: Report submission, live map, token wallet, leaderboards


### **2. Validators**

- **Trusted community members** who verify other users' reports
- **Requirements**: 2000+ EcoScore to become a validator
- **Earn tokens** for validation work (10 tokens for approval, 5 for rejection)
- **Access features**: Validation dashboard, all resident features


### **3. Administrators**

- **System managers** who monitor platform health
- **Capabilities**: System analytics, user management, configuration
- **Access features**: Admin dashboard with comprehensive system monitoring


---

## **Core User Journey**

Let me walk you through the complete flow from report submission to reward distribution:

### **Step 1: Report Submission (Residents)**

**📱 Camera-First Interface**

- Users tap the **"Submit"** tab to access the report submission form
- **Capture Evidence**: Tap the camera interface to take photos/videos

- Images are **auto-compressed to 500KB** for efficient upload
- Supports both photos and videos of environmental issues





**📍 Location Tagging**

- Click **"Get Current Location"** to capture GPS coordinates
- System records precise latitude/longitude for geospatial indexing
- Location data is used for **LGA-based analytics** and mapping


**🏷️ Incident Classification**

- Select from predefined incident types:

- **Flooding** (Blue gradient)
- **Drought** (Yellow-Orange gradient)
- **Wind Damage** (Red-Pink gradient)
- **Pollution** (Gray gradient)
- **Deforestation** (Green gradient)





**📝 Description**

- Multi-language text input supporting **Hausa, Yoruba, Igbo, and English**
- **Afriberta NLP** processes the description for validation
- Users describe the incident in detail for context


**🚀 Submission Process**

- Click **"Submit Report"** to initiate the AI validation pipeline
- **Progress indicator** shows processing steps:

1. Image compression (1s)
2. AI image analysis (2s)
3. Text processing with Afriberta (1.5s)
4. Geohash indexing (0.8s)
5. Blockchain preparation (1.2s)





### **Step 2: AI Pre-Screening**

**🤖 Automated Validation Pipeline**

```python
# AI validation combines multiple models
img_confidence = hugging_face_classifier(image, incident_labels)
text_confidence = afriberta_nlp(description, language)
combined_score = (img_confidence + text_confidence) / 2

if combined_score > 0.7:
    return "high_confidence" 
elif combined_score > 0.6:
    return "medium_confidence"
else:
    queue_for_human_validation()
```

**🎯 Decision Logic**

- **High confidence (>70%)**: Auto-approved, tokens minted immediately
- **Medium confidence (60-70%)**: Queued for community validation
- **Low confidence (<60%)**: Requires 3 validator approvals


### **Step 3: Community Validation (Validators)**

**🛡️ Validator Dashboard**

- Switch to **"Validator"** role to access validation interface
- View **pending reports** requiring community verification
- Each report shows:

- **Evidence photo/video** with full-screen preview
- **AI confidence score** and predicted classification
- **Location details** and reporter information
- **Validation progress** (X/3 validators needed)





**✅ Validation Process**

- **Review evidence**: Examine photo/video for authenticity
- **Check description**: Verify text matches visual evidence
- **Consider AI score**: Use as guidance but apply human judgment
- **Make decision**:

- **Validate** (10 EcoTokens earned)
- **Reject** (5 EcoTokens earned)





**📋 Validation Guidelines**

- ✅ Verify image matches incident type and location
- ✅ Check description accuracy and detail
- ✅ Consider AI confidence but use judgment
- ❌ Reject fake, misleading, or irrelevant content


### **Step 4: Blockchain Confirmation**

**⛓️ Cardano Integration**

```javascript
// Token minting on Cardano testnet
const mintTokens = async (userWallet, amount, reportId) => {
  const transaction = {
    outputs: [{
      address: userWallet,
      amount: {
        lovelace: "2000000", // 2 ADA minimum
        [ECOTOKEN_POLICY]: amount.toString()
      }
    }],
    metadata: {
      report_id: reportId,
      token_type: "environmental_reward",
      minted_at: new Date().toISOString()
    }
  }
  
  const txHash = await submitTransaction(transaction)
  return txHash
}
```

**🪙 Token Distribution**

- **50 EcoTokens** minted for each verified report
- **10 tokens** for validator approvals
- **5 tokens** for validator rejections
- All transactions recorded on **Cardano testnet** with full audit trail


---

## ️ **Live Environmental Map**

**📍 Real-Time Incident Tracking**

- Interactive map showing **verified environmental incidents**
- **Color-coded pins**:

- 🟢 Green = Verified incidents
- 🟡 Yellow = Pending validation



- **Click pins** to view incident details


**🔍 Filtering Options**

- **All Reports**: Show everything
- **Verified**: Only confirmed incidents
- **Pending**: Reports awaiting validation


**📊 Incident Details**

- **Location**: Precise address and coordinates
- **Type**: Incident classification with confidence score
- **Reporter**: Anonymous or named reporting
- **AI Analysis**: Confidence percentage and validation status


---

## **Token Wallet & Rewards**

**🏦 Wallet Overview**

- **Beautiful gradient card** showing total EcoToken balance
- **Cardano testnet integration** with real wallet addresses
- **Copy wallet address** functionality for external transactions


**📈 Earning Progress**

- **Progress bar** toward validator status (2000 tokens required)
- **Statistics display**:

- Reports submitted
- Verification success rate
- Current ranking





**💳 Transaction History**

- **Recent transactions** with full details
- **Transaction types**: Earned, redeemed, transferred
- **Blockchain links** to view on Cardano explorer


**🎁 Redemption Marketplace**

- **Mobile Data**: 1GB for 25 tokens (MTN/Airtel)
- **Airtime**: ₦500 credit for 30 tokens
- **Environmental Kits**: Tree planting kit for 100 tokens
- **Solar Equipment**: Solar lamp for 200 tokens


---

## **Leaderboards & Gamification**

**🌍 Dual Leaderboard System**

- **LGA Leaderboard**: Local Government Area rankings
- **National Leaderboard**: Country-wide competition


**🥇 Ranking System**

- **Trophy icons** for top 3 positions
- **Badge system** with gradient colors:

- 💎 Diamond Validator (4000+ score)
- 🥈 Platinum Validator (3500+ score)
- 🥇 Gold Validator (2500+ score)
- 🥈 Silver Validator (2000+ score)
- 🥉 Bronze Validator (1500+ score)
- 📱 Active Reporter (500+ score)





**🎯 Achievement System**

- **Validator Badge**: 2000+ EcoScore
- **Expert Reporter**: 50+ verified reports
- **Community Leader**: Top 10 in LGA
- **Mentor**: Help 10 new users (coming soon)


---

## ️ **Admin Dashboard**

**📊 System Overview**

- **Real-time statistics**: Total reports, verification rates, active users
- **System health monitoring**: AI service, blockchain, database status
- **Activity feed**: Recent platform events and alerts


**📈 Analytics Tabs**

1. **Overview**: Key metrics and system health
2. **Reports**: Incident analytics and verification rates
3. **Users**: User management and top contributors
4. **System**: Configuration and maintenance tools


**⚠️ Alert System**

- **USSD gateway** response time monitoring
- **Blockchain fee** tracking and alerts
- **AI validation queue** status monitoring


---

## **USSD Offline Access**

**📞 Feature Phone Support**

- **Dial**: `*310*123#` for offline access
- **Menu system**:

1. Submit Report
2. Check Balance
3. Redeem Tokens
4. Help & Support





**🌐 Accessibility Features**

- **Works without internet** after initial setup
- **SMS integration** for notifications
- **Multi-language support** for local languages
- **Simple keypad navigation**


---

## **Technical Architecture**

### **Frontend (Next.js 15)**

- **Mobile-first responsive design** with dark mode
- **Server-side rendering** for optimal performance
- **Dynamic imports** to prevent hydration issues
- **Gradient-rich UI** with glassmorphism effects


### **Backend Integration Points**

- **Firebase Firestore**: User data and reports storage
- **Hugging Face API**: AI image classification
- **Afriberta NLP**: Multilingual text analysis
- **Cardano Wallet**: Blockchain token operations
- **Africa's Talking**: USSD and SMS gateway


### **Data Flow**

```mermaid
Diagram.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-r6dk{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-r6dk .error-icon{fill:#552222;}#mermaid-diagram-r6dk .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-r6dk .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-r6dk .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-r6dk .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-r6dk .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-r6dk .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-r6dk .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-r6dk .marker{fill:#666;stroke:#666;}#mermaid-diagram-r6dk .marker.cross{stroke:#666;}#mermaid-diagram-r6dk svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-r6dk p{margin:0;}#mermaid-diagram-r6dk .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-r6dk .cluster-label text{fill:#333;}#mermaid-diagram-r6dk .cluster-label span{color:#333;}#mermaid-diagram-r6dk .cluster-label span p{background-color:transparent;}#mermaid-diagram-r6dk .label text,#mermaid-diagram-r6dk span{fill:#000000;color:#000000;}#mermaid-diagram-r6dk .node rect,#mermaid-diagram-r6dk .node circle,#mermaid-diagram-r6dk .node ellipse,#mermaid-diagram-r6dk .node polygon,#mermaid-diagram-r6dk .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-r6dk .rough-node .label text,#mermaid-diagram-r6dk .node .label text{text-anchor:middle;}#mermaid-diagram-r6dk .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-r6dk .node .label{text-align:center;}#mermaid-diagram-r6dk .node.clickable{cursor:pointer;}#mermaid-diagram-r6dk .arrowheadPath{fill:#333333;}#mermaid-diagram-r6dk .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-r6dk .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-r6dk .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-r6dk .edgeLabel p{background-color:white;}#mermaid-diagram-r6dk .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-r6dk .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-r6dk .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-r6dk .cluster text{fill:#333;}#mermaid-diagram-r6dk .cluster span{color:#333;}#mermaid-diagram-r6dk div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-r6dk .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-r6dk .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-r6dk .marker,#mermaid-diagram-r6dk marker,#mermaid-diagram-r6dk marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r6dk .label,#mermaid-diagram-r6dk text,#mermaid-diagram-r6dk text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-r6dk .background,#mermaid-diagram-r6dk rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-r6dk .entityBox,#mermaid-diagram-r6dk .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-r6dk .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-r6dk .label-container,#mermaid-diagram-r6dk rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r6dk line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r6dk :root{--mermaid-font-family:var(--font-geist-sans);}HighMedium/LowUser Submits ReportAI Pre-screeningConfidence ScoreAuto-approveCommunity Validation3 Validators ReviewConsensus DecisionBlockchain Token MintUser Notification
```

---

## **Getting Started**

1. **Choose your role** using the role selector in the header
2. **Residents**: Start by submitting your first environmental report
3. **Validators**: Review pending reports to earn tokens and build trust
4. **Admins**: Monitor system health and user activity


The platform creates a **complete ecosystem** where environmental monitoring becomes a rewarding community activity, powered by cutting-edge AI and blockchain technology while remaining accessible to users across all technology levels.

**🎯 The ultimate goal**: Create a comprehensive, real-time environmental monitoring network that empowers communities to protect their environment while earning meaningful rewards for their contributions.
<img width="644" height="8208" alt="image" src="https://github.com/user-attachments/assets/efe636df-9ff6-4222-a7ed-eaaa343d5a53" />



## Deployment

Your project is live at:

**[https://vercel.com/umars-projects-ed30f02e/v0-environmental-reporting-platform](https://vercel.com/umars-projects-ed30f02e/v0-environmental-reporting-platform)**

