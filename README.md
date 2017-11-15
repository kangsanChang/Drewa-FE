# drewa-fe

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Develop log

## Vue-cli 를 통한 프로젝트 빌드
``` bash
vue init webpack-simple drewa-fe
```

## 필요한 모듈 설정

``` bash
# API 서버 요청
npm i --save axios
# Async await 사용하기 위한 babel preset
npm i --save babel-preset-stage-2
# babel 런타임 빌드
npm i --save babel-plugin-transform-runtime
# element-ui
npm i --save element-ui
# IE 에서 Promise 지원하기 위함
npm i --save es6-promise

# Vuex, Vue Router
npm i --save vuex
npm i --save vue-router
```

## element-ui 설정

webpack.config.js 에서 font 나 icon 들을 번들링하기 위해 webpack에 설정

```javascript
// webpack.config.js

module: {
    rules: [
        //...
        ,
        {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
        }
    ]
```

## main.js 설정

## layout
`el-` 로 시작하는 layout 잡음. container, main ...
tag 처럼 써놓고 css 사용할 떄는 class 로 잡으면 된다.
```html
<el-main>
...
</el-main>
```
```css
.el-main {
    /* ... */
}
```