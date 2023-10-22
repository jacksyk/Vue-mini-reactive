class Observer {
    constructor(data) {
        this.walk(data);
    }

    // 遍历data中的所有属性，都添加上getter和setter
    walk(data) {
        // 为空或者不为对象的时候，直接retur
        let that = this;
        if (!data || typeof data !== "object") {
            return;
        }

        // 遍历data对象的所有属性,并进行绑定
        Object.keys(data).forEach(function (key) {
            that.defineReactive(data, key, data[key]);
        });
    }
    // 定义响应式数据
    defineReactive(data, key, value) {
        let that = this;
        let dep = new Dep();
        this.walk(value); // TODO: 递归遍历所有子属性

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log("访问了Observer中的get方法");
                Dep.target && dep.addSub(Dep.target); // TODO: 这里的Dep.target就是Watcher类的实例
                return value;
            },
            set(newValue) {
                if (newValue === value) {
                    return;
                }
                // console.log("数据发生变化");
                value = newValue;
                // console.log(this);
                that.walk(newValue); // TODO: 如果设置的值是对象，也要进行监听
                dep.notify();
                // TODO: 数据变化，发送通知，响应式操作
            },
        });
    }
}
