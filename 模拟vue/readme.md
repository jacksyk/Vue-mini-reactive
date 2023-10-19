## 注意点
---
1.为什么在Vue实例上绑定属性？
    便于使用this访问

---
2.为什么在Vue实例上只需要绑定data中的最开始属性？
    在Vue实例上，绑定data中最开始的属性，只需要监听第一层。监听完了后会走到data上面去，所以说data要监听多层。

---

3.childNodes和children的区别？
    childNodes包含所有的节点，包括文本节点，children只包含元素节点。


---

4.attributes 获取节点的所有属性
    attributes是一个类数组，里面包含了节点的所有属性，但是不包含class和style属性，因为这两个属性是对象，不是字符串。