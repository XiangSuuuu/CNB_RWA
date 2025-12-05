<template>
  <view class="grid-container" :style="gridStyle">
    <view 
      class="grid-item-wrapper" 
      v-for="(item, index) in list" 
      :key="index"
      @click="handleItemClick(item, index)"
    >
      <slot :item="item" :index="index"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "MyGrid",
  props: {
    // 数据列表
    list: {
      type: Array,
      default: () => []
    },
    // 列数 (默认为3列)
    columns: {
      type: Number,
      default: 3
    },
    // 格子之间的间距 (支持 rpx 或 px)
    gap: {
      type: String,
      default: '20rpx'
    }
  },
  computed: {
    // 动态计算 Grid 布局样式
    gridStyle() {
      return {
        display: 'grid',
        // repeat(3, 1fr) 表示分成3等份
        gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
        gridGap: this.gap
      };
    }
  },
  methods: {
    // 点击事件，向上传递
    handleItemClick(item, index) {
      this.$emit('click', { item, index });
    }
  }
}
</script>

<style scoped>
.grid-container {
  width: 100%;
  box-sizing: border-box;
}

.grid-item-wrapper {
  /* 确保子元素占满格子 */
  width: 100%;
  box-sizing: border-box;
  
  /* --- 新增代码开始：让格子里的内容强制居中 --- */
  display: flex;
  flex-direction: column; /* 如果你的格子内容是上下排列的（如图标在上文字在下） */
  align-items: center;    /* 水平居中 */
  justify-content: center;/* 垂直居中 */
  /* --- 新增代码结束 --- */

  cursor: pointer;
}
</style>