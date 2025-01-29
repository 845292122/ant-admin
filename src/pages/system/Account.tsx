import { AddOne } from '@icon-park/react'
import { Button, Space, Table, TableProps } from 'antd'
import React from 'react'
import InfoModal, { InfoModalFieldType } from '~/components/InfoModal'
import QueryForm, { QueryFormField } from '~/components/QueryForm'
import { ACCOUNT } from '~/types/account'

const testData: ACCOUNT.AccountInfo[] = []

const queryFormFields: QueryFormField[] = [
  {
    name: 'contact',
    label: '联系人',
    type: 'input'
  },
  {
    name: 'company',
    label: '公司',
    type: 'input'
  },
  {
    name: 'status',
    label: '状态',
    type: 'select',
    options: [
      {
        label: '未使用',
        value: '0'
      },
      {
        label: '试用中',
        value: '1'
      },
      {
        label: '试用结束',
        value: '2'
      },
      {
        label: '已使用',
        value: '3'
      },
      {
        label: '已停用',
        value: '4'
      }
    ]
  }
]

const tableColumns: TableProps<ACCOUNT.AccountInfo>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>
  },
  {
    title: '联系人',
    dataIndex: 'contact',
    key: 'contact'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '统一信用代码',
    dataIndex: 'licenseNumber',
    key: 'licenseNumber'
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '业务类型',
    dataIndex: 'bizType',
    key: 'bizType'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
  },
  {
    title: '管理员',
    dataIndex: 'isAdmin',
    key: 'isAdmin'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '试用开始日期',
    dataIndex: 'trialStartDate',
    key: 'trialStartDate'
  },
  {
    title: '试用结束日期',
    dataIndex: 'trialEndDate',
    key: 'trialEndDate'
  },
  {
    title: '正式开始日期',
    dataIndex: 'startDate',
    key: 'startDate'
  },
  {
    title: '正式结束日期',
    dataIndex: 'endDate',
    key: 'endDate'
  }
]

// * 新增编辑表单项配置
const infoFields: InfoModalFieldType[] = [
  {
    name: 'contact',
    label: '联系人',
    type: 'text',
    rules: [{ required: true, message: '联系人不能为空' }]
  },
  {
    name: 'phone',
    label: '手机号',
    type: 'text',
    rules: [{ required: true, message: '手机号不能为空' }]
  },
  {
    name: 'company',
    label: '公司',
    type: 'text',
    rules: [{ required: true, message: '公司不能为空' }]
  },
  {
    name: 'licenseNumber',
    label: '统一信用代码',
    type: 'text'
  },
  {
    name: 'address',
    label: '地址',
    type: 'text'
  },
  {
    name: 'bizType',
    label: '业务类型',
    type: 'select',
    options: [
      {
        label: '餐饮',
        value: '0'
      },
      {
        label: '口腔医院',
        value: '1'
      }
    ]
  },
  {
    name: 'remark',
    label: '备注',
    type: 'text'
  },
  {
    name: 'status',
    label: '状态',
    type: 'select',
    options: [
      {
        label: '未使用',
        value: '0'
      },
      {
        label: '试用中',
        value: '1'
      },
      {
        label: '试用结束',
        value: '2'
      },
      {
        label: '已使用',
        value: '3'
      }
    ]
  },
  {
    name: 'trialStartDate',
    label: '试用开始日期',
    type: 'date'
  },
  {
    name: 'trialEndDate',
    label: '试用结束日期',
    type: 'date'
  },
  {
    name: 'startDate',
    label: '正式开始日期',
    type: 'date'
  },
  {
    name: 'endDate',
    label: '正式结束日期',
    type: 'date'
  }
]

const Account: React.FC = () => {
  const handleSearch = () => {}
  const [infoVisible, setInfoVisible] = React.useState<boolean>(false)
  const handleSubmitInfo = () => {}

  return (
    <React.Fragment>
      <QueryForm fields={queryFormFields} onSearch={handleSearch} />
      <Space style={{ marginBottom: 5 }}>
        <Button
          type="primary"
          icon={<AddOne theme="outline" size="16" fill="#fff" />}
          onClick={() => setInfoVisible(true)}
        >
          新增
        </Button>
      </Space>
      <Table columns={tableColumns} dataSource={testData} />

      {/* TODO 添加编辑删除功能 */}
      <InfoModal
        fields={infoFields}
        visible={infoVisible}
        onSubmit={handleSubmitInfo}
        onClose={() => setInfoVisible(false)}
        title="账户信息"
      />
    </React.Fragment>
  )
}

export default Account
