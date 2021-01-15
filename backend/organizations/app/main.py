from fastapi import FastAPI

app = FastAPI()


@app.get("/api/organizations/hello")
def read_root():
    return {"Hello": "from organizations hot reloaded"}
