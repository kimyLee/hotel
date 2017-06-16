<template>
  <el-button type="text" @click="open" ></el-button>
</template>
<script>
  export default {
    methods: {
      open() {
        this.$alert('确定删除员工？', '删除员工', {
          confirmButtonText: '确定',
          cancelButtonText: '返回',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
  }
</script>
<style>
</style>
