import { models, prompts, type Modal, type Prompt } from "@/types/type"
import { useEffect } from "react"
import { create } from "zustand"

import { usePort } from "@plasmohq/messaging/hook"

import useExtensionStore from "./extensionStore"

interface Summary {
  summaryModel: Modal
  summaryPrompt: Prompt
  summaryContent: string | null
  summaryIsError: boolean
  summaryIsGenerating: boolean
}

interface SummaryActions {
  setSummaryModel: (model: Modal) => void
  setSummaryPrompt: (prompt: Prompt) => void
  setSummaryContent: (content: string | null) => void
  setSummaryIsError: (isError: boolean) => void
  setSummaryIsGenerating: (isGenerating: boolean) => void
  generateSummary: (e: any) => void
}

const initialSummaryState: Summary = {
  summaryModel: models[0],
  summaryPrompt: prompts[0],
  summaryContent: null,
  summaryIsError: false,
  summaryIsGenerating: false
}

const useSummaryStore = create<Summary & SummaryActions>((set, get) => {
  //@ts-ignore
  const port = usePort("completion")
  const { extensionData, extensionIsLoading } = useExtensionStore()

  const generateSummary = async (e: any) => {
    e.preventDefault()
    const { summaryPrompt, summaryModel, summaryContent } = get()

    if (summaryContent !== null) {
      set({ summaryContent: null })
    }

    set({ summaryIsGenerating: true, summaryIsError: false })

    port.send({
      prompt: summaryPrompt.content,
      model: summaryModel.content,
      context: extensionData
    })
  }

  useEffect(() => {
    set({
      summaryContent: null,
      summaryIsGenerating: false,
      summaryIsError: false
    })
  }, [extensionIsLoading])

  useEffect(() => {
    const { message, isEnd } = port.data || {}
    if (message !== undefined && isEnd === false) {
      set({ summaryContent: message })
    } else {
      set({ summaryIsGenerating: false })
    }
    set({ summaryIsError: false })
  }, [port.data?.message])

  useEffect(() => {
    const { error } = port.data || {}
    if (error !== undefined && error !== null) {
      set({ summaryIsError: true, summaryContent: null })
    } else {
      set({ summaryIsError: false })
    }
  }, [port.data?.error])

  return {
    ...initialSummaryState,
    setSummaryModel: (model: Modal) => set({ summaryModel: model }),
    setSummaryPrompt: (prompt: Prompt) => set({ summaryPrompt: prompt }),
    setSummaryContent: (content: string | null) =>
      set({ summaryContent: content }),
    setSummaryIsError: (isError: boolean) => set({ summaryIsError: isError }),
    setSummaryIsGenerating: (isGenerating: boolean) =>
      set({ summaryIsGenerating: isGenerating }),
    generateSummary
  }
})

export default useSummaryStore
