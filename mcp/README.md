# MCP Utility Server

TypeScriptで実装されたModel Context Protocol (MCP) サーバーです。UUID生成と現在時刻取得の機能を提供します。

## 機能

### 提供ツール

- **get-server-time**: サーバーの現在時刻を取得
- **generate-uuid**: 新しいUUIDv4を生成

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. ビルド

```bash
pnpm run build
```

### 3. MCPサーバーの起動

```bash
mcp-inspector node build/index.js
```

### プロジェクト構造

```
mcp/
├── src/
│   └── index.ts          # メインサーバーファイル
├── build/                # ビルド出力
├── package.json
├── README.md
└── TODO.md              # 開発タスク
```

### get-server-time

現在のサーバー時刻を日本語形式で返します。

**パラメータ**: なし

**レスポンス例**:

```
2024/12/26 15:30:45
```

### generate-uuid

新しいUUIDv4を生成して返します。

**パラメータ**: なし

**レスポンス例**:

```
123e4567-e89b-12d3-a456-426614174000
```

## 参考資料

- [MCPサーバをつくって学ぶ | @bc_rikko](https://bcrikko.github.io/til/posts/2025-04-07/what-is-mcp/)
