# **REscue**

An all-in-one application providing real-time disaster updates, assistance resources, and emergency reporting.

---

## **Description**

Disasters such as **fires, earthquakes, and floods** occur frequently across the globe, often leaving those affected in urgent need of assistance.

In such situations, **panic and confusion can make it difficult for individuals to make quick, informed decisions**, delaying access to critical help.

### **Our Solution**

**REscue** empowers users by ensuring that **help and information are just a few taps away—anytime, anywhere.** Key features include:

1. **Real-Time Disaster Updates**

    - Provides timely and critical disaster information.

2. **Guided Assistance**

    - Directs users to nearby aid centers and resources.

3. **Emergency Reporting**
    - Allows individuals to report their situation and track the request status.

### **Why REscue?**

Our inspiration for this solution comes from our **current experience in California**, where the **Los Angeles wildfires** have been a major concern. While the situation has been contained due to swift action by local authorities, we recognize that **timely dissemination of critical information remains a significant challenge** during such disasters.

With **REscue**, we aim to provide a **centralized platform** that increases access to disaster-related information, helps individuals make better decisions in emergency situations, and enables direct communication for assistance requests.

---

## **Installation**

1. **Clone the repository**

2. **Install dependencies**

    - Navigate to the `/backend` and `/frontend` folders separately and run:
        ```
        npm install
        ```

3. **Set up environment variables**

    - Create the necessary `.env` files for both the backend and frontend with the required configurations.

4. **Start the servers**
    - **Backend:**
        ```
        cd backend
        npm run start
        ```
    - **Frontend:**
        ```
        cd frontend
        npm run start
        ```

---

## **Usage**

For now, account creation is not available. Please use the following **temporary credentials** to log in:

### **Admin Account**

-   **ID:** `1`
-   **Password:** `adminTesting`

### **User Account**

-   **ID:** `2`
-   **Password:** `password`

---

## **Account Types & Features**

### **Admin Accounts**

Intended for **governments and first responder organizations** such as the **Red Cross, police, and firefighters.** Admins have access to:  
✅ Pin new disaster events on the map  
✅ Mark locations where aid is available  
✅ View and respond to user help requests

### **User Accounts**

Designed for the **general public and individuals** seeking assistance. Users can:  
✅ View the map for disaster events and available aid locations  
✅ Post requests for assistance

---

## **Technologies Used**

REscue is built with:

-   **JavaScript**
-   **ReactJS** (Frontend)
-   **ExpressJS** (Backend)
