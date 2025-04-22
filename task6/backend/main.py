# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
import psycopg2
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = psycopg2.connect(
    host=os.environ['DB_HOST'],
    user=os.environ['DB_USER'],
    password=os.environ['DB_PASSWORD'],
    dbname=os.environ['DB_NAME']
)

class NewsItem(BaseModel):
    title: str
    content: str

@app.get("/api/news")
def get_news():
    with conn.cursor() as cur:
        cur.execute("SELECT title, content FROM news")
        return [{"title": t, "content": c} for t, c in cur.fetchall()]

@app.post("/api/news")
def create_news(item: NewsItem):
    print(f"Add item {item.title}: {item.content}")
    with conn.cursor() as cur:
        cur.execute("INSERT INTO news (title, content) VALUES (%s, %s)", (item.title, item.content))
        conn.commit()
        return {"status": "ok"}
