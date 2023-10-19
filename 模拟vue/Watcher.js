class Watcher {
    /**
     *
     * @param {*} vm 实例对象
     * @param {*} key 属性名称
     * @param {*} cb 触发视图更新的回调函数
     */
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        Dep.target = this; // TODO:new 对象的时候，就会将这个实例绑定到Dep.target上面
        this.oldValue = vm[key]; // 获取更新之前的旧值
        Dep.target = null; // TODO: 防止重复添加
    }

    // TODO:更新视图的操作在这里执行
    update() {
        let newValue = this.vm[this.key]; // TODO:这里触发update的时候已经是新的值了。
        if (newValue === this.oldValue) {
            return;
        }
        this.cb(newValue); // TODO:调用回调函数，更新视图
    }
}
