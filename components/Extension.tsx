import useExtensionStore from "@/store/extensionStore"
import { getVideoData } from "@/utils/getVideoData"
import { useEffect } from "react"

import { Collapsible } from "./ui/collapsible"

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
        console.log("Data")
        console.log(data)
        setExtensionData(data)
        setExtensionLoading(false)
      }
    }
    fetchVideoData();

    const intervalId = setInterval(fetchVideoData, 2000);

    return () => clearInterval(intervalId)
  }, [extensionVideo])

  useEffect(() => {
    const getCssVariables = (name: string) => {
      const rootStyles = getComputedStyle(document.documentElement)
      return rootStyles.getPropertyValue(name).trim()
    }
    const bgColor = getCssVariables("--yt-spec-base-background")
    if (bgColor === "fff") {
      setExtensionTheme("light")
    } else {
      setExtensionTheme("dark")
    }
  })

  if (!extensionTheme) return null

  return (
    <main className="antialiased w-full mb-3 z-10">
      <div className="w-full">
        <Collapsible className="space-y-3">
          <h1 className="text-5xl">extensions Action</h1>
        </Collapsible>
      </div>
    </main>
  )
}
