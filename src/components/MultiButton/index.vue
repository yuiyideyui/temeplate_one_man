<template>
  <div class="multiButton-box" :style="{ width: width, height: height }">
    <div
      class="multiButton-container"
      style="width: 100%"
      @mouseenter="showBubble"
      @mouseleave="hideBubble"
    >
      <!-- 图片与标题 -->
      <div class="com-Main">
        <img
          class="image"
          :class="{ grayscale: isGrayscale }"
          :src="comImage"
          alt="comImage"
          @click="toggleGrayscale"
        />
        <p class="title">{{ comTitle }}</p>

        <!-- 气泡 -->

        <div
          class="custom-popover"
          :style="{ maxHeight: showPopover ? height : '100%' }"
          :class="{ show: showPopover }"
        >
          <div
            v-for="(item, index) in layerList"
            :key="index"
            class="layer-item"
          >
            <!-- 父级 -->
            <div class="parent-item">
              <input
                class="checkbox"
                type="checkbox"
                v-model="item.checked"
                @change="handleParentCheckChange(item.id)"
              />
              <span
                class="child-show"
                v-show="item.children"
                @click="toggleChildrenVisibility(item)"
                >{{ item.isChildVisible ? '-' : '+' }}</span
              >
              <span class="layer-name">{{ item.layerName }}</span>
            </div>
            <!-- 子级 -->
            <transition name="fade-slide">
              <div
                v-if="
                  item.isChildVisible &&
                  item.children &&
                  item.children.length > 0
                "
                class="children-list"
              >
                <div
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                  class="child-item"
                >
                  <input
                    class="checkbox"
                    type="checkbox"
                    v-model="child.checked"
                    @change="handleChildCheckChange(item, child)"
                  />
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
import { ref, type PropType, defineEmits } from 'vue'

// 接收 props
defineProps({
  comImage: { type: String, default: '' },
  comTitle: { type: String, default: '暂无标题' },
  width: { type: String, default: '500px' },
  height: { type: String, default: '500px' },
  layerList: { type: Array as PropType<PopoverList[]>, default: () => [] },
})
interface PopoverList {
  id: string
  layerName: string
  checked?: boolean
  children?: Array<any>
  isShow: boolean
  type: number
  img: string
  imgType: number
  isChildVisible?: boolean
}
// 状态管理
const isGrayscale = ref(true) // 图片是否黑白
const showPopover = ref(false) // 气泡显示状态
let hideTimer: number | null = null // 定时器 ID

// 切换图片黑白
const toggleGrayscale = () => {
  isGrayscale.value = !isGrayscale.value
}

// 显示气泡（仅在彩色状态）
const showBubble = () => {
  if (!isGrayscale.value) {
    if (hideTimer) {
      clearTimeout(hideTimer) // 清除隐藏定时器
      hideTimer = null
    }
    showPopover.value = true
  }
}

// 隐藏气泡
const hideBubble = () => {
  hideTimer = setTimeout(() => {
    showPopover.value = false
  }, 200) // 延迟隐藏，避免鼠标快速移动导致闪烁
}

const emit = defineEmits()
const handleParentCheckChange = (item: any) => {
  emit('parentChecked', item)
}
const handleChildCheckChange = (item: any, child: any) => {
  emit('childChecked', { item, child })
}

const toggleChildrenVisibility = (item: PopoverList) => {
  item.isChildVisible = !item.isChildVisible // 切换子级的可见性
}
</script>

<style scoped lang="less">
.multiButton-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.multiButton-container {
  width: 100%;

  .com-Main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .image {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      cursor: pointer;
      transition: filter 0.3s ease;

      &.grayscale {
        filter: grayscale(100%);
      }
    }

    .title {
      text-align: center;
    }

    .custom-popover {
      position: absolute;
      bottom: 100%;
      /* 气泡在图片上方 */
      left: 50%;
      transform: translateX(-50%);
      background: white;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
      opacity: 0;
      max-height: 0;
      overflow: hidden;
      transition: all 0.5s ease;
      width: 100%;
      font-size: 0.2em;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      align-items: flex-start;
      &.show {
        opacity: 1;
        max-height: 200px;
      }

      .layer-item {
        display: flex;
        flex-direction: column;
        /* 子项在父项下方 */
        margin-bottom: 10px;

        .parent-item {
          display: flex;
          align-items: center;
          /* 垂直居中 */
          margin-bottom: 5px;
          position: relative;
          .child-show {
            cursor: pointer;

            position: absolute;
            left: 20px;

            top: 50%;
            transform: translateY(-50%);

            font-weight: bold;
            color: #007bff;
          }

          .checkbox {
            flex-shrink: 0;
            width: 20px;
            margin-right: 10px;
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

          .child-item {
            display: flex;
            align-items: center;
            margin-bottom: 5px;

            .checkbox {
              flex-shrink: 0;
              width: 20px;
              margin-right: 10px;
            }

            span {
              flex-grow: 1;
            }
          }
        }
      }
    }
  }
}

/* 定义子项显示/隐藏的动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.4s ease-in-out;
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
  transition-delay: 0.1s; /* 添加隐藏的延迟 */
}
</style>
