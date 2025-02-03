import { AddOne } from '@icon-park/react'
import { useRequest } from 'ahooks'
import { Button, Form, message, Popconfirm, Space, Table, TableProps } from 'antd'
import React, { useState } from 'react'
import { permApi } from '~/api/perm.api'
import InfoModal, { GenerateFormValues, InfoModalFieldType } from '~/components/InfoModal'
import QueryForm, { QueryFormField } from '~/components/QueryForm'

const queryFormFields: QueryFormField[] = [
  {
    name: 'name',
    label: '权限名称',
    type: 'input'
  },
  {
    name: 'status',
    label: '状态',
    type: 'select',
    options: [
      {
        label: '启用',
        value: 1
      },
      {
        label: '停用',
        value: 0
      }
    ]
  }
]

const Perm: React.FC = () => {
  const tableColumns: TableProps<ApiType.Perm.Info>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: '权限标识',
      dataIndex: 'key',
      key: 'key'
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
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

  const infoFields: InfoModalFieldType[] = [
    {
      name: 'id',
      label: 'ID',
      type: 'text',
      span: 0
    },
    {
      name: 'key',
      label: '权限标识',
      type: 'text',
      rules: [{ required: true, message: '权限标识不能为空' }]
    },
    {
      name: 'name',
      label: '权限名称',
      type: 'text',
      rules: [{ required: true, message: '权限名称不能为空' }]
    },
    {
      name: 'status',
      label: '状态',
      type: 'select',
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '停用',
          value: 0
        }
      ]
    }
  ]

  const getTableData = async (formData: object): Promise<ApiType.Perm.Info[]> => {
    return await permApi.list(formData)
  }

  const [form] = Form.useForm()
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<Record<string, unknown> | undefined>()
  const { data, loading, error, refresh } = useRequest(() => getTableData(form.getFieldsValue()))

  const handleSubmitInfo = async (values: GenerateFormValues<typeof infoFields>) => {
    let msg = '添加成功'
    if (values.id) {
      msg = '修改成功'
      await permApi.modify(values)
    } else {
      await permApi.create(values)
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
    const res = await permApi.info(id)
    const formattedData = {
      ...res,
      status: res.status?.toString()
    }
    setInitialValues(formattedData)
    setInfoVisible(true)
  }

  const removeData = async (id: number) => {
    await permApi.remove(id)
    message.success('删除成功')
    refresh()
  }

  return (
    <React.Fragment>
      <QueryForm
        fields={queryFormFields}
        onSearch={() => getTableData(form.getFieldsValue())}
        form={form}
        onReset={() => {
          form.resetFields()
          getTableData(form.getFieldsValue())
        }}
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
      <Table
        columns={tableColumns}
        dataSource={Array.isArray(data) ? data : []}
        scroll={{ x: 2000 }}
        rowKey="id"
        loading={loading}
      />

      <InfoModal<typeof infoFields>
        fields={infoFields}
        visible={infoVisible}
        onSubmit={handleSubmitInfo}
        initialValues={initialValues}
        onClose={() => setInfoVisible(false)}
        title="权限信息"
      />
    </React.Fragment>
  )
}

export default Perm
