import { DatePicker, Form, Input, message, Modal, Radio, Select } from 'antd'
import { Rule } from 'antd/es/form'

export type InfoModalFieldType = {
  name: string
  label: string
  type: 'text' | 'select' | 'radio' | 'date'
  options?: Array<{ label: string; value: string | number }>
  rules?: Array<Rule>
}

type InfoModalProps = {
  visible: boolean
  onClose: () => void
  onSubmit: (values: unknown) => void
  initialValues?: Record<string, unknown>
  fields: InfoModalFieldType[]
  data?: Record<string, unknown>
  title?: string
}

// TODO: form表单格式改为两列
const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  initialValues,
  fields,
  onSubmit,
  title,
  onClose
}) => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values)
      })
      .catch(err => messageApi.error(err))
  }

  return (
    <>
      {contextHolder}
      <Modal
        title={title}
        open={visible}
        width={600}
        destroyOnClose
        onOk={handleOk}
        onCancel={onClose}
        maskClosable={false}
      >
        <Form form={form} layout="vertical" initialValues={initialValues} clearOnDestroy>
          {fields.map(field => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={field.rules || []}
            >
              {field.type === 'text' && <Input placeholder={`请输入${field.label}`} />}
              {field.type === 'select' && (
                <Select placeholder={`请选择${field.label}`} allowClear>
                  {field.options?.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
              {field.type === 'radio' && (
                <Radio.Group>
                  {field.options?.map(option => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
              )}
              {field.type === 'date' && <DatePicker style={{ width: '100%' }} />}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  )
}

export default InfoModal
