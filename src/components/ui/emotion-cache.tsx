"use client"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { useServerInsertedHTML } from "next/navigation"
import * as React from "react"

type InsertedStyle = {
  name: string
  isGlobal: boolean
}

export function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: "chakra" })
    cache.compat = true

    const prevInsert = cache.insert
    let inserted: InsertedStyle[] = []

    cache.insert = (...args: Parameters<typeof prevInsert>) => {
      const [selector, serialized] = args
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, isGlobal: !selector })
      }
      return prevInsert(...args)
    }

    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const inserted = flush()
    if (inserted.length === 0) {
      return null
    }

    let styles = ""
    let dataEmotionAttribute = cache.key
    const globalStyles: Array<{ name: string; style: string }> = []

    for (const { name, isGlobal } of inserted) {
      const style = cache.inserted[name]
      if (typeof style !== "string") {
        continue
      }
      if (isGlobal) {
        globalStyles.push({ name, style })
      } else {
        styles += style
        dataEmotionAttribute += ` ${name}`
      }
    }

    return (
      <>
        {globalStyles.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles ? (
          <style
            data-emotion={dataEmotionAttribute}
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        ) : null}
      </>
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
