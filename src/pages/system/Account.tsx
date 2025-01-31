import { AddOne } from '@icon-park/react'
import { Button, Form, message, Space, Table, TableProps, Tag } from 'antd'
import React from 'react'
import { accountApi } from '~/api'
import InfoModal, { GenerateFormValues, InfoModalFieldType } from '~/components/InfoModal'
import QueryForm, { QueryFormField } from '~/components/QueryForm'
import { useAntdTable } from 'ahooks'
import dayjs from 'dayjs'

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

// * 数据表格项
const tableColumns: TableProps<ApiType.Account>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    fixed: 'left',
    align: 'center',
    render: text => <a>{text}</a>
  },
  {
    title: '联系人',
    dataIndex: 'contact',
    key: 'contact',
    width: 100
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    width: 150,
    align: 'right'
  },
  {
    title: '统一信用代码',
    dataIndex: 'licenseNumber',
    key: 'licenseNumber',
    width: 150,
    align: 'right'
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: 100
  },
  {
    title: '业务类型',
    dataIndex: 'bizType',
    key: 'bizType',
    width: 120
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 100
  },
  {
    title: '管理员',
    dataIndex: 'isAdmin',
    key: 'isAdmin',
    width: 80,
    align: 'center',
    render: text => <Tag color={text === 1 ? '#87d068' : '#108ee9'}>{text === 1 ? '是' : '否'}</Tag>
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    align: 'center',
    render: text => {
      const statusMap = {
        0: { color: 'default', label: '未使用' },
        1: { color: 'processing', label: '试用中' },
        2: { color: 'warning', label: '试用结束' },
        3: { color: 'success', label: '已使用' },
        4: { color: 'error', label: '已停用' }
      }
      const status = statusMap[text as keyof typeof statusMap] || {
        color: 'default',
        label: '未知'
      }
      return <Tag color={status.color}>{status.label}</Tag>
    }
  },
  {
    title: '试用开始日期',
    dataIndex: 'trialStartDate',
    key: 'trialStartDate',
    width: 150,
    align: 'right',
    render: text => (text ? dayjs(text).format('YYYY-MM-DD') : '-')
  },
  {
    title: '试用结束日期',
    dataIndex: 'trialEndDate',
    key: 'trialEndDate',
    width: 150,
    align: 'right',
    render: text => (text ? dayjs(text).format('YYYY-MM-DD') : '-')
  },
  {
    title: '正式开始日期',
    dataIndex: 'startDate',
    key: 'startDate',
    width: 150,
    align: 'right',
    render: text => (text ? dayjs(text).format('YYYY-MM-DD') : '-')
  },
  {
    title: '正式结束日期',
    dataIndex: 'endDate',
    key: 'endDate',
    width: 150,
    align: 'right',
    render: text => (text ? dayjs(text).format('YYYY-MM-DD') : '-')
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: 150,
    render: () => (
      <Space size="small">
        <Button color="blue" variant="link">
          编辑
        </Button>
        <Button color="red" variant="link">
          删除
        </Button>
      </Space>
    )
  }
]

// * 编辑表单项
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
    name: 'remark',
    label: '备注',
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
  const [form] = Form.useForm()
  const handleSearch = () => {}
  const [infoVisible, setInfoVisible] = React.useState<boolean>(false)
  const handleSubmitInfo = (values: GenerateFormValues<typeof infoFields>) => {
    accountApi.create(values).then(() => {
      message.success('添加成功')
      setInfoVisible(false)
    })
  }

  const getTableData = async ({
    current,
    pageSize
  }: UtilType.AhookRequestParam): Promise<{
    total: number
    list: ApiType.Account[]
  }> => {
    const res = await accountApi.page({
      pageNo: current,
      pageSize
    })
    return {
      total: res.total,
      list: res.records.map((record, index) => ({ ...record, key: index }))
    }
  }

  const { tableProps } = useAntdTable(getTableData)

  return (
    <React.Fragment>
      <QueryForm fields={queryFormFields} onSearch={handleSearch} form={form} />
      <Space style={{ marginBottom: 5 }}>
        <Button
          type="primary"
          icon={<AddOne theme="outline" size="16" fill="#fff" />}
          onClick={() => setInfoVisible(true)}
        >
          新增
        </Button>
      </Space>
      <Table columns={tableColumns} {...tableProps} scroll={{ x: 1900 }} />

      {/* TODO 添加编辑删除功能 */}
      <InfoModal<typeof infoFields>
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
