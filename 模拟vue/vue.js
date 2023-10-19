// new Vue({
//     el: '#app',
//     data: {
//         message: 'Hello Vue.js!'
//     }
// })
// 从上述用法当中，我们可以看到，Vue.js 通过一个构造函数 Vue 创建一个 Vue 的根实例，这个实例作为我们的数据的入口，
// 我们可以通过 el 属性来指定一个页面中已存在的 DOM 元素来挂载 Vue 实例，然后通过 data 属性来指定这个实例的数据模型，也就是我们的数据来源。
// 在这个例子中，我们指定的数据模型是 message，也就是说我们可以在页面中通过 {{ message }} 的形式来访问到这个数据，这个数据也是响应式的，
// 也就是说当我们修改了这个数据之后，页面中绑定了这个数据的地方也会同步更新。

// 1.接受初始化参数
// 2.将data中的参数转换成getter/setter，注入到vue实例中,可以通过this来访问
// 3.调用observer对象，监听数据的变化
// 4.调用compiler对象，解析指令和差值表达式
// 5.将data中的数据也要转换陈data属性。

class Vue {
    constructor(options) {
        this.$options = options || {};
        this.$data = options.data || {};
        this.$el =
            typeof options.el === "string"
                ? document.querySelector(options.el)
                : options.el;
        this._proxyData(this.$data); // TODO: data中的数据转换为getter/setter,并且注入到Vue当中
        new Observer(this.$data); // TODO: 监听数据的变化
        new Compiler(this); // TODO: 解析指令和差值表达式
    }
    _proxyData(data) {
        Object.keys(data).forEach((key) => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    console.log("先访问vue实例");
                    return data[key];
                },
                set(newVal) {
                    if (newVal === data[key]) {
                        return;
                    }
                    data[key] = newVal;
                    // TODO: 数据变化，发送通知，响应式操作
                },
            });
        });
    }
}
