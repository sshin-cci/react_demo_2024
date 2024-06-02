# React env setup for 2024
技術点
- [vite環境構築開始](#vite環境構築開始)
- [パスエイリアス](#パスエイリアス)
- vitest
- eslint
- prettier
- husky & lint-staged
- storybook
- tailwindcss
- shadcn/ui
- github actions

### vite環境構築開始
コンパイラには Babel ではなく [SWC](https://swc.rs/) を使用したいため、react-swc-ts テンプレートを使用
```
npm create vite@latest react_demo_2024
cd react_demo_2024
npm install

npm run dev # 開発サーバーを起動
npm run build # プロダクションビルド
npm run preview # プロダクションビルドしたものをローカルで確認
```

### パスエイリアス
```
対応前：import Header from "../../../../components/Header"
対応後：import Header from "@/components/Header"　→＠パスエイリアス対応
```
tsconfig.json を編集し、既存の設定に baseUrl と paths を追加する
```
"compilerOptions": {
    ......
    //* パスエイリアスの設定 */
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
}
```
次に、[vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) を使用

```
npm install -D vite-tsconfig-paths

added 3 packages, and audited 163 packages in 6s

38 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

```

vite.config.ts を編集
```
......
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})
```
