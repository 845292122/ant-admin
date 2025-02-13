import { AddOne } from '@icon-park/react'
import { useAntdTable } from 'ahooks'
import { Button, Form, message, Popconfirm, Space, Table, TableProps, Tag } from 'antd'
import React, { useState } from 'react'
import { userApi } from '~/api'
import InfoModal, { GenerateFormValues, InfoModalFieldType } from '~/components/InfoModal'
import QueryForm, { QueryFormField } from '~/components/QueryForm'

const queryFormFields: QueryFormField[] = [
  {
    name: 'username',
    label: '用户名',
    type: 'input'
  },
  {
    name: 'contact',
    label: '联系人',
    type: 'input'
  },
  {
    name: 'status',
    label: '状态',
    type: 'select',
    options: [
      {
        label: '停用',
        value: '0'
      },
      {
        label: '启用',
        value: '1'
      }
    ]
  }
]

const User: React.FC = () => {
  // * 数据表格项
  const tableColumns: TableProps<ApiType.User.Info>['columns'] = [
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
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 100
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
      width: 100
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      width: 100
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 100
    },
    {
      title: '管理员',
      dataIndex: 'isTenantAdmin',
      key: 'isTenantAdmin',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: text => (text === '1' ? <Tag color="green">启用</Tag> : <Tag color="red">停用</Tag>)
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100
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
      type: 'input',
      span: 0
    },
    // TODO 如果是平台管理员,添加时可以选择属于哪个租户下
    {
      name: 'tenantId',
      label: '租户',
      type: 'select',
      options: [],
      span: 24
    },
    {
      name: 'username',
      label: '用户名',
      type: 'input',
      rules: [{ required: true, message: '用户名不能为空' }]
    },
    {
      name: 'password',
      label: '密码',
      type: 'input',
      rules: [{ required: true, message: '密码不能为空' }]
    },
    {
      name: 'contact',
      label: '联系人',
      type: 'input',
      rules: [{ required: true, message: '联系人不能为空' }]
    },
    {
      name: 'position',
      label: '职位',
      type: 'input'
    },
    {
      name: 'phone',
      label: '手机号',
      type: 'input',
      rules: [{ required: true, message: '手机号不能为空' }]
    },
    {
      name: 'status',
      label: '状态',
      type: 'select',
      options: [
        {
          label: '启用',
          value: '1'
        },
        {
          label: '停用',
          value: '0'
        }
      ]
    },
    {
      name: 'remark',
      label: '备注',
      type: 'input'
    }
  ]

  // TODO: 树形格式化转换
  const getTableData = async (
    { current, pageSize }: UtilType.AhookRequestParam,
    formData: Object
  ): Promise<{
    total: number
    list: ApiType.User.Info[]
  }> => {
    const { total, records } = await userApi.page({
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
      await userApi.modify(values)
    } else {
      await userApi.create(values)
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
    const res = await userApi.info(id)
    const formattedData = {
      ...res,
      status: res.status?.toString()
    }
    setInitialValues(formattedData)
    setInfoVisible(true)
  }

  const removeData = async (id: number) => {
    await userApi.remove(id)
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
        title="用户信息"
      />
    </React.Fragment>
  )
}

export default User
