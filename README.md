# Cyclie

賃貸住み替えサービス

## 実行方法
Dockerがインストールされている必要があります。

1. 以下のコマンドを実行して、アプリケーションを起動してください。

```sh
docker-compose up
```

2. その後、http://localhost:3000/ をブラウザで開いてください。

## コンポーネント一覧
コンポーネントの詳細は各ディレクトリ内のREADMEをご覧ください。

### /client-web
RemixベースのWebアプリケーション

### /server-recommend
Pythonを用いたレコメンデーションAPIサーバ

### /server-matching
マッチングアルゴリズムを実装したJupyterノートブック