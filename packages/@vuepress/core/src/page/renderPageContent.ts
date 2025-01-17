import type {
  MarkdownEnv,
  MarkdownHeader,
  MarkdownLink,
} from '@vuepress/markdown'
import type { App, PageFrontmatter } from '../types'

/**
 * Render page content and extract related info
 */
export const renderPageContent = async ({
  app,
  content,
  frontmatter,
  filePath,
  filePathRelative,
}: {
  app: App
  content: string
  frontmatter: PageFrontmatter
  filePath: string | null
  filePathRelative: string | null
}): Promise<{
  contentRendered: string
  deps: string[]
  headers: MarkdownHeader[]
  links: MarkdownLink[]
  sfcBlocks: string[]
  title: string
}> => {
  const markdownEnv: MarkdownEnv = {
    base: app.options.base,
    filePath,
    filePathRelative,
    frontmatter,
  }

  const contentRendered = app.markdown.render(content, markdownEnv)

  /* istanbul ignore next */
  const {
    headers = [],
    importedFiles = [],
    links = [],
    sfcBlocks = [],
    title = '',
  } = markdownEnv

  return {
    contentRendered,
    deps: importedFiles,
    headers,
    links,
    sfcBlocks,
    title,
  }
}
