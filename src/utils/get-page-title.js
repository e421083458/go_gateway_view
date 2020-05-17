import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Go微服务网关'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
