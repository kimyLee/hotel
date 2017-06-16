<template>
  <div class="loginPart">
    <div class="login">
      <h1 class="title">千层汇酒店管理</h1>
      <div class="form-field">
        <input class="form-part email" type="text" name="email" placeholder="邮箱/手机号" v-model="username">
        <i class="icon close fa fa-times-circle" aria-hidden="true" style="right: 12px;"></i>
      </div>
      <div class="form-field">
        <input type="password" class="form-part password"  name="password" placeholder="密码" v-model="password">
        <i class="icon close fa fa-times-circle" aria-hidden="true" style="right: 35px;"></i>
        <i class="icon eye fa fa-eye" aria-hidden="true" style="right: 12px;"></i>
        <i class="icon eye fa fa-eye-slash" aria-hidden="true" style="right: 12px;display: none"></i>
      </div>
      <div class="form-field" @mouseover="show" @mouseout="unshow">
        <button class="form-part submit" type="submit" @click="login">登 录<i v-bind:class="{show:isShow}"
                                                                            style="display: none;"
                                                                            class="fa fa-arrow-circle-right"
                                                                            aria-hidden="true"></i></button>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/services/user.js'
  export default {
    data () {
      return {
        isShow: false,
        username: '',
        password: ''
      }
    },
    methods: {
      show () {
        this.isShow = true
      },
      unshow () {
        this.isShow = false
      },
      login () {
        console.log(this.username)
        console.log(this.password)
        api.login({
          username: this.username,
          password: this.password
        })
          .then((data) => {
            this.$message('登陆成功')
            this.$router.push({name: 'home'})
          })
          .catch((err) => {
            this.$message.error(err)
            console.log(err)
          })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .loginPart {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      text-align: center;
    }
    .form-field {
      position: relative;
      .icon {
        color: lightgrey;
        cursor: pointer;
        position: absolute;
        top: 20px;
        transform: translateY(-50%);
      }
      .close {
        &:hover {
          color: dodgerblue;
        }
      }
      .eye {
        right: 10px;
      }
    }
    .form-part {
      box-sizing: border-box;
      border-radius: 4px;
      outline: none;
      width: 300px;
      margin-bottom: 40px;
      padding: 4px;
    }
    .email, .password {
      height: 40px;
      border: 1px solid grey;
    }
    .submit {
      cursor: pointer;
      font-size: 18px;
      height: 50px;
      color: white;
      border: 1px solid #3DA8F5;
      background: #3DA8F5;
      transition: all 125ms ease;
      &:hover {
        padding-right: 20px;
        background: dodgerblue;
      }
      .show {
        display: inline-block !important;
        font-size: 30px;
        vertical-align: middle;
        margin-left: 10px;
      }
    }
  }
</style>
