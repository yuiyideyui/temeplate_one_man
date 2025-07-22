<template>
  <div class="page-header-container">
    <div class="header-main">
      <div class="header-main-left">
        <p class="full" v-if="fullScreen" @click="fullScreen_fn">
          <img
            class="full-button"
            src="@/assets/image/greenRoadPlanning/2.png"
          />
          <span class="content">全屏</span>
        </p>
      </div>
      <div class="header-main-center">
        <p class="title">{{ title }}</p>
      </div>
      <div class="header-main-right">
        <p class="date">
          <img
            class="icon"
            src="@/assets/image/greenRoadPlanning/5.png"
            alt=""
          /><span class="content"> {{ dayTime }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
const props = defineProps({
  /**
   * 标题
   */
  title: {
    type: String,
    require: true,
  },
  /**
   * 是否有全屏按钮
   */
  fullScreen: {
    type: Boolean,
    default: false,
  },
  dayTime: {
    type: String,
    default: dayjs().format('YYYY-MM-DD'),
  },
})

const emits = defineEmits(['fullScreen_fn'])
const fullScreen_fn = () => {
  emits('fullScreen_fn')
}

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

    &-center {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 13px;
      .title {
        font-size: 25px;
        color: #ffffff;
        font-weight: bold;
      }
    }
    &-right {
      width: 240px;

      position: absolute;
      left: 66%;
      top: 40px;
      .date {
        height: 26px;
        display: flex;
        align-items: flex-end;
        gap: 12px;

        .icon {
          width: 23px;
          height: 20px;
        }
        .content {
          color: #33d4e9;
          letter-spacing: 1px;
          font-weight: 500;
        }
      }
    }
    &-left {
      width: 100px;
      height: 40px;

      position: absolute;
      left: 20px;
      bottom: 22px;
      .full {
        display: flex;
        gap: 5px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .full-button {
          width: 35.83px;
          height: 35.83px;
        }
        .content {
          color: #1ef1ff;
          font-size: 20px;
          text-decoration: underline;
          font-family: 'webfont-medium';
        }
      }
    }
  }
}
</style>
