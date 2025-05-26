#  Trading Analytics Platform - Amal Zahid Manzooe

## Tech Stack
- Frontend: React + TailwindCSS
- Backend: FastAPI (Python)
- Database: In-memory storage (for development)

## Setup and run instructions
In the project directory, you can run:

1) In the first terminal : uvicorn main:app --reload
2) # Seed in some data
   - Open your browser at http://localhost:8000/docs#/default. This is to seed in some trade data. Because we’re using in-memory storage (all data 
     is wiped on restart), you need to post a batch of trades before the UI will show anything
   - Click POST /trades → Try it out → paste in your JSON array of trades (I have put this at the end of this README file) → Execute.
3) # Start the react app:
   - In a second terminal:  ### `npm start`
   - Then, Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
   - You should now be able to view the dashboard page with the seeded trade data.

