from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"version": "v1.0.0"}


@app.get("/search")
async def search(
    p_rent: int = None,
    rent: int = None,
    p_area: int = None,
    area: int = None,
    p_distance: int = None,
    distance: int = None,
    p_age: int = None,
    age: int = None,
    p_atmos: int = None,
    a_modern: int = None,
):
    pass
