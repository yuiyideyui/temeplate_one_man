<template>
  <div class="multiButton-box">
    <div class="multiButton-container" style="width: 100%;" @mouseenter="showBubble" @mouseleave="hideBubble">
      <!-- 图片与标题 -->
      <div class="com-Main">
        <img class="image" :src="isGrayscale ? defaultImage : selectImage" alt="comImage" @click="toggleGrayscale" />
        <p class="title">{{ comTitle }}</p>

        <!-- 气泡 -->

        <div class="custom-popover" :style="{ maxHeight: showPopover ? height : '100%' }"
          :class="{ show: showPopover }">

          <div v-for="(item, index) in layerList" :key="index" class="layer-item">
            <!-- 父级 -->
            <div class="parent-item">

              <input class="checkbox" type="checkbox" v-model="item.checked"
                @change="handleParentCheckChange(item.id)" />
              <!-- <span class="child-show" v-show="item.children" @click="toggleChildrenVisibility(item)">{{
                item.isChildVisible ? '-' : '+' }}</span> -->
              <span class="layer-name">{{ item.layerName }}</span>

            </div>
            <!-- 子级 -->
            <transition name="fade-slide">
              <div v-if="item.isChildVisible && item.children && item.children.length > 0" class="children-list">
                <div v-for="(child, childIndex) in item.children" :key="childIndex" class="child-item">
                  <input class="checkbox" type="checkbox" v-model="child.checked"
                    @change="handleChildCheckChange(item, child)" />
                  <span>{{ child.layerName }}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType, defineEmits } from "vue";

// 接收 props
defineProps({

  defaultImage: { type: String, default: "" },
  selectImage: { type: String, default: '' },
  comTitle: { type: String, default: "暂无标题" },
  width: { type: String, default: "500px" },
  height: { type: String, default: "500px" },
  layerList: { type: Array as PropType<PopoverList[]>, default: () => [] },

});
interface PopoverList {
  id: string;
  layerName: string;
  checked?: boolean;
  children?: Array<any>;
  isShow: boolean;
  type: number;
  img: string;
  imgType: number;
  isChildVisible?: boolean;
}
// 状态管理
const isGrayscale = ref(true); // 图片是否黑白
const showPopover = ref(false); // 气泡显示状态
let hoverTimer: number | null = null; // 定时器 ID
let hideTimer: number | null = null;

const toggleGrayscale = () => {
  isGrayscale.value = !isGrayscale.value;
};

// 显示气泡（仅在彩色状态）
const showBubble = () => {
  if (!isGrayscale.value) {
    if (hideTimer) {
      clearTimeout(hideTimer); // 清除隐藏定时器
      hideTimer = null;
    }
    if (hoverTimer) {
      clearTimeout(hoverTimer); // 清除悬停定时器，避免重复触发
    }
    hoverTimer = setTimeout(() => {
      showPopover.value = true;
    }, 350);  
  }
};

// 隐藏气泡
const hideBubble = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer); // 清除悬停定时器，防止鼠标快速离开后仍触发展示
    hoverTimer = null;
  }
  hideTimer = setTimeout(() => {
    showPopover.value = false;
  }, 200); // 延迟隐藏，避免闪烁
};

const emit = defineEmits();
const handleParentCheckChange = (item: any) => {
  emit('parentChecked', item);
};
const handleChildCheckChange = (item: any, child: any) => {
  emit('childChecked', { item, child });

}

const toggleChildrenVisibility = (item: PopoverList) => {
  item.isChildVisible = !item.isChildVisible; // 切换子级的可见性
};
</script>


<style scoped lang="less">
.multiButton-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.multiButton-container {
  width: 100%;

  .com-Main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
      transition: filter 0.3s ease;
      margin-bottom: 8px;
      z-index: 100;

      &.grayscale {
        filter: grayscale(100%);
      }
    }

    .title {
      text-align: center;
      font-size: 13px;
      color: #56E1FF;
      width: 42px;
      height: 18px;
    }

    .custom-popover {
      font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
      position: absolute;
      bottom: 100%;
      /* 气泡在图片上方 */
      left: 50%;
      transform: translateX(-50%);
      background: #000D2F;
      // padding: 10px;
      border: 1px solid #ddd;
      color: #FFFFFF;
      border-radius: 5px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
      opacity: 0;
      max-height: 0;
      overflow: hidden;
      transition: all 0.5s ease;
      width: 100%;
      font-size: 14px;
      font-weight: 200;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      align-items: flex-start;
      white-space: nowrap;
      /* 禁止换行 */
      overflow: visible;
      /* 显示所有内容 */
      display: block;
      /* 确保弹出框按内容撑开 */
      width: 106px;
      // padding: 10px;
      border: 0.5px solid #33D4E9;
      padding: 10px 12px 13px 12px;
      &.show {
        opacity: 1;
        max-height: 200px;
      }

      .checkbox {
        appearance: none;
        /* 隐藏默认复选框样式 */
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
        width: 11px;
        height: 11px;
        border: 1px solid #33D4E9;
        /* 边框颜色 */
        border-radius: 3px;
        background-color: #001622;
        /* 默认背景颜色 */
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
        /* 默认未选中的背景图片 */
        background-image: url('@/assets/image/greenRoadPlanning/14.png');


        &:checked {
          /* 选中状态的背景图片 */
          background-image: url('@/assets/image/greenRoadPlanning/15.png');
          border-color: #33D4E9;
          /* 选中边框颜色 */
          background-color: #33D4E9;
          /* 背景颜色 */
        }
      }

      .layer-item {
        display: flex;
        flex-direction: column;
        /* 子项在父项下方 */
        // margin-bottom: 8px;
        gap: 8px;
        .parent-item {
          display: flex;
          align-items: center;
          /* 垂直居中 */
          margin-bottom: 8px;
          position: relative;
          width: auto;
          /* 让宽度根据内容自适应 */
          min-width: 0;

          /* 防止子项内容压缩父级时过小 */
          .child-show {
            cursor: pointer;

            position: absolute;
            left: 10px;

            top: 50%;
            transform: translateY(-50%);


            color: #007bff;


          }

          .checkbox {
            flex-shrink: 0;
            // width: 20px;
            margin-right: 5px;
            color: #001622;
          }

          .layer-name {
            flex-grow: 1;
            // background-color: green;
          }
        }

        .children-list {
          display: flex;
          flex-direction: column;
          margin-left: 30px;
          /* 子级缩进 */
          width: auto;

          /* 自动扩展宽度 */
          .child-item {
            display: flex;
            align-items: center;
            margin-bottom: 5px;

            white-space: nowrap;
            /* 禁止换行 */
            overflow: visible;

            /* 显示完整内容 */
            .checkbox {
              flex-shrink: 0;
              // width: 20px;
              margin-right: 5px;
            }

            span {
              flex-grow: 1;
            }
          }
        }

        // input[type="checkbox"] {
        //   appearance: none;
        //   /* 隐藏默认复选框样式 */
        //   width: 11px;
        //   height: 11px;
        //   border: 1px solid #33D4E9;
        //   /* 边框颜色 */
        //   border-radius: 3px;
        //   background-color: #001622;
        //   /* 默认背景颜色 */
        //   cursor: pointer;
        //   position: relative;

        //   &:checked {
        //     background-color: #33D4E9;
        //     /* 选中背景色 */
        //     border-color: #33D4E9;
        //     /* 选中边框颜色 */

        //     &::after {
        //       content: '✔';
        //       /* 自定义选中符号 */
        //       color: #001622;
        //       /* 勾号颜色 */
        //       position: absolute;
        //       top: 50%;
        //       left: 50%;
        //       transform: translate(-50%, -50%);
        //       // font-size: 16px;
        //       // font-weight: bold;
        //     }
        //   }
        // }


      }
    }


  }
}


/* 定义子项显示/隐藏的动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.4s ease-in-out;
}

.fade-slide-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.fade-slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.fade-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.fade-slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
  transition-delay: 0.1s;
  /* 添加隐藏的延迟 */
}
</style>