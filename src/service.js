/**
 * Created by weijiahui on 2018/10/21.
 * service层：用于调用接口
 */

/**
 * 出厂设置保存记录
 * @param cb
 */
export const saveDebugInfo = function (cb) {
  console.log('--deviceToEdit in service--', this.deviceToEdit)
  if (typeof cb === 'function') cb()
}
