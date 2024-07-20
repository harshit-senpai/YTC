import { useEffect } from "react"

import { usePort } from "@plasmohq/messaging/hook"

import useExtensionStore from "./extensionStore"
import useSummaryStore from "./summaryStore"

export const useSummaryEffects = () => {
  const {
    summaryModel,
    summaryPrompt,
    summaryContent,
    setSummaryContent,
    setSummaryIsGenerating,
    setSummaryIsError,
    generateSummary
  } = useSummaryStore((state) => state)

  const port = usePort("completion")
  const { extensionData, extensionIsLoading } = useExtensionStore()

  const handleGenerateSummary = async (e: any) => {
    e.preventDefault()
    if (summaryContent !== null) {
      setSummaryContent(null)
    }
    setSummaryIsGenerating(true)
    setSummaryIsError(false)

    port.send({
      prompt: summaryPrompt.content,
      model: summaryModel.content,
      context: extensionData
    })
  }

  useEffect(() => {
    setSummaryContent(null)
    setSummaryIsGenerating(false)
    setSummaryIsError(false)
  }, [extensionIsLoading])

  useEffect(() => {
    if (port.data?.message !== undefined && port.data.isEnd === false) {
      setSummaryContent(port.data.message)
    } else {
      setSummaryIsGenerating(false)
    }
    setSummaryIsError(false)
  }, [port.data?.message])

  useEffect(() => {
    if (port.data?.error !== undefined && port.data?.error !== null) {
      setSummaryIsError(true)
      setSummaryContent(null)
    } else {
      setSummaryIsError(false)
    }
  }, [port.data?.error])

  return {
    generateSummary: handleGenerateSummary
  }
}
