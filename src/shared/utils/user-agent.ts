

export function formatUserAgent(ua: string) {
  const browser =
    /Edg\//.test(ua) ? 'Edge' :
    /Chrome\//.test(ua) ? 'Chrome' :
    /Firefox\//.test(ua) ? 'Firefox' :
    /Safari\//.test(ua) ? 'Safari' : 'Unknown'

  const os =
    /Windows/.test(ua) ? 'Windows' :
    /Mac OS X/.test(ua) ? 'macOS' :
    /Android/.test(ua) ? 'Android' :
    /iPhone|iPad/.test(ua) ? 'iOS' :
    /Linux/.test(ua) ? 'Linux' : 'Unknown'

  const device =
    /iPhone/.test(ua) ? 'iPhone' :
    /iPad/.test(ua) ? 'iPad' :
    /Android.*Mobile/.test(ua) ? 'Android Phone' :
    /Android/.test(ua) ? 'Android Tablet' :
    /Windows Phone/.test(ua) ? 'Windows Phone' :
    'Desktop'
  return `${browser} en ${os} ${device}`
}