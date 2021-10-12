# 環境設定

## TS 化

https://nextjs.org/learn/excel/typescript/setup

tsconfig.json の strict のみ true に変更

## eslint + prettier + husky

基本は、こちらを丸パクリ。
対応時期によって、eslint のプラグイン周りで動きがあるので必要に応じて調整。

https://qiita.com/282Haniwa/items/dcce1ba6bb6ae541893e

## はてなブログの記事をマークダウンにする際に利用させていただいたもの

感謝！
https://gist.github.com/naoty/6019913a52e6af27088fd8098047dbc0

## そのほかのメモ

### next-mdx-remote を update したら esbuild でこけるようになった

`next-mdx-remote@3.0.6`から esbuild の version が 0.13.4 にあがった

https://github.com/hashicorp/next-mdx-remote/compare/3.0.5...3.0.6

`esbuild@0.13.4`から、Go でコンパイルされたバイナリのインストール方法がかわったみたい。

https://twitter.com/youyuxi/status/1440864427532644352

`yarn@1/npm@6`ともに試したんだけど、こけちゃう。

こちらの[issue](https://github.com/vitejs/vite/issues/5187)通り、`yarn add -D esbuild@0.13.4`を個別につっこんだら解決した。peerDependencies でもなかったのでなんでだろ。謎。
