import { IDocument } from '.'

export interface IUser extends IDocument {
  authProvider: 'google'
  providerId?: string
  providerData?: any
}
