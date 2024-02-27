from fastapi import FastAPI
import json
from pydantic import BaseModel
import random


# 物件データの読み込み
with open("samples_with_atmosphere.json", encoding="utf-8") as f:
    dataset = json.load(f)

for i, d in enumerate(dataset):
    d["id"] = i

app = FastAPI()

# ユーザーの希望リスト（プロトタイプではユーザーは1人しかいないので、グローバル変数を使用します）
wish_list = []

# マッチング先の物件ID（実際には一定期間ごとにマッチングを行います。モックアップでは希望リストからランダムに選択します）
target = None


@app.get("/")
async def root():
    return {"version": "v1.0.0"}


def score1(x: float, thres: float) -> float:
    """片方の条件のみ（~以下 など）の評価関数"""
    # 小さい場合は問題にならないタイプの条件で使用する
    # （駅徒歩分や築年数など）
    if x <= thres:
        return 1
    elif x <= 2 * thres:
        return 2 - x / thres
    else:
        return 0


def score2(x: float, thres: float) -> float:
    """範囲条件（~くらい など）の評価関数"""
    # 大きすぎても小さすぎても希望に合わないタイプの条件で使用する
    # （面積や家賃など: 家賃が予算より安すぎると低品質な物件に当たる確率が高くなるため）
    if x <= 2 * thres:
        t = 1 - x / thres
        return 1 - t * t
    else:
        return 0


@app.get("/search")
async def search(
    regions: list[str] = None,
    p_rent: int = 0,
    rent: int = None,
    p_area: int = 0,
    area: int = None,
    p_distance: int = 0,
    distance: int = None,
    p_age: int = 0,
    age: int = None,
    p_atmos: int = 0,
    a_peekable: int = 0,
    a_green_visible: int = 0,
    a_wall_patterned: int = 0,
):
    # パラメータの説明
    # p_*: 各項目の重視度(1-5)です。値が大きいほど重視します。`None`の場合は無視します。
    # a_*: 雰囲気の好感度(1-5)です。1が嫌いで、3が普通、5が好きに対応します。

    # スコア関数（各項目について合致スコアを計算し、線形和をとる）
    score_fn = lambda d: -(
        (p_rent and p_rent * score2(d["rent"], rent))
        + (p_area and p_area * score2(d["area"], area))
        + (p_distance and p_distance * score1(d["distance"], distance))
        + (p_age and p_age * score1(d["age"], age))
        + (
            p_atmos
            and p_atmos
            * (
                a_peekable * int(d["atmos_peekable"])
                + a_green_visible * int(d["atmos_green_visible"])
                + a_wall_patterned * int(d["atmos_wall_patterned"])
            )
            if "atmos_peekable" in d
            else 0
        )
    )

    # スコア関数の順に検索結果を返す
    results = sorted(dataset, key=score_fn)

    for r in results:
        r["is_wished"] = r["id"] in wish_list

    return results


@app.get("/wish_list")
async def get_wish_list():
    # 現在の希望リストに含まれる物件データを取得
    return [dataset[id] for id in wish_list]


class UpdateWishListRequest(BaseModel):
    ids: list[int]


@app.post("/wish_list")
async def update_wish_list(item: UpdateWishListRequest):
    # 希望リストを更新
    global wish_list
    wish_list = item.ids


@app.post("/wish_list/{id}")
async def add_wish_list(id: int):
    # 希望リストに物件を追加
    if id not in wish_list:
        wish_list.append(id)


@app.delete("/wish_list/{id}")
async def remove_wish_list(id: int):
    # 希望リストから物件を削除
    wish_list.remove(id)


@app.post("/submit")
async def submit_wish_list():
    # 希望リストを確定する
    global target
    target = random.choice(wish_list)


@app.get("/result")
async def get_result():
    # マッチング結果を返す（モックアップ用）
    if target is None:
        return {"result": None}

    return {"result": dataset[target]}
