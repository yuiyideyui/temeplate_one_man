<template>
  <div class="page-header-container">
    <div class="header-main">
      <div>

        11
      </div>
      <div class="header-main-center">
        <p class="title">绿路对象规划</p>
      </div>
      <div class="header-main-right">
       
            <p class="date"><img class="icon" src="@/assets/image/greenRoadPlanning/5.png" alt=""><span class="content"> 2023年3月1日</span></p>
       
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
 

const citySelect = ref('')

</script>

<style lang="less" scoped>
.page-header-container {
  // width: 100%;
  .header-main {
    width: 1863px;
    height: 89px;
    background-image: url('@/assets/image/greenRoadPlanning/1.png');
    position: relative;
    display: flex;
    justify-content: space-around;
    &-center{
    
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 13px;
      .title{
        font-size: 25px;
        color: #FFFFFF;
        font-weight: bold;
      }
    }
    &-right{
        width: 240px;
        // background-color: green;
        
        .date{
            margin-top: 42px;
            height: 26px;
            display: flex;
            align-items: flex-end;
            gap: 12px;
            // background-color: red;
            .icon{
                width: 23px;
                height: 20px;
            }
            .content{
                color: #33D4E9;
                letter-spacing: 1px;
                font-weight: 500;
            }
        }
    }
  }
}
</style>
