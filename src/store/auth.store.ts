import { atomWithStorage } from 'jotai/utils'

const tokenAtom = atomWithStorage<string | undefined>('token', 'aaa')
const accountInfoAtom = atomWithStorage<JotaiType.Auth | undefined>('info', undefined)
const permAtom = atomWithStorage<string[]>('perm', [
  'home',
  'system',
  'system:account',
  'system:perm',
  'system:log'
])

const authJotai = {
  tokenAtom,
  accountInfoAtom,
  permAtom
}

export { authJotai }
