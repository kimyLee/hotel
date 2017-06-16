<template>
<div class="homepage">
  <nav-header></nav-header>
  <div class="tab-part">
    <el-menu theme="light"  class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">当前房态</el-menu-item>
      <el-menu-item index="2">预定</el-menu-item>
      <el-menu-item index="3">远前房态</el-menu-item>
      <el-menu-item index="4">收银</el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
  <div class="search-part">
    <div class="Guest-search">
      <el-button type="primary" icon="search" style="float:left ">搜索</el-button>
      <el-input v-model="input" placeholder="请输入内容" resize="horizontal" style="width:100px;">
        客人姓名
      </el-input>
    </div>
    <div class="room-state-search"></div>
  </div>
  <div class="room-show-part">
    <div class="floor-part"  v-for="floor in 6">
      <div class="floor-index">0{{floor}}层</div>
      <div class="room-detail">
        <el-row >
          <el-col class="box-card" v-for="o in 8" >
            <el-card >
              <div v-for="o,roomdetail in (roomInfo,roomDetail)" :key="o" class="text item">
                {{o}}:{{roomdetail}}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <div class="room-state-part">
    <div class="color-tag">
      <el-tag v-for="tag in tags" v-bind:color=tag.color style="margin-right: 10px">{{tag.type }}   {{tag.number}}</el-tag>&nbsp;&nbsp;
    </div>
    <div class="state-tag">
    </div>
    </div>
</div>
</template>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  export default {
    components: {NavHeader},
    data () {
      return {
        roomInfo: ['房间号', '房间号', '房间号', '房间号'],
        roomDetail: ['001', '001', '001', '001'],
        tags: [
          {type: '全部房间', color: 'gray', number: 30},
          {type: '空房', color: 'black', number: 30},
          {type: '在住', color: 'green', number: 30},
          {type: '预定', color: 'pink', number: 30},
          {type: '司陪房', color: 'orange', number: 30},
          {type: '自用', color: 'blue', number: 30},
          {type: '招待房', color: 'red', number: 30}
        ]
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .homepage {
    position: absolute;
    width:100%;
    height:100%;
    overflow: hidden;
    .search-part {
      width:100%;
      height:40px;
      padding:10px;
      background-color: cornsilk;
      .Guest-search {
        width:200px;
      }
    }
    .room-show-part {
      width: 100%;
      height:calc(100vh - 300px);
      overflow: auto;

      .floor-part {
        width:100%;
        display: flex;
        .floor-index {
          width:60px;
          margin:20px 0px 0px 20px;
          height:40px;
          border-radius: 10px;
          background-color: deepskyblue;
          line-height: 40px;
          text-align: center;
          color: white;
        }
        .room-detail {
          flex:1;
        }
      }
      .box-card {
        width: 200px;
        margin:10px;
        .text {
          font-size: 14px;
        }
        .item {
          padding: 5px 0;
        }
      }
    }
    .room-state-part {
      /*background-color: brown;*/
      padding:20px;
      width:100%;
      height:100px;
      position: fixed;
      bottom:0;
      box-sizing: border-box;
    }
  }
</style>
