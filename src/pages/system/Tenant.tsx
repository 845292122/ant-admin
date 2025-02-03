import { AddOne } from '@icon-park/react'
import { useAntdTable } from 'ahooks'
import { Button, Form, message, Popconfirm, Space, Table, TableProps, Tag } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { tenantApi } from '~/api/tenant.api'
import InfoModal, { GenerateFormValues, InfoModalFieldType } from '~/components/InfoModal'
import QueryForm, { QueryFormField } from '~/components/QueryForm'

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

const Tenant: React.FC = () => {
  // * 数据表格项
  const tableColumns: TableProps<ApiType.Tenant.Info>['columns'] = [
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
      title: '租户类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: text => {
        const typeMap = {
          0: '普通',
          1: 'VIP'
        }
        const type = typeMap[text as keyof typeof typeMap] || '-'
        return type
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100
    },
    {
      title: '平台管理员',
      dataIndex: 'isPlatformAdmin',
      key: 'isPlatformAdmin',
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
      name: 'type',
      label: '租户类型',
      type: 'select',
      options: [
        {
          label: '普通租户',
          value: '0'
        },
        {
          label: 'VIP租户',
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

  const getTableData = async (
    { current, pageSize }: UtilType.AhookRequestParam,
    formData: object
  ): Promise<{
    total: number
    list: ApiType.Tenant.Info[]
  }> => {
    const { total, records } = await tenantApi.page({
      pageNo: current,
      pageSize,
      ...formData
    })
    return {
      total,
      list: records
    }
  }

  const [form] = Form.useForm()
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<Record<string, unknown> | undefined>()
  const { tableProps, refresh, search } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form
  })

  const handleSubmitInfo = async (values: GenerateFormValues<typeof infoFields>) => {
    let msg = '添加成功'
    if (values.id) {
      msg = '修改成功'
      await tenantApi.modify(values)
    } else {
      await tenantApi.create(values)
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
    const res = await tenantApi.info(id)
    const formattedData = {
      ...res,
      type: res.type?.toString(),
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
    await tenantApi.remove(id)
    message.success('删除成功')
    refresh()
  }

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
      <Table columns={tableColumns} {...tableProps} scroll={{ x: 2000 }} rowKey="id" />

      <InfoModal<typeof infoFields>
        fields={infoFields}
        visible={infoVisible}
        onSubmit={handleSubmitInfo}
        initialValues={initialValues}
        onClose={() => setInfoVisible(false)}
        title="租户信息"
      />
    </React.Fragment>
  )
}

export default Tenant
