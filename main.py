import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI()

origins = [
    "http://localhost:3000",  # React app running on localhost:3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
trades: List["Trade"] = []

class Trade(BaseModel):
    commodity: str    = Field(..., min_length=1, description="Non-empty commodity name")
    traderId: str     = Field(..., min_length=2, description="Non-empty trader ID") # I assumed trade ID will always be "T" followed by 1 or more numbers
    price: float      = Field(..., gt=0, description="Must be a positive number")
    quantity: int     = Field(..., gt=0, description="Must be a positive integer")
    timestamp: str 

@app.post("/trades")
def add_trades(new_trades: List[Trade]):
    if not new_trades:
        raise HTTPException(status_code=422, detail="Must provide at least one trade")
    
     # Checking for duplicate trade IDs
    existing_trader_ids = {trade.traderId for trade in trades}
    new_trader_ids = {trade.traderId for trade in new_trades}
    
    duplicates = existing_trader_ids.intersection(new_trader_ids)
    if duplicates:
        raise HTTPException(
            status_code=400, 
            detail=f"Duplicate trader IDs found: {', '.join(duplicates)}"
        )
    
    trades.extend(new_trades)
    return {"message": f"{len(new_trades)} trades added successfully."}

@app.get("/trades")
def get_trades():
    return trades

@app.get("/insights")
def get_insights():
    if not trades:
        raise HTTPException(status_code=404, detail="No trades available")

    total_volume = defaultdict(int)
    total_price = defaultdict(float)
    count_per_commodity = defaultdict(int)
    trader_volume = defaultdict(int)

    for trade in trades:
        total_volume[trade.commodity] += trade.quantity
        total_price[trade.commodity] += trade.price
        count_per_commodity[trade.commodity] += 1
        trader_volume[trade.traderId] += trade.quantity

    avg_price = {
        commodity: round(total_price[commodity] / count_per_commodity[commodity], 2)
        for commodity in total_price
    }

    top_traders = sorted(
        [{"traderId": tid, "volume": vol} for tid, vol in trader_volume.items()],
        key=lambda x: x["volume"],
        reverse=True
    )

    return {
        "totalVolumeByCommodity": dict(total_volume),
        "averagePriceByCommodity": avg_price,
        "topTradersByVolume": top_traders
    }
