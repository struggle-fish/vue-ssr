###  Vuex

注意 state getters 都是在 computed 里面获取的
actions mutations 是映射到 methods 里面。是方法一定要触发

> .vue 文件中提交mutations修改state中的值

使用 this.$store.commit();

```
computed: {
  count () {
    return this.$store.state.count
  }
},
mounted () {
  let i = 1
  setInterval(() => {
    this.$store.commit('updateCount', i++)
  }, 1000)
}

```

> state

注册

```
import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'

export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters
  })
}

```




> getters

理解成 coumputed  接口提供的数据不适合前端展示的时候。需要组装。组装的过程如果多个页面要用，此时数据可以放到store里面

getters从表面是获得的意思，

可以把他看作在获取数据之前进行的一种再编辑,相当于对数据的一个过滤和加工。

```
// ========= getters.js ===============
export default {
  fullName (state) {
    return `${state.firstName}-${state.lastName}`
  }
}

// ========= .vue文件 ===============
computed: {
  count () {
    return this.$store.state.count
  },
  fullName () {
    return this.$store.getters.fullName
  }

}

```

#### 组件内使用 vuex

> mapState

```
// 注意 state getters 都是在 computed 里面获取的
computed: {
  ...mapState(['count']) // 此处名字就是state定义的名字
}
// 重命名
...mapState({
  counter: 'count'
})
// 函数返回
...mapState({
  counter: (state) => state.count
})

```

> mapGetters

```
computed: {
  ...mapGetters(['fullName'])
}
// 重命名 映射
...mapGetters({
  fullNames: 'fullName'
})
```


#### mutation

mutation 第二参数是个对象

**页面中提交 mutation 使用 commit**

```
// ========= .vue文件 ===============
this.$store.commit('updateCount', {
  num: i++,
  num2: 3
})

// ========= mutation ===============
export default {
  updateCount (state, { num, num2 }) {
    state.count = num
  }
}

```

外面也可以修改 state的数据 但是官方不推荐。 规范数据修改

```
mounted () {
  this.$store.state.count = 9
}

```
> mapMutations

```
// 映射 mutations
methods: {
  ...mapMutations(['updateCount'])
}

// 原来的 commit 直接更改为函数调用
mounted () {
  let i = 1
  setInterval(() => {
    this.updateCount({
      num: i++,
      num2: 3
    })
  }, 1000)
}

```




#### action

用来修改数据。为什么要有 action ? mutation 必须是同步操作。

action 里面可以有异步的代码。

**页面中触发 action 使用 dispatch**

```
// 页面中触发 action 使用 dispatch
mounted () {
  this.$store.dispatch('updateCountAsync', {
    num: 1,
    time: 2000
  })
}

```
> mapActions

映射后不需要再传名字。方便使用

```
// 映射需要的函数
methods: {
  ...mapActions(['updateCountAsync'])
}

// 调用则由原来的 dispatch 更改入下
this.updateCountAsync({
  num: 1,
  time: 2000
})


```


#### 分模块 && 热更新

配置模块化

每个模块都包含如下

```
// ========= index.js ===============
const state = {
};

const actions = {
};

const getters = {
};

const mutations = {
};

export default {
  state,
  actions,
  getters,
  mutations
};

// ========= 注册模块 ===============
new Vuex.Store({
  modules: {
    index
  },
  strict: process.env.NODE_ENV !== 'production' // 开启严格模式
});

```
> 命名空间

- mutations
```
// ========= modules ===============
modules: {
  a: {
    namespaced: true, // 命名空间为 true
    state: {
      text: '1'
    },
    mutations: {
      updateText (state, text) {
        state.text = text
      }
    }
  }
}
// ========= 调用 ===============
computed: {
  ...mapState({
    textVal: (state) => state.a.text
  })
}
methods: {
  ...mapMutations(['a/updateText'])
}
mounted () {
  // 触发 方法
  this['a/updateText']('999')
}
```
- getters

```
modules: {
  a: {
    namespaced: true, // 命名空间为 true
    state: {
      text: '1'
    },
    mutations: {
      updateText (state, text) {
        state.text = text
      }
    },
    getters: {
      textPlus (state, getters, rootState) {
        // getters 所有的 getters
        // rootState 全局 state
        return state.text + 1
      }
    }
  }
}
// ========= 调用 ===============
computed: {
  ...mapGetters({
    textPlus: 'a/textPlus'
  })
}

html 中直接 {{ textPlus }}

```
- actions

```
// 注意如果想要调用全局的 需要传一个 对象设置 root 为true

actions: {
  add ({ state, commit, rootState }) {
    commit('updateText', rootState.count, { root: true })
  }
}

```
> 热更新

注意： 在修改 getters 可以热更新成功过。但是 state 里面直接改没成功。不知道咋回事。

```
// ========= store.js ===============
if (module.hot) {
  module.hot.accept([
    './state/state',
    './mutations/mutations',
    './actions/actions',
    './getters/getters'
  ], () => {
    const newState = require('./state/state').default
    const newMutations = require('./mutations/mutations').default
    const newActions = require('./actions/actions').default
    const newGetters = require('./getters/getters').default

    store.hotUpdate({
      state: newState,
      mutations: newMutations,
      getters: newGetters,
      actions: newActions
    })
  })
}

```






#### 模块动态注册 registerModule

```
// ========= index.js 入口文件 ===============
store.registerModule('c', {
  state: {
    text: 3
  }
})

```
