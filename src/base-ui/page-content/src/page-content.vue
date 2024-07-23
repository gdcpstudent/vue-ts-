<template>
  <div class="page-content">
    <lj-table
      :listData="userlist"
      v-bind="contentTableConfig"
      :listCount="userCount"
      v-model:page="pageInfo"
    >
      <!-- v-model:+名字给的是page绑定的属性 -->
      <!-- 1.header的插槽 -->
      <template #headerHandle>
        <el-button type="primary" @click="handleNewClick">新建用户</el-button>
      </template>
      <!-- 2.列表插槽 -->
      <template #status="scope">
        <el-button plain :type="scope.row.enable ? 'primary' : 'danger'">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="btn-handler">
          <el-button
            size="small"
            link
            class="left-btn"
            style="color: dodgerblue"
            @click="handleEditClick(scope.row)"
            ><el-icon><EditPen /></el-icon>编辑</el-button
          >
          <el-button
            size="small"
            link
            class="right-btn"
            style="color: dodgerblue"
            @click="handleDelteClick(scope.row)"
            ><el-icon><DeleteFilled /></el-icon>删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName"
          ><slot :name="item.slotName" :row="scope.row"></slot
        ></template>
      </template>
    </lj-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, watch } from 'vue'
import LjTable from '@/base-ui/table'
import { EditPen, DeleteFilled } from '@element-plus/icons-vue'
import { userStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  props: {
    pageName: {
      type: String,
      required: true
    },
    contentTableConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    LjTable,
    EditPen,
    DeleteFilled
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const filters = instance?.appContext.config.globalProperties.$filters

    const store = userStore()
    //0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isQuery = usePermission(props.pageName, 'query')
    const isDelete = usePermission(props.pageName, 'delete')

    //1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })

    //2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo //将查询条件加入到queryInfo中
        }
      })
    }
    // 3.从vuex中获取数据
    getPageData()
    const userlist = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const userCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4. 获取其他动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5、删除/新建/编辑操作
    const handleDelteClick = (item: any) => {
        // console.log(item)
        store.dispatch('system/deletePageDataAction', {
          pageName: props.pageName,
          id: item.id
        })
      },
      handleNewClick = () => {
        emit('newBtnClick')
        console.log('newBtnClick')
      },
      handleEditClick = (item: any) => {
        emit('editBtnClick', item)
        console.log('editBtnClick')
      }
    return {
      filters,
      userlist,
      getPageData,
      userCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDelteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped>
.user-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  border-radius: 5px;
}
.btn-handler {
  display: flex;
  justify-content: space-around;
}
.demo-pagination-block {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
