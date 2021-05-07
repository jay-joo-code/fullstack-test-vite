import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useRouter from 'src/hooks/useRouter'
import { setAccessToken } from 'src/slices/auth'
import { RootState } from 'src/types/redux'

const AuthCallback = () => {
  const router = useRouter()
  const { token } = router.query
  const dispatch = useDispatch()
  const { accessToken } = useSelector((state: RootState) => state.authState)

  // set access token
  useEffect(() => {
    (async () => {
      if (token) {
        dispatch(setAccessToken(token))
      } else {
        router.push('/')
      }
    })()
  }, [router, token])

  useEffect(() => {
    (async () => {
      if (accessToken) {
        router.push('/')
      }
    })()
  }, [accessToken])

  return null
}

export default AuthCallback
