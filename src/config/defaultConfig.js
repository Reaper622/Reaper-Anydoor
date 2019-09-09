module.exports = {
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: 9527,
  // 判断文件类型做压缩
  compress: /\.(html|js|css|md)/,
  // 缓存配置
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}
