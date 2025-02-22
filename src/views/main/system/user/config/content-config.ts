export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100', slotName: 'username' },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: '100',
      slotName: 'realname'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      minWidth: '120',
      slotName: 'phone'
    },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
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
  showIndexColumn: true,
  showSelectionColumn: true, // 是否显示复选框列
  title: '用户列表', // 表格标题
  btnAdd: '新增用户',
  btnRefresh: '刷新列表'
}
