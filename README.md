# FOCUS - ADHDタスク管理アプリ

「今やること1つ」に集中するためのタスク管理PWA。

## 機能
- 雑な入力をAI（Claude）が自動で小さなステップに分解
- 今やるべき1つのステップを大きく表示
- 自分ボール / 相手ボールでタスクの責任を明確化
- 完了で次のステップへ自動進行

## デプロイ方法（Vercel）

### 1. GitHubにリポジトリを作成
```bash
git init
git add .
git commit -m "FOCUS v1.2 - initial release"
git remote add origin https://github.com/YOUR_USERNAME/focus-app.git
git push -u origin main
```

### 2. Vercelにデプロイ
1. [vercel.com](https://vercel.com) にログイン（GitHubアカウントで可）
2. 「Add New Project」をクリック
3. 上で作ったリポジトリを選択
4. そのまま「Deploy」をクリック（設定変更不要）
5. デプロイ完了！URLが発行される

### 3. スマホでアプリとして使う
1. スマホのブラウザでデプロイされたURLにアクセス
2. **Android**: メニュー → 「ホーム画面に追加」
3. **iPhone**: 共有ボタン → 「ホーム画面に追加」
4. ホーム画面からアプリとして起動できる！

### 4. 初回設定
1. アプリの「⚙ 設定」タブを開く
2. Anthropic APIキーを入力して保存
3. 「＋ 追加」タブからタスクを追加して使い始める

## APIキーの取得
1. [console.anthropic.com](https://console.anthropic.com) にアクセス
2. アカウント作成 / ログイン
3. 「API Keys」→「Create Key」
4. 作成されたキー（sk-ant-...）をアプリの設定画面に入力

## ファイル構成
```
focus-app/
├── index.html      ← メインアプリ（単一ファイル）
├── manifest.json   ← PWA設定
├── sw.js           ← Service Worker（オフライン対応）
├── icon-192.png    ← アプリアイコン（192px）
├── icon-512.png    ← アプリアイコン（512px）
├── icon.svg        ← アイコン原版（SVG）
├── vercel.json     ← Vercelデプロイ設定
└── README.md       ← このファイル
```

## 技術構成
- フロントエンド: HTML / CSS / Vanilla JS（単一ファイル）
- AI: Claude API (claude-sonnet-4-20250514)
- データ保存: localStorage（端末のブラウザに保存）
- ホスティング: Vercel（無料プラン対応）
