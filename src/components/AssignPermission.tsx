import { Modal, Tree } from 'antd'
import React from 'react'
import type { TreeDataNode } from 'antd'

type AssignPermissionProps = {
  open: boolean
  onCancel?: () => void
  onSubmit?: (values: any) => void
  dataSource: TreeDataNode[]
}

// TODO 半选状态传入后端，前端渲染时，需要去除半选节点
const AssignPermission: React.FC<AssignPermissionProps> = ({
  open,
  onCancel,
  onSubmit,
  dataSource
}) => {
  return (
    <Modal title="分配权限" open={open} destroyOnClose onCancel={onCancel}>
      <Tree treeData={dataSource} checkable defaultExpandAll blockNode showLine />
    </Modal>
  )
}

export default AssignPermission
