from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"ola mundo"}