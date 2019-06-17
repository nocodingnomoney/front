# front

前端代码库

## 代码风格及规范
详情请参考[谷歌推行的代码规范](https://google.github.io/styleguide/jsguide.html)

## 代码风格及规范(翻译)
1. 使用VSCode进行编码的话,安装Clang-Formatter进行代码的格式化~
2. 其他的...还是看链接

## 协作流程

GitHub-Flow

## 具体执行

### 前情提要

1. 开发时一切皆以develop为主
2. 本流程不完全遵循GitHub-Flow,但是演变自GitHub-Flow,旨在达到最方便的协作

### 情景假设

1. 分工情况
   - 代码负责人: Master
   - 搬砖程序员: Tony, Jack
   - 理发功能模块负责人: Tony
   - 绘画功能模块负责人: Jack
2. 工作流程
   - Tony在`develop`分支上创建一个分支`develop-haircut`
   - Jack在`develop`分支上创建一个分支`develop-painting`
   - Tony在`develop-haircut`上写垃圾代码写得不亦乐乎
   - Jack在`develop-painting`上写垃圾代码写得不亦乐乎
   - Tony把自己的代码push上`develop-haircut`
   - Jack把自己的代码push上`develop-painting`
   - Tony在GitHub上发起`pull request`,请求合并到`develop`,设定`reviewer`为Master
   - Jack在GitHub上发起`pull request`,请求合并到`develop`,设定`reviewer`为Master



## 要点

上面的工作流程中, 无论Jack怎么改自己的代码, 什么时候改代码, 都不会与Tony冲突, 反之对Tony而言也是如此, 但是两个人的代码始终会有冲突, 那么解决冲突就由上层的Master来决定.

如果代码写得太垃圾, Master也是可以拒绝合并的, 直接修改到Master满意为止

~~如果Jack和Tony设置Reviewer为彼此的话那就可以狼狈为奸了~~

#### 下面是运行、开发、部署该项目的要点
***

## Project setup: 在开始开发之前安装好依赖包
```
npm install
```

### Compiles and hot-reloads for development: 请在开发时运行
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
