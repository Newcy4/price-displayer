/*
 * @Date: 2025-10-10 18:53:05
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-10 19:12:48
 * @FilePath: /price-displayer/src/utils/nwUtils.js
 */
// 安全检测NW环境
export const isNW = () => {
  return typeof window !== 'undefined' && 
         window.nw && 
         window.nw.Window;
};

// 安全获取NW窗口实例
export const getNWWindow = () => {
  return isNW() ? nw.Window.get() : null;
};

// 全屏切换函数
export const toggleFullscreen = () => {
  const win = getNWWindow();
  if (!win) return false; // 非NW环境
  
  try {
    if (win.isFullscreen) {
      win.leaveFullscreen();
    } else {
      win.enterFullscreen();
    }
    return true;
  } catch (error) {
    console.error('全屏切换失败:', error);
    return false;
  }
};