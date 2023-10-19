class Dep {
    constructor() {
        this.subs = []; // 订阅者
    }
    // TODO: 添加订阅者
    addSub(sub) {
        // TODO: 添加订阅者, 订阅者是要有update方法的
        if (sub && sub.update) {
            this.subs.push(sub);
        }
    }
    // TODO: 发送通知
    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        });
    }
}
