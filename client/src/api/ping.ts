import useCustomQuery from 'src/hooks/useCustomQuery'
import { IUser } from 'src/types/user.type'

export const fetchCurrentUserConfig = () => ({
  url: '/ping',
})

export const usePing = () => {
  return useCustomQuery<IUser>(fetchCurrentUserConfig())
}
