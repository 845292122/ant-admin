import { AddOne } from '@icon-park/react'
import { Button, Form, message, Popconfirm, Space, Table, TableProps, Tag } from 'antd'
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

const Account: React.FC = () => {
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
      title: '公司',
      dataIndex: 'company',
      key: 'company',
      width: 100
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 150
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
      width: 120,
      render: text => {
        const bizTypeMap = {
          0: '其他',
          1: '餐饮',
          2: '口腔医院'
        }
        const bizType = bizTypeMap[text as keyof typeof bizTypeMap] || '-'
        return bizType
      }
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
      render: text => (
        <Tag color={text === 1 ? '#87d068' : '#108ee9'}>{text === 1 ? '是' : '否'}</Tag>
      )
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
      render: (_, record) => (
        <Space size="small">
          <Button color="blue" variant="link" onClick={() => record.id && modifyData(record.id)}>
            编辑
          </Button>
          <Popconfirm
            title="删除数据!!!"
            description="确认删除当前数据？"
            onConfirm={() => record.id && removeData(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button color="red" variant="link">
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  // * 编辑表单项
  const infoFields: InfoModalFieldType[] = [
    {
      name: 'id',
      label: 'ID',
      type: 'text',
      span: 0
    },
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
          label: '其他',
          value: '0'
        },
        {
          label: '餐饮',
          value: '1'
        },
        {
          label: '口腔医院',
          value: '2'
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

  const [form] = Form.useForm()
  const [infoVisible, setInfoVisible] = React.useState<boolean>(false)
  const [initialValues, setInitialValues] = React.useState<Record<string, unknown> | undefined>()

  const handleSubmitInfo = async (values: GenerateFormValues<typeof infoFields>) => {
    let msg = '添加成功'
    if (values.id) {
      msg = '修改成功'
      await accountApi.modify(values)
    } else {
      await accountApi.create(values)
    }
    message.success(msg)
    setInfoVisible(false)
    refresh()
  }

  const createData = async () => {
    setInitialValues(undefined)
    setInfoVisible(true)
  }

  const modifyData = async (id: number) => {
    const res = await accountApi.info(id)
    const formattedData = {
      ...res,
      bizType: res.bizType?.toString(),
      status: res.status?.toString(),
      trialStartDate: res.trialStartDate ? dayjs(res.trialStartDate) : undefined,
      trialEndDate: res.trialEndDate ? dayjs(res.trialEndDate) : undefined,
      startDate: res.startDate ? dayjs(res.startDate) : undefined,
      endDate: res.endDate ? dayjs(res.endDate) : undefined
    }
    setInitialValues(formattedData)
    setInfoVisible(true)
  }

  const removeData = async (id: number) => {
    await accountApi.remove(id)
    message.success('删除成功')
    refresh()
  }

  const getTableData = async (
    { current, pageSize }: UtilType.AhookRequestParam,
    formData: object
  ): Promise<{
    total: number
    list: ApiType.Account[]
  }> => {
    const res = await accountApi.page({
      pageNo: current,
      pageSize,
      ...formData
    })
    return {
      total: res.total,
      list: res.records.map((record, index) => ({ ...record, key: index }))
    }
  }

  const { tableProps, refresh, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form
  })

  return (
    <React.Fragment>
      <QueryForm
        fields={queryFormFields}
        onSearch={search.submit}
        form={form}
        onReset={search.reset}
      />
      <Space style={{ marginBottom: 5 }}>
        <Button
          type="primary"
          icon={<AddOne theme="outline" size="16" fill="#fff" />}
          onClick={createData}
        >
          新增
        </Button>
      </Space>
      <Table columns={tableColumns} {...tableProps} scroll={{ x: 2000 }} />

      {/* TODO 添加编辑删除功能 */}
      <InfoModal<typeof infoFields>
        fields={infoFields}
        visible={infoVisible}
        onSubmit={handleSubmitInfo}
        initialValues={initialValues}
        onClose={() => setInfoVisible(false)}
        title="账户信息"
      />
    </React.Fragment>
  )
}

export default Account
