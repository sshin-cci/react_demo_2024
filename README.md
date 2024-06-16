# React env setup for 2024

技術点

- [vite環境構築開始](#vite環境構築開始)
- [パスエイリアス](#パスエイリアス)
- [eslint](#eslint)
- [prettier](#prettier)
- [husky & lint-staged](#husky--lint-staged)
- [storybook](#storybook)
- [tailwindcss](#tailwindcss)
- [shadcn/ui](#shadcnui)

### vite環境構築開始

コンパイラには Babel ではなく [SWC](https://swc.rs/) を使用したいため、react-swc-ts テンプレートを使用

```
> npm create vite@latest react_demo_2024
> cd react_demo_2024
> npm install

> npm run dev # 開発サーバーを起動
> npm run build # プロダクションビルド
> npm run preview # プロダクションビルドしたものをローカルで確認
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
> npm install -D vite-tsconfig-paths

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
> npm install -D eslint

removed 116 packages, and audited 163 packages in 4s

38 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.

 react_demo_2024@0.0.0 npx
 create-config

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

.eslintrc.cjs

```
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
```

### prettier

```
> npm i -D prettier

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

### husky & lint-staged

[husky](https://github.com/typicode/husky)とは、Gitフックで任意のプログラムを実行するためのnpmライブラリです。
[lint-staged](https://github.com/lint-staged/lint-staged)とは、Gitでステージ上の、つまり変更されたファイルに対してのみlintやformatをするためのnpmライブラリです。

```
> npm i -D husky lint-staged

added 48 packages, and audited 314 packages in 5s

141 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> npx husky install  既に廃止コマンド
> npm pkg set scripts.prepare="husky install"  既に廃止コマンド
> npx husky add .husky/pre-commit "npx lint-staged"  既に廃止コマンド
install command is deprecated

> npx husky init
> echo "npx lint-staged --allow-empty" > .husky/pre-commit
```

package.json

```
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
```

### storybook

[Storybook](https://storybook.js.org/)は「UIカタログ」です。それぞれのUIコンポーネントをブラウザで手軽にチェックすることができます。
Storybookの利点として以下の点が挙げられます

- 手軽にUIのテストができる
- サーバー側の準備ができていなくても先にUIを作ることができる

```
> npx storybook init --builder @storybook/builder-vite
Need to install the following packages:
storybook@8.1.9
Ok to proceed? (y) y

npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated rimraf@2.6.3: Rimraf versions prior to v4 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
╭──────────────────────────────────────────────────────╮
│                                                      │
│   Adding Storybook version 8.1.9 to your project..   │
│                                                      │
╰──────────────────────────────────────────────────────╯
 • Detecting project type. ✓
Installing dependencies...

up to date, audited 314 packages in 742ms

141 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
 • Adding Storybook support to your "React" app
  ✔ Getting the correct version of 10 packages
    Configuring Storybook ESLint plugin at .eslintrc.cjs
  ✔ Installing Storybook dependencies
. ✓
Installing dependencies...


> react_demo_2024@0.0.0 prepare
> husky


up to date, audited 1065 packages in 1s

265 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

attention => Storybook now collects completely anonymous telemetry regarding usage.
This information is used to shape Storybook's roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://storybook.js.org/telemetry

╭──────────────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Storybook was successfully installed in your project! 🎉                   │
│   To run Storybook manually, run npm run storybook. CTRL+C to stop.          │
│                                                                              │
│   Wanna know more about Storybook? Check out https://storybook.js.org/       │
│   Having trouble or want to chat? Join us at https://discord.gg/storybook/   │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯

Running Storybook

> react_demo_2024@0.0.0 storybook
> storybook dev -p 6006 --initial-path=/onboarding --quiet

@storybook/cli v8.1.9

info => Starting manager..
info => Starting preview..
info Using tsconfig paths for react-docgen
11:41:41 [vite] ✨ new dependencies optimized: @storybook/blocks
11:41:41 [vite] ✨ optimized dependencies changed. reloading

```

TextInput.stories.tsx

```
import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

const meta =  {
  title: 'TextInput',
  component: TextInput,
//   tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {}
```

chromaticへ共有

```
> npm install --save-dev chromatic

up to date, audited 1065 packages in 1s

265 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> npm run chromatic

Chromatic CLI v11.5.3
https://www.chromatic.com/docs/cli

  ✔ Authenticated with Chromatic
    → Using project token '****************3410'
  ✔ Retrieved git information
    → Commit '1a3ab85' on branch 'main'; found 1 parent build
  ✔ Collected Storybook metadata
    → Storybook 8.1.9 for React; using the @storybook/react-vite builder (8.1.9); supported addons found: Links, Essenti
als, Interactions
  ✔ Initialized build
    → Build 2 initialized
  ✔ Storybook built in 5 seconds
    → View build log at /Users/sshin/I/react_demo_2024/build-storybook.log
  ✔ Publish complete in 2 seconds
    → Uploaded 1 file (1.03 kB), skipped 75 files
  ✔ Started build 2
    → View build details at https://www.chromatic.com/build?appId=666d3dac3ae6f5e8d82512ea&number=2
  ✔ Build 2 passed!
    → Tested 1 story across 1 component; captured 1 snapshot in 5 seconds

✔ Storybook published
We found 1 component with 1 story.
ℹ View your Storybook at https://666d3dac3ae6f5e8d82512ea-whqgokfzps.chromatic.com/

✔ Build 2 passed!
```

### tailwindcss

```
> npm install -D tailwindcss postcss autoprefixer

added 32 packages, and audited 1097 packages in 7s

271 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> npx tailwindcss init -p

Created Tailwind CSS config file: tailwind.config.js
Created PostCSS config file: postcss.config.js
```

tailwind.config.js

```
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Unknown at rule @tailwind解消

settings.json

```
{
    "files.associations": {
        "*.css": "tailwindcss"
    }
}
```

### shadcn/ui

[shadcn/ui](https://github.com/shadcn-ui/ui)とは、TailwindCSS を通じてスタイルをカスタマイズできる。[2023 JavaScript Rising Stars](https://risingstars.js.org/2023/en#section-all)ランキング1位

通常のコンポーネントライブラリとは異なり、npmパッケージとして配布されていないので、npmの依存関係に影響しない。コンポーネントのコードはCLIでダウンロードする。

```
> npx shadcn-ui@latest init
Need to install the following packages:
shadcn-ui@0.8.0
Ok to proceed? (y) y

✔ Would you like to use TypeScript (recommended)? … no / yes
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Where is your global CSS file? … src/index.css
✔ Would you like to use CSS variables for colors? … no / yes
✔ Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) …
✔ Where is your tailwind.config.js located? … tailwind.config.js
✔ Configure the import alias for components: … @/components
✔ Configure the import alias for utils: … @/lib/utils
✔ Are you using React Server Components? … no / yes
✔ Write configuration to components.json. Proceed? … yes

✔ Writing components.json...
✔ Initializing project...
✔ Installing dependencies...

Success! Project initialization completed. You may now add components.
```

@/components/ui/button.tsx

```
npx shadcn-ui@latest add button
✔ Done.
```
