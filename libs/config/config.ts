import {injectable, unmanaged} from 'inversify'

import {FlatConfigKeys} from '@generated/config/flat-config-keys'

/**
 * Only use this class on backend services
 * It depends on environment variables only available
 * on the server!
 */
@injectable()
export class Config {
  constructor(@unmanaged() private config: Record<FlatConfigKeys | string, string> = {}) {}

  get(key: FlatConfigKeys, fallback?: string) {
    const value = this.config[key] || process.env[key] || fallback
    if (!value) throw `No config value for key ${key} found.`
    return value
  }

  override(key: FlatConfigKeys, value: string) {
    this.config[key] = value
  }
}
