1. props 的默认值需要使用 `withDefaults`

```
export interface Props {
  msg?: string
  labels?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

2. defineProps 泛型中传入的接口类型不能是外部导入的类型，必须是自己文件中定义的接口类型。
3. 在.vue 文件的 setup 语法糖不能导出接口(官方文档说后面会修复的)
4. nextTick 在 v2 中是宏任务和微任务交替改变的，但是 v3 中确定了是微任务，在上一个 tick 的队列中没有任务执行的时候会直接将 nextTick 中的函数传入 Promise.then(fn)中，加入微任务队列中执行。所以一定是微任务。

5. countup 数字递增的库
6. gsap，专业 web 动画库，相对比较重量级一点。

#### git Husky

1.安装
`npx husky-init && npm install`
生成的.husky 文件下的 pre-commit，写入`npm/pnpm run lint`,在代码提交之前会进行代码检测/优化

#### git commit

安装：`pnpm/npm install commitizen -D`
安装 cz-conventional-changelog 并初始化：
`npx commitizen init cz-concentional-changelog --save-dev --save-exact`

```
"config": {
   "commitizen": {
     "path": "cz-conventional-changelog"
   }
 }
```
`pnpm i @commitlint/config-conventional @commitlint/cli -D`
`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`
