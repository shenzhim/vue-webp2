# vue-webp2

vue-webp2 是基于vue的webp指令，在判断当前浏览器是否支持webp格式的图片时，如果支持webp则替换图片的src为webp的url。

### Usage

``` bash
$ npm install -save vue-webp2
```

```javascript
// in your main.js
import vwebp from 'vue-webp2'
Vue.use(vwebp)
```

v-webp的值格式包含以下几个值，并通过','链接

1. imgurl: 默认图片链接
2. webpurl: `webp:` + webp格式的图片链接, 可不填，链接默认为 imgurl + '.webp'
3. errurl: `err:` + 图片加载失败的链接，可不填

```html
<img v-webp="imgurl[,webp:webpurl][,err:errurl]" />

```



