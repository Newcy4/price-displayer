/*
 * @Date: 2025-10-09 17:31:07
 * @LastEditors: Newcy4 newcy44@gmail.com
 * @LastEditTime: 2025-10-09 18:16:06
 * @FilePath: /price-displayer/nw-build/osx.js
 * @Description: nw 打包配置文件 macOS 版本
 */
import nwbuild from 'nw-builder';

await nwbuild({
  mode: 'build',
  flavor: 'sdk',
  platform: 'osx',
  srcDir: './dist',
  cacheDir: './node_modules/nw/cache',
  outDir: './nw-out/osx/price-displayer',
  glob: false,
  logLevel: 'debug',
  app: {
    name: '杭越菜品显示',
    /* File path of icon from where it is copied. */
    icon: './dist/icon.ico',
    LSApplicationCategoryType: 'public.app-category.utilities',
    CFBundleIdentifier: 'io.nwutils.demo',
    CFBundleName: 'Demo',
    CFBundleDisplayName: 'Demo',
    CFBundleSpokenName: 'Demo',
    CFBundleVersion: '0.0.0',
    CFBundleShortVersionString: '0.0.0',
    NSHumanReadableCopyright: 'Copyright (c) 2024 NW.js Utilities',
    NSLocalNetworkUsageDescription: 'Demo requires access to network to showcase its capabilities',
  }
});

console.log('\n✅ macOS 打包完成，输出路径：./nw-out/osx/price-displayer\n');