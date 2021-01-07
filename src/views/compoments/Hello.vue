<template>
  <div class="home">
    <h1>{{appName}}</h1>
    <h1>{{userName}}</h1>
    <h1>{{userName}}</h1>
    <h1>{{appWithVersion}}</h1>
    <h1>{{firstLetter}}</h1>
    <h1>{{appVersion}}</h1>
    <button @click="changeAppName">修改AppName</button>
    <button @click="changeUserName">修改UserName</button>
    <button @click="register">注册动态模块</button>
    <input
      type="text"
      v-model="stateValue"
    >
    <p>{{stateValue}}</p>
    <p
      v-for="(li, index) in todoList"
      :key="index"
    >{{li}}</p>
  </div>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
// const { mapState } = createNamespacedHelpers('im')
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      inputValue: 'Vuex'
    }
  },
  computed: {
    // appName() {
    //   return this.$store.state.appName,

    // },
    // userName () {
    //   return this.$store.state.im.userName
    // }

    // 接受数组和对象
    ...mapState({
      appName: state => state.appName,
      userName: state => state.im.userName,
      appVersion: state => state.appVersion,
      todoList: state => state.todo ? state.todo.todoList : []
    }),
    stateValue: {
      get() {
        return this.$store.state.stateValue
      },
      set(value) {
        this.SET_STATE_VALUE(value)
      }
    }

    // import { mapState } from 'vuex' 命名空间方式使用
    // ...mapState('im', {
    //   userName: state => state.userName
    // }),

    // 数组访问
    // ...mapGetters('im', [
    //   'firstLetter'
    // ])


    // import { createNamespacedHelpers } from 'vuex'
    // const { mapState } = createNamespacedHelpers('im')
    // 命名空间方式使用
    // ...mapState({
    //   userName: state => state.userName
    // })

    // 通过 getters 修改 state 的值
    // appWithVersion() {
    //   return this.$store.getters.appWithVersion
    // }

  },
  mounted() {
  },
  methods: {
    ...mapMutations([
      'SET_APP_NAME',
      'SET_USER_NAME',
      'SET_STATE_VALUE'
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    changeAppName() {
      // this.$store.commit({
      //   type: 'SET_APP_NAME',
      //   app: '哈哈哈哈'
      // })

      this.SET_APP_NAME({ app: 'XXXXXXXXXX' })
      this.updateAppName()

      // 方式一
      // this.$store.commit('SET_APP_VERSION')
    },
    changeUserName() {
      this.SET_USER_NAME({ userName: 'Harvey' })
      // console.log(this.$store.dispatch);
      // this.$store.dispatch('updateAppName')
    },
    register() {
      this.$store.registerModule('todo', {
        state: {
          todoList: [
            'a',
            'b'
          ]
        }
      })
    },
    stateValueChange(val) {
      this.SET_STATE_VALUE(val)
    }
  }
}
</script>

<style>
</style>