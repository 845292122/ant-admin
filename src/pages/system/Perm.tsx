import { QueryFormField } from '~/components/QueryForm'

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
  return (
    <div>
      <h1>Perm</h1>
    </div>
  )
}

export default Perm
