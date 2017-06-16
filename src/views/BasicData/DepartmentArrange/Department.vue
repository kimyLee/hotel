<template>
  <div class="EmployeePart">
    <nav-header></nav-header>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="ID" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="员工名称" width="180"></el-table-column>
      <el-table-column prop="address" label="手机号码" width="180"></el-table-column>
      <el-table-column prop="date" label="职业" width="180"></el-table-column>
      <el-table-column prop="name1" label="部门主管" width="180"></el-table-column>
      <el-table-column prop="address1" label="职位" width="180"></el-table-column>
      <el-table-column prop="name3" label="所属班次" width="180"></el-table-column>
      <el-table-column prop="address9" label="入职时间" width="180"></el-table-column>
    </el-table>
  </div>
</template>
<style>
</style>
<script>
  import navheader from '@/components/NavHeader.vue'
  export default {
    components: {navheader},
    data () {
      return {
        tableData: [{
          ID: '1',
          name: 'ee',
          address: 'sss',
          date: '490',
          name1: 's',
          address1: 'ees',
          name3: 'sw',
          address9: 'dd'
        }]
      }
    }
  }
</script>
