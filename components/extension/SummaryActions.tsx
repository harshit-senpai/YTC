import { useSummaryEffects } from "@/store/summaryEffect"
import useSummaryStore from "@/store/summaryStore"
import { models, prompts, type Modal, type Prompt } from "@/types/type"
import { ClipboardCopyIcon, ReloadIcon } from "@radix-ui/react-icons"
import React from "react"

import { ToolTip } from "../ToolTip"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"

export default function SummaryAction() {
  const {
    summaryPrompt,
    summaryIsGenerating,
    summaryModel,
    summaryContent,
    setSummaryPrompt,
    setSummaryModel
  } = useSummaryStore((state) => state)

  const { generateSummary } = useSummaryEffects()

  return (
    <div className="flex flex-row w-full justify-between items-center sticky top-0 z-20 bg-white dark:bg-[#0f0f0f] pt-3.5 pb-2 px-3">
      <Select
        value={summaryModel.value}
        onValueChange={(value) =>
          setSummaryModel(models.find((model) => model.value === value))
        }>
        <SelectTrigger className="w-fit space-x-3 rounded-xl border-zinc-500 dark:border-zinc-700 dark:text-white">
          <SelectValue placeholder="Model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model: Modal) => (
            <SelectItem
              key={model.value}
              value={model.value}
              className="border border-zinc-700">
              <div className="flex flex-row items-center">
                <div className="mr-2 dark:text-white">{model.icon}</div>
                <div className="dark:text-white">{model.label}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-row space-x-2">
        <ToolTip text={"Regenerate Summary"}>
          <Button
            variant="outline"
            size="icon"
            onClick={generateSummary}
            disabled={summaryIsGenerating}
            className="dark:border-zinc-700 rounded-xl border-zinc-500">
            <ReloadIcon className="h-4 w-4 opacity-60 dark:text-white" />
          </Button>
        </ToolTip>

        <ToolTip text={"Copy Summary"}>
          <Button
            variant="outline"
            size="icon"
            disabled={summaryIsGenerating}
            className="rounded-xl dark:border-zinc-700 border-zinc-500">
            (
            <ClipboardCopyIcon className="h-4.5 w-4.5 opacity-60 dark:text-white" />
            )
          </Button>
        </ToolTip>

        <Select
          value={summaryPrompt.value}
          onValueChange={(value) =>
            setSummaryPrompt(prompts.find((prompt) => prompt.value === value))
          }>
          <SelectTrigger className="w-fit dark:text-white space-x-3 rounded-xl border-zinc-500 dark:border-zinc-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {prompts.map((prompt: Prompt) => (
              <SelectItem key={prompt.value} value={prompt.value}>
                {prompt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
