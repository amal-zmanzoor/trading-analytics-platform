#  Trading Analytics Platform - Amal Zahid Manzoor

## Tech Stack
- Frontend: React + TailwindCSS
- Backend: FastAPI (Python)
- Database: In-memory storage (for development)

## Setup and run instructions
In the project directory, you can run:

1) In the first terminal : uvicorn main:app --reload
2) ### Seed in some data
   - Open your browser at http://localhost:8000/docs#/default. This is to seed in some trade data. Because we’re using in-memory storage (all data 
     is wiped on restart), you need to post a batch of trades before the UI will show anything
   - Click POST /trades → Try it out → paste in your JSON array of trades (I have put this at the end of this README file) → Execute.
3) ### Start the react app:
   - In a second terminal:  ### `npm start`
   - Then, Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
   - You should now be able to view the dashboard page with the seeded trade data.

## Assumptions & Notes
- **Trade ID format**  
  All trade IDs follow the pattern `T` + one or more digits (e.g. `T1001`).  

- **Currency**  
  All prices are in US dollars (USD).  

- **Uniqueness constraints**  
  - **No duplicate trade IDs** allowed — each trade must have a unique identifier.  
  - **Duplicate commodity names** are allowed, since you may execute multiple trades for the same commodity (e.g. separate orders by different traders or at different times).  

- **Mock data for summary cards**  
  The four “StatsCard” summary cards at the top use hard-coded mock values, purely for UI demonstration.  

- **Main dashboard listing**  
  I displayed the **five most recent trades** on the homepage (dashboard page) for clarity and simplicity. A full list of all trades (and detailed insights) is accessible via the sidebar navigation.  

- **Possible future enhancements**  
  There’s plenty more functionality that could I thought of adding—e.g.:  
  - Searching/filtering trades by commodity, trader, date range, etc.  
  - Sorting and bulk-actions (delete, export)  
  - Detail modals or drill-down views for individual trades or analytics  
  - Persisting data to a real database instead of in-memory storage  
  - User authentication/roles for multiple traders  

These choices were made to keep the project **simple**, **functional**, and easy to review. I’m happy to discuss any of these points or extend the project further through our disussions.

Video:
https://github.com/user-attachments/assets/e541a2c3-948f-46ea-9218-edc2aeafbfba

Sample Trade data to POST before starting app:
[
  {
    "commodity": "Gold",
    "traderId": "T123",
    "price": 2023.50,
    "quantity": 10,
    "timestamp": "2025-04-10T15:30:00Z"
  },
  {
    "commodity": "Oil",
    "traderId": "T456",
    "price": 85.20,
    "quantity": 100,
    "timestamp": "2025-04-10T16:10:00Z"
  },
  {
    "commodity": "Diamond",
    "traderId": "T932",
    "price": 9053.90,
    "quantity": 7,
    "timestamp": "2025-04-10T19:54:00Z"
  },
  {
    "commodity": "Silver",
    "traderId": "T781",
    "price": 62.20,
    "quantity": 56,
    "timestamp": "2025-04-10T05:43:00Z"
  },
  {
    "commodity": "Cotton",
    "traderId": "T354",
    "price": 43.30,
    "quantity": 21,
    "timestamp": "2025-04-10T09:34:00Z"
  }
]


