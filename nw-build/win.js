/*
 * @Date: 2025-10-09 16:58:47
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-09 17:06:12
 * @FilePath: /price-displayer/nw-build/win.js
 * @Description: nw 打包配置文件
 */
// 
import nwbuild from 'nw-builder';

await nwbuild({
  mode: 'build',
  flavor: 'sdk',
  platform: 'win',
  arch: 'x64',
  srcDir: './dist',
  // cacheDir: './node_modules/nw',
  outDir: './nw-out/win/price-displayer',
  glob: false,
  logLevel: 'debug',
  app: {
    name: 'Price Displayer',
    /* File path of icon from where it is copied. */
    icon: './dist/favicon.ico',
    version: '0.0.0',
    comments: 'Diagnostic information',
    company: 'NW.js Utilities',
    fileDescription: 'This is a demo app to test nw-builder functionality',
    fileVersion: '0.0.0',
    internalName: 'Demo',
    legalCopyright: 'Copyright (c) 2024 NW.js Utilities',
    originalFilename: 'Demo',
    productName: 'Demo',
    productVersion: '0.0.0',
  }
});

console.log('\n✅ Windows 打包完成，输出路径：./nw-out/win/price-displayer\n');