export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '150' },
    {
      prop: 'type',
      label: '类型',
      minWidth: '60'
    },
    {
      prop: 'url',
      label: '菜单url',
      minWidth: '100'
    },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '100'
    },
    {
      prop: '创建时间',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { prop: '', label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectionColumn: false, // 是否显示复选框列
  title: '菜单列表', // 表格标题
  childrenProp: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false // 是否显示表格底部
}
