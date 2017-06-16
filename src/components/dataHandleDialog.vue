<template>
<div class="add">
  <!--添加员工的表单-->
  <el-dialog :title=method.title :visible.sync="dialogFormVisible" @close="clearData">
    <el-form :model="EmployeeData" >
      <!--基本信息部分-->
      <div class="part" v-for="(datas, index) in dataMask">
      <div class="basicInfo spiltLine"><span class="title"></span>
        <div class="linewrap"><span class="line"></span></div></div>
      <el-form-item :label=data.label :label-width="formLabelWidth" v-for="data in datas">
        <el-input v-model="EmployeeData[data.prop]" auto-complete="off" v-if="data.type === 'input'"></el-input>
        <el-select v-model="EmployeeData[data.prop]" :placeholder="data.label" v-else>
          <el-option :label=option :value=option v-for="option in data.option"></el-option></el-select>
      </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clearData">取 消</el-button>
      <el-button type="primary" @click="editEmployeeData" v-if="method.handle==='edit'">确 定</el-button>
      <el-button type="primary" @click="addEmployeeData" v-else>确 定</el-button>
      <!--<el-button type="primary" @click="(method === 'edit') ? 'editEmployeeData':'addEmployeeData'">确 定</el-button>-->
      <!--<el-button type="primary" @click="addEmployeeData">确 定</el-button>-->
    </div>
  </el-dialog>
</div>
</template>
<script>
  import api from '@/services/user'
  import axios from 'axios'
  export default {
    props: ['EmployeeData', 'method', 'dialogFormVisible'], // 想让添加员工和编辑员工的操作都用一个表来实现
    computed: {
      //  这里用箭头符号怎么不可以呢
//     dataMask=> this.method === 'edit'?  this.editEmployeeDataMask: this.addEmployeeDataMask
      dataMask: function () {
        return this.method.handle === 'edit' ? this.editEmployeeDataMask : this.addEmployeeDataMask
      }
    },
    data () {
      return {
        formLabelWidth: '100px',
        roleArr: ['早班', '午班', '晚班'],
//        这里需要一套增加员工数据的模板;
        addEmployeeDataMask: [
          [
            {'prop': 'realname', 'label': '员工姓名', 'type': 'input'},
            {'prop': 'phonenum', 'label': '电话号码', 'type': 'input'},
            {'prop': 'identitynum', 'label': '身份证号码', 'type': 'input'},
            {'prop': 'age', 'label': '年龄', 'type': 'input'},
            {'prop': 'sex', 'label': '性别', 'type': 'select', 'option': ['男', '女']},
            {'prop': 'location', 'label': '籍贯', 'type': 'input'}
          ], [
            {'prop': 'username', 'label': '用户名', 'type': 'input'},
            {'prop': 'password', 'label': '密码', 'type': 'input'},
            {'prop': 'department', 'label': '所属部门', 'type': 'select', 'option': ['部门一', '部门2']},
            {'prop': 'dpheader', 'label': '部门主管', 'type': 'input'},
            {'prop': 'role_name', 'label': '职位', 'type': 'select', 'option': ['前台', '经理', '主管']},
            {'prop': 'classes', 'label': '班次', 'type': 'select', 'option': ['早班', '午班', '晚班']},
            {'prop': 'indutime', 'label': '入职时间', 'type': 'input'}]
        ],
        //  这里需要一套编辑员工数据的模板
        editEmployeeDataMask: [
          [
          {'prop': 'realname', 'label': '员工姓名', 'type': 'input'},
          {'prop': 'phonenum', 'label': '电话号码', 'type': 'input'},
          {'prop': 'identitynum', 'label': '身份证号码', 'type': 'input'},
          {'prop': 'age', 'label': '年龄', 'type': 'input'},
          {'prop': 'sex', 'label': '性别', 'type': 'select', 'option': ['男', '女']},
          {'prop': 'location', 'label': '籍贯', 'type': 'input'}
          ], [
            {'prop': 'department', 'label': '所属部门', 'type': 'select', 'option': ['部门一', '部门2']},
            {'prop': 'dpheader', 'label': '部门主管', 'type': 'input'},
            {'prop': 'role_name', 'label': '职位', 'type': 'select', 'option': ['前台', '经理', '主管']},
            {'prop': 'classes', 'label': '班次', 'type': 'select', 'option': ['早班', '午班', '晚班']},
            {'prop': 'indutime', 'label': '入职时间', 'type': 'input'}]
        ]
      }
    },
    methods: {
      //      添加员工数据的事件
      addEmployeeData () {
        console.log('增加员工数据')
        const self = this  //  其实这里不用将this赋值给self的
        api.addEmployee({
          realname: self.EmployeeData.realname, // 员工姓名
          phonenum: self.EmployeeData.phonenum, // 电话号码
          identitynum: self.EmployeeData.identitynum, // 身份证号码
          age: self.EmployeeData.age, // 年龄
          sex: self.EmployeeData.sex, // 性别
          location: self.EmployeeData.location, // 籍贯
          username: self.EmployeeData.username, // 账号
          password: self.EmployeeData.password, // 密码
          department: self.EmployeeData.department, // 所属部门
          dpheader: self.EmployeeData.dpheader, // 部门主管
          role_name: self.EmployeeData.role_name, // 职位
          classes: self.EmployeeData.classes, // 班次
          indutime: self.EmployeeData.indutime // 入职时间
        })
          .then((data) => {
            this.clearData()
            this.$message({
              type: 'info',
              message: '成功添加员工'
            })
            this.$emit('getEmployee')
          })
          .catch((err) => {
            this.$message({
              type: 'info',
              message: err
            })
            console.log(err)
          })
      },
//      修改员工的数据的方法
      editEmployeeData () {
        const self = this
        axios.put('/api/api/v1.0/employee/' + this.EmployeeData.id, {
          realname: self.EmployeeData.realname, // 员工姓名
          phonenum: self.EmployeeData.phonenum, // 电话号码
          identitynum: self.EmployeeData.identitynum, // 身份证号码
          age: self.EmployeeData.age, // 年龄
          sex: self.EmployeeData.sex, // 性别
          location: self.EmployeeData.location, // 籍贯
          department: self.EmployeeData.department, // 所属部门
          dpheader: self.EmployeeData.dpheader, // 部门主管
          role_name: self.EmployeeData.role_name, // 职位
          classes: self.EmployeeData.classes, // 班次
          indutime: self.EmployeeData.indutime // 入职时间
        })
          .then((data) => {
            this.clearData()
            this.$message({
              type: 'info',
              message: '成功修改员工信息'
            })
            this.$emit('getEmployee')
          })
          .catch((err) => {
            console.log(err)
          })
      },
//      关闭了弹出框之后就将之前的数据清空
      clearData () {
        for (var i in this.EmployeeData) {
          this.EmployeeData[i] = ''
        }
        this.closeDialog(false)
      },
      // 关闭弹出框
      closeDialog () {
        this.$emit('close', false)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  /*添加员工模块*/
  .add {
  .el-dialog {
    width:55%;
  .el-dialog__header {
    background: #20a0ff;
    height:40px;
    line-height: 40px;
    padding:0 20px 0 20px;
  .el-dialog__title {
    color: white;
  }
  }
  .spiltLine {
  .title{
    display: inline-block;
    width: 100px;
    text-align: right;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
    color: #20a0ff;
  }
  .linewrap {
    display: inline-block;
    width: 79%;
    padding-left: 100px;
    box-sizing: border-box;
    height: 1px;
    line-height: 1px;
    border-bottom: 1px dotted gray;
    vertical-align: middle;
  .line {
  }
  }
  }
  .el-dialog__body {
    padding:20px 40px;
  .el-form-item {
    display: inline-block;
    width:48%;
    margin-bottom: 10px;
  .el-input {
  input {
    border-radius: 0;
    height:30px;
  }
  .el-input__icon+.el-input__inner {
    padding-right: 70px;
  }
  }
  }
  }
  }
  }
</style>
