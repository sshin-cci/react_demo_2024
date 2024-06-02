# React env setup for 2024

技術点

- [vite環境構築開始](#vite環境構築開始)
- [パスエイリアス](#パスエイリアス)
- [eslint](#eslint)
- [prettier](#prettier)
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

### eslint

```
npm install -D eslint

removed 116 packages, and audited 163 packages in 4s

38 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.

> react_demo_2024@0.0.0 npx
> create-config

✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest eslint-plugin-react@latest @typescript-eslint/parser@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
Installing @typescript-eslint/eslint-plugin@latest, eslint-plugin-react@latest, @typescript-eslint/parser@latest

added 102 packages, and audited 265 packages in 8s

111 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created .eslintrc.cjs file
```

### prettier

```
npm i -D prettier

added 1 package, and audited 266 packages in 950ms

112 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

prettier.config.js
```
/** @type {import("prettier").Config} */
const config = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 120,
};

export default config;
```