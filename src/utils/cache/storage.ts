import { cacheCipher, DEFAULT_CACHE_TIME } from '@/settings/modules/encryptionSetting';
import { AesEncryption } from '@/utils/cipher';
import { isNullOrUnDef } from '@/utils/is';

const encryption = new AesEncryption(cacheCipher);

/**
 * Storage class
 * Construction parameters can be passed into sessionStorage, localStorage,
 * @class WebStorage
 */
export class WebStorage {
  private storage: Storage;
  private prefixKey?: string;
  private encryption: AesEncryption;
  private hasEncrypt: boolean;

  constructor({ storage = sessionStorage, prefixKey = '', hasEncrypt = true }) {
    this.storage = storage;
    this.prefixKey = prefixKey;
    this.encryption = encryption;
    this.hasEncrypt = hasEncrypt;
  }

  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  /**
   * Set Storage
   * @param {string} key
   * @param {*} value
   * @expire Expiration time in seconds
   * @memberof Cache
   */
  set(key: string, value: any, expire: Nullable<number> = DEFAULT_CACHE_TIME) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
    });
    const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
    this.storage.setItem(this.getKey(key), stringifyValue);
  }

  /**
   * Read Storage
   * @param {string} key
   * @memberof Storage
   */
  get(key: string, def: any = null): any {
    const val = this.storage.getItem(this.getKey(key));
    if (!val) return def;

    try {
      const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
      const data = JSON.parse(decVal);
      const { value, expire } = data;
      if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
        return value;
      }
      this.remove(key);
    } catch (e) {
      return def;
    }
    return def;
  }

  /**
   * Delete Storage based on key
   * @param {string} key
   * @memberof Storage
   */
  remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  /**
   * Delete all Storages of this instance
   */
  clear(): void {
    this.storage.clear();
  }
}
