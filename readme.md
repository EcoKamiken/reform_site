# reform_site

[![CircleCI](https://circleci.com/gh/EcoKamiken/reform_site/tree/master.svg?style=svg)](https://circleci.com/gh/EcoKamiken/reform_site/tree/master)

## 前書き

masterに変更が入るとCIを介して本番サーバにデプロイされます。
masterを直接編集しないでください。トピックブランチを切って開発完了したらPRを出しましょう。

## 商品を追加する方法

1. 各ページに対応するJSONファイルを開く  
例えば、キッチンページを編集したい場合は、`settings/kitchen.json`を開く

1. データを編集する。JSONについては[こちら](https://www.json.org/json-ja.html)

    ```json
    {
        "visible": true,
        "id": 1,
        "manufacturer": "メーカー名",
        "manufacturer_image": "images/manufacturers/メーカーロゴ.jpg",
        "manufacturer_image_description": "メーカー名",
        "series": "シリーズ名",
        "size": [
            サイズ
        ],
        "model": "モデル",
        "retail_price": メーカー希望小売価格,
        "price": 販売価格,
        "description": "説明文",
        "product_image": "images/kitchen/1.jpg",
        "product_image_description": "画像の説明文"
    }
    ```

1. 編集が完了したら保存してビルド実行。ビルド方法については[こちら](#ビルド)


## 開発の流れ

1. git/nodejs/yarnをインストール  
1. リポジトリをクローン

    ```shell
    git clone https://github.com/ecokamiken/reform_site
    ```

1. ライブラリをインストール

    ```shell
    yarn
    ```

1. masterからトピックブランチを作成

    ```shell
    git switch -c <branch-name>
    ```

1. gulpのwatchタスクを起動

    ```shell
    npx gulp watch
    ```

1. 機能を開発
1. リモートリポジトリにpush

    ```shell
    git push origin <branch-name>
    ```

1. プルリクエストを作成
1. 内容を確認してmerge

## ビルド

```shell
yarn run build
```

## 画像サイズ

|項目|解像度|
|-|-|
|メイン画像|1200×750|
|メインメニュー|640x480|
|商品画像|300x300|
