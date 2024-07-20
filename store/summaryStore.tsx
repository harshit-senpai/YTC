import { models, prompts, type Modal, type Prompt } from "@/types/type"
import { create } from "zustand"

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

const useSummaryStore = create<Summary & SummaryActions>((set) => ({
  ...initialSummaryState,
  setSummaryModel: (model: Modal) => set({ summaryModel: model }),
  setSummaryPrompt: (prompt: Prompt) => set({ summaryPrompt: prompt }),
  setSummaryContent: (content: string | null) => set({ summaryContent: content }),
  setSummaryIsError: (isError: boolean) => set({ summaryIsError: isError }),
  setSummaryIsGenerating: (isGenerating: boolean) => set({ summaryIsGenerating: isGenerating }),
  generateSummary: () => {}
}))

export default useSummaryStore