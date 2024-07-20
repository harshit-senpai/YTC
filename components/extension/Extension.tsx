import useExtensionStore from "@/store/extensionStore"
import { getVideoData } from "@/utils/getVideoData"
import { CollapsibleContent } from "@radix-ui/react-collapsible"
import { useEffect } from "react"

import { Collapsible } from "../ui/collapsible"
import ExtensionAction from "./ExtensionAction"
import ExtensionPanel from "./ExtensionPanel"

export default function Extension() {
  const {
    setExtensionContainer,
    setExtensionData,
    setExtensionIsOpen,
    setExtensionLoading,
    setExtensionPanel,
    setExtensionTheme,
    setExtensionVideoId,
    extensionTheme,
    extensionIsOpen,
    extensionVideo
  } = useExtensionStore()

  useEffect(() => {
    const getVideoId = () => {
      return new URLSearchParams(window.location.search).get("v")
    }
    const fetchVideoData = async () => {
      const id = getVideoId()
      if (id && id !== extensionVideo) {
        setExtensionVideoId(id)
        setExtensionLoading(true)
        const data = await getVideoData(id)
        console.log("YTC Extension: Data")
        console.log(data)
        setExtensionData(data)
        setExtensionLoading(false)
      }
    }
    fetchVideoData()

    const intervalId = setInterval(fetchVideoData, 2000)

    return () => clearInterval(intervalId)
  }, [extensionVideo])

  useEffect(() => {
    const getCssVariables = (name: string) => {
      const rootStyles = getComputedStyle(document.documentElement)
      return rootStyles.getPropertyValue(name).trim()
    }
    const bgColor = getCssVariables("--yt-spec-base-background")
    if (bgColor === "#fff") {
      setExtensionTheme("light")
    } else {
      setExtensionTheme("dark")
    }
  }, [])

  if (!extensionTheme) return null

  return (
    <main className={`antialiased w-full mb-3 z-0 ${extensionTheme}`}>
      <div className="w-full">
        <Collapsible
          className="space-y-3"
          onOpenChange={setExtensionIsOpen}
          open={extensionIsOpen}>
          <ExtensionAction />
          <CollapsibleContent className="w-full h-fit max-h-500px border border-zinc-500 rounded-xl overflow-auto dark:border-zinc-700">
            <ExtensionPanel />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </main>
  )
}
