export const MATCH_HTML_TAGS = /<[^>]*>?/gm
export const MATCH_LINE_BREAK = /(\r\n|\n|\r)/gm
export const MATCH_MULTI_SPACE = /&nbsp;|\s\s+/gm // or &nbsp;

export function isValidHttpUrl(string: string) {
  let url: URL

  try {
    url = new URL(string)
  }
  catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
