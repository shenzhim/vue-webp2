;(function () {
    var canUseWebp = (function () {
        var elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        } else {
            return false;
        }
    })();

    function getOtherParams(vals){
        var otherParams = {};
        for(var i = 0; i < vals.length; i++) {
            var arr = vals[i].split(':');
            if (arr[0] === 'webp') {
                otherParams.webpSrc = arr[1];
            }
            if (arr[0] === 'err') {
                otherParams.errSrc = arr[1];
            }
        }
        return otherParams;
    }

    function update(el, option) {
        var attr = option.arg || 'src',
            value = option.value;

        if (value.indexOf('data:image') > -1) {
            el.setAttribute(attr, value);
        } else {
            var vals = (value || '').split(','),
                imgSrc = vals.shift();

            if (imgSrc) {
                var otherParams = getOtherParams(vals);

                var webpSrc = otherParams.webpSrc || (imgSrc + '.webp'),
                    imgUrl = canUseWebp ? webpSrc : imgSrc;

                if (attr === 'src') {
                    var image = new Image();
                    image.onload = function () {
                        el.setAttribute(attr, imgUrl);
                    };
                    image.onerror = function () {
                        if (otherParams.errSrc) el.setAttribute(attr, otherParams.errSrc);
                    };
                    image.src = imgUrl;
                } else {
                    el.setAttribute(attr, imgUrl);
                }
            }
        }
    }

    var vueWebp = {
        install: function (Vue) {
            Vue.directive('webp', {
                inserted: function (el, data) {
                    update(el, {
                        arg: data.arg,
                        value: data.value
                    });
                },
                componentUpdated: function (el, data) {
                    if (data.value !== data.oldValue) {
                        update(el, {
                            arg: data.arg,
                            value: data.value
                        });
                    }
                }
            })
        }
    }
    if (typeof exports == "object") {
        module.exports = vueWebp
    } else if (typeof define == "function" && define.amd) {
        define([], function () { return vueWebp })
    } else if (window.Vue) {
        window.VueWebp = vueWebp
        Vue.use(vueWebp)
    }
})()