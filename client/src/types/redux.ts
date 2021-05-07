
export interface AuthState {
  accessToken: string | null
}

export interface RootState {
  authState: AuthState
}
