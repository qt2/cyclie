# Cyclie

賃貸住み替えサービス

## 実行方法

Docker がインストールされている必要があります。

1. 以下のコマンドを実行して、アプリケーションを起動してください。

```sh
docker-compose up
```

2. その後、http://localhost:3000/ をブラウザで開いてください。

## コンポーネント一覧

コンポーネントの詳細は各ディレクトリ内の README をご覧ください。

### /client-web

Remix ベースの Web アプリケーション

### /server-recommend

Python を用いたレコメンデーション API サーバ

### /server-matching

マッチングアルゴリズムを実装した Jupyter ノートブック

### /dataset

プロトタイプで用いる物件データセット、および画像解析 AI による内装の雰囲気推定
