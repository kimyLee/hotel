<template>
  <div class="EmployeePart">
    <nav-header></nav-header>
    <div class="tabPart">
      <!--tab分类标签部分-->
      <div class="tab">分类标签部分</div>
    <!--搜索所属班次的模块-->
      <div class="searchPart">
        <div class="labortime search">
          <div class="searchtitle"><span>所属班次</span></div>
          <el-select v-model="classValue" @change="handleSelectionChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      <!--员工姓名搜索-->
        <div class="laborname search">
          <div class="searchtitle">员工姓名</div>
          <el-input v-model="laborname" icon="search" :on-icon-click="labornameSearch"></el-input>
        </div>
      </div>
      <!--添加员工模块-->
      <div class="add">
        <el-button type="primary" icon="edit"  @click="handleAdd">新增员工</el-button>
        <handle-Employee :EmployeeData="handleData" :method="method"
                         :dialogFormVisible="dialogFormVisible" @close="closeDialog" @getEmployee="getEmployee"></handle-Employee>
      </div>
    </div>
    <!--数据表格列表-->
    <el-table
      :data="tableData" align="center"
      border
      class="tableData" >
      <el-table-column  :prop=tabledata.prop  :label=tabledata.label :width=tabledata.width
                         v-for="tabledata in tableConfig" >
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!--<handle-Employee :EmployeeData="editEmployeeData" :method="edit"-->
                       <!--:dialogFormVisible="dialogFormVisible1" @close="closeDialog" @getEmployee="getEmployee"></handle-Employee>-->
    </el-table>
  </div>
</template>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  import api from '@/services/user'
  import axios from 'axios'
  import handleEmployee from '@/components/dataHandleDialog.vue'
  export default {
    components: {NavHeader, handleEmployee},
    data () {
      return {
//      筛选所属班次的数据流
        classValue: '所有班次',
        options: [
          {value: '早班', label: '早班'},
          {value: '午班', label: '午班'},
          {value: '晚班', label: '晚班'},
          {value: '所有班次', label: '所有班次'}],
        tableData: [],  //   请求的员工信息数据
        tableData1: [], //   备份的员工信息数据
        tableConfig: [   //  员工表格数据基本信息，存放员工的基本数据，对象数组
          {prop: 'id', label: '员工id', width: '100'},
          {prop: 'realname', label: '员工名称', width: '150'},
          {prop: 'phonenum', label: '手机号码', width: '160'},
          {prop: 'classes', label: '班次', width: '120'},
          {prop: 'department', label: '所属部门', width: '120'},
          {prop: 'role_name', label: '职位', width: '150'},
          {prop: 'indutime', label: '入职时间', width: '150'},
          {prop: 'username', label: '登录账号', width: '150'},
          {prop: 'password', label: '登录密码', width: '150'}
        ],
        laborname: '', //   员工姓名搜索
//        添加模块的表单部分：
        dialogFormVisible: false,
//      增加员工所需要用到的数据，创建一个增加员工的数据模板
        EmployeeData: {
          realname: '',
          phonenum: '',
          identitynum: '',
          age: '',
          sex: '',
          location: '',
          username: '',
          password: '',
          department: '',
          dpheader: '',
          role_name: '',
          classes: '',
          indutime: ''
        },
        //  编辑员工所需要的数据
        editEmployeeData: {
          realname: '',
          phonenum: '',
          identitynum: '',
          age: '',
          sex: '',
          location: '',
          department: '',
          dpheader: '',
          role_name: '',
          classes: '',
          indutime: ''
        },
        handleData: {},  // 增加员工以及编辑员工数据，传给datahandledialog组件的数据
        method: {} //  edit是编辑方法，add是添加员工方法;同时传递标题
      }
    },
    methods: {
//      输入员工进行点击筛选的操作
      labornameSearch () {
        this.getEmployee(this.laborname)
      },
//      这里是选择所属班次的方法，使用filter可以选择对象数组中对应数组中某个键值的数组 用中间的一个数据，来达到每次更新数据的方法
      handleSelectionChange (selection) {
        this.tableData = this.tableData1
        if (selection !== '所有班次') {
          this.tableData = this.tableData.filter(item => item.classes === selection)
        }
      },
//     获取员工数据的请求；如果有员工数据就筛选出该员工的数据，如果没员工数据就请求所有的数据
      getEmployee (laborname) {
        api.getEmployee({
          realname: laborname
        })
          .then((data) => {
            this.tableData = data.data
            this.tableData1 = data.data
          })
          .catch((err) => {
            console.log(err)
          })
      },
//    删除员工
      handleDelete (index, row) {
        console.log(index, row)
        console.log(row.id)
        this.$alert('确定删除员工' + row.realname + '?', '删除员工', {
          confirmButtonText: '确定',
          cancelButtonText: '返回',
          callback: action => {
            this.$message({
              type: 'info',
              message: '成功删除员工'
            })
            this.deleteEmployee(row.id)
          }
        })
      },
//      删除员工的数据请求事件
      deleteEmployee (id) {
        axios.delete('/api/api/v1.0/employee/' + id)
          .then((data) => {
            console.log(data)
            this.getEmployee()
          })
          .catch((err) => {
            console.log(err)
          })
      },
//      编辑员工信息
      handleEdit (index, row) {
//        首先需要获取到员工的id，从而得到该id下的员工数据 其中tableData就是所有的员工数据，用filter来获取某个id下的员工数据
        var tableData = {}
        tableData = this.tableData.filter(item => item.id === row.id) // 获取到id下的员工数据
        var arr = tableData
        var obj = {}       //   返回的是数组，需要先转换为对象
        for (var i = 0; i < arr.length; i++) {
          for (var k in arr[i]) {
            obj[k] = arr[i][k]
          }
        }
        //  匹配要编辑的员工数据
        for (var j in this.editEmployeeData) {
          this.editEmployeeData[j] = obj[j]
        }
        //   这里需要再补充一个id，因为后面数据请求是以id来查询的，不知道后面有没有什么好一点的方法
        this.editEmployeeData['id'] = obj['id']
        this.handleData = this.editEmployeeData
        this.dialogFormVisible = true
        this.method = {handle: 'edit', title: '编辑员工'}  // 传递edit的方法
      },
      //   增加员工数据
      handleAdd () {
        this.handleData = this.EmployeeData
        this.dialogFormVisible = true
        this.method = {handle: 'add', title: '增加员工'}
      },
      //  当那边触发关闭事件的时候，这边的显示值就要关闭，那边会传过来一个false
      closeDialog (val) {
        this.dialogFormVisible = val
      }
    },
    mounted () {
      //  初始化数据的时候，请求员工数据
      this.getEmployee()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .EmployeePart {
    .tabPart {
      display: flex;
      padding-right: 100px;
      border-bottom: 1px solid grey;
      .tab {
        flex:1;
        background-color: red;
      }
      .searchPart {
        /*flex:1;*/
        padding:20px;
        .search {
          display: inline-flex;
          .searchtitle {
            font-size: 12px;
            display: inline-block;
            height: 36px;
            line-height: 36px;
            background: #20a0ff;
            color: white;
            text-align: center;
            width: 80px;
          }
          .el-select {
            display: inline-block;
            input {
              font-size: 12px;
              width:140px;
              border-radius: 0;
            }
          }
          .el-input {
            width:140px;
            input {
              font-size:12px;
              width:140px;
              border-radius: 0;
            }
          }
        }
      }
      .add {
        padding:20px;
      }
    }
    .tableData {
      width:100%;
      .cell {
        text-align: center;
      }
    }
  }
</style>
