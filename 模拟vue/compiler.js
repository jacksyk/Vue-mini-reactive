// 解析模板的类    指令(属性)和插值表达式
class Compiler {
    constructor(vm) {
        this.vm = vm;
        this.el = vm.$el;
        this.compile(this.el);
    }

    // 编译模板，处理文本节点和元素节点
    compile(el) {
        // TODO:获取el的子节点，注意childNodes和children的区别
        let childNodes = el.childNodes;
        Array.from(childNodes).forEach((node) => {
            if (this.isTextNode(node)) {
                this.compileText(node);
            } else if (this.isElementNode(node)) {
                this.compileElement(node);
            }

            // TODO:如果子节点不为空，则继续向下递归
            if (node.childNodes && node.childNodes.length) {
                this.compile(node);
            }
        });
    }

    // 编译文本节点，处理插值表达式
    compileText(node) {
        // 因为这里只需要处理一个节点，所以不需要利用循环的机制。
        let reg = /\{\{(.+?)\}\}/;
        if (reg.test(node.textContent)) {
            // console.log(RegExp.$1);
            let key = RegExp.$1.trim();
            node.textContent = node.textContent.replace(reg, this.vm[key]); // TODO:这里通过vm来获取
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue;
            });
        }
    }

    // 编译元素节点，处理指令
    compileElement(node) {
        let attributes = node.attributes;
        Array.from(attributes).forEach((attr) => {
            let name = attr.name;
            if (this.isDirective(name)) {
                let attrName = name.substr(2); // TODO:获取指令的具体名称，也就解释了为什么要使用v-开头
                let key = attr.value; // TODO:获取指令的值，对应的data中的属性
                this.update(node, key, attrName); // TODO:更新指令
            }
        });
    }

    // TODO:生成对应的指令名，以便于调用对应的指令更新函数
    update(node, key, attrName) {
        let updateFn = this[attrName + "Updater"];
        updateFn && updateFn(node, this.vm(key)); // TODO:这里的this指向的是Compiler类,这里的this.vm(key)是为了获取data中的数据，这里也是响应式数据。从而触发updateFn
    }

    // TODO:处理v-text指令
    textUpdater(node, value) {
        node.textContent = value;
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue;
        });
    }

    // TODO:处理v-model指令，主要用于处理表单元素，只有表单数据有value这个值
    modelUpdater(node, value) {
        node.value = value;
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue;
        });
        node.addEventListener("input", () => {
            this.vm[key] = node.value;
        });
    }

    // 判断是否为指令
    isDirective(attrName) {
        return attrName.startsWith("v-");
    }

    // 是否为文本节点
    isTextNode(node) {
        return node.nodeType === 3;
    }

    // 是否为元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
}
