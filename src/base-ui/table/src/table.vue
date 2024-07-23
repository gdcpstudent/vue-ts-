<template>
  <div class="user-table">
    <div class="header">
      <slot name="header">{{ title }}</slot>
      <div class="handler">
        <slot name="headerHandle"></slot>
      </div>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProp"
    >
      <el-table-column
        v-if="showSelectionColumn"
        type="selection"
        align="center"
        min-width="60"
      ></el-table-column>
      <!-- @selectionChange="handleSelectionChange" 可以监听用户选择了哪一行数据，并且可以进行返回 -->

      <el-table-column
        v-if="showIndexColumn"
        align="center"
        min-width="60"
        type="index"
        label="序号"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <div class="demo-pagination-block">
        <slot name="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
          >
          </el-pagination>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
interface TableColumn {
  prop: string
  label: string
  width?: string
  slotName?: string
}
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    btnAdd: {
      type: String,
      default: '新增'
    },
    btnRefresh: {
      type: String,
      default: '刷新'
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectionColumn: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<TableColumn[]>,
      required: true
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProp: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value) //将数据发送出去，以便父组件进行操作
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}
.el-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
