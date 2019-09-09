const {cache} = require('../config/defaultConfig')

function refreshRes(stats, res) {
  const {maxAge, expires, cacheControl, lastModified, etag} = cache;

  // 如果支持过期时间
  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString());
  }

  // 如果支持cache-control
  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
  }

  // 如果支持最后更新
  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString())
  }

  // 如果支持etag
  if (etag) {
    res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`);
  }
}

module.exports = function isFresh(stats, req, res) {
  refreshRes(stats, res);

  const lastModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];

  // 如果不存在 last-modified 或者 etag, 不能使用缓存
  if (!lastModified && !etag ) {
    return false;
  }

  // 如果last-modified 与 响应中设置不同，证明已过期，不能使用缓存
  if (lastModified && lastModified !== res.getHeader('Last_Modified')) {
    return false;
  }

  // 如果etag 与 响应中的etag不匹配，证明已经更新，不能使用缓存
  if (etag && etag !== res.getHeader('ETag')) {
    return false;
  }

  // 使用缓存
  return true;
};
