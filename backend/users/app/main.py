from fastapi import FastAPI

app = FastAPI()


@app.get("/api/users/hello")
def read_root():
    return {"Hello": "from users updated"}
