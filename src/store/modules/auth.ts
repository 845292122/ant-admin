import { atomWithStorage } from 'jotai/utils'
import { AUTH } from '~/types/auth'

const tokenAtom = atomWithStorage<string | undefined>('token', 'undefined')
const accountInfoAtom = atomWithStorage<AUTH.AuthState | undefined>('info', undefined)
const permAtom = atomWithStorage<string[]>('perm', ['home', 'system', 'system:account', 'system:perm', 'system:log'])

const authJotai = {
  tokenAtom,
  accountInfoAtom,
  permAtom
}

export { authJotai }
