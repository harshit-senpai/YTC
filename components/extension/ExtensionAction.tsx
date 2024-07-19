import useExtensionStore from "@/store/extensionStore"
import {
  ActivityLogIcon,
  CardStackPlusIcon,
  CaretSortIcon,
  ChatBubbleIcon,
  CheckIcon,
  Link2Icon,
  Pencil2Icon
} from "@radix-ui/react-icons"

import { ToolTip } from "../ToolTip"
import { Button } from "../ui/button"
import { CollapsibleTrigger } from "../ui/collapsible"

export default function ExtensionAction() {
  const { setExtensionPanel, extensionIsOpen, setExtensionIsOpen } =
    useExtensionStore()

  return (
    <div className="border border-zinc-500 rounded-xl flex items-center justify-between p-2.5 px-3 dark:bg-[#0f0f0f] dark:text-white dark:border-zinc-700">
      <p className="text-black dark:text-white font-semibold">YTC</p>
      <div className="flex justify-center items-center space-x-2">
        <div className="flex -space-x-px">
          <Button
            variant="outline"
            onClick={() => {
              setExtensionPanel("Summary")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}
            className="
          rounded-r-none dark:border-zinc-600 border-zinc-500 focus:z-10 bg-transparent space-x-2 items-center">
            <Pencil2Icon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Summary</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setExtensionPanel("Transcript")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}
            className="
          rounded-r-none dark:border-zinc-600 border-zinc-500 focus:z-10 bg-transparent space-x-2 items-center">
            <ActivityLogIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Transcript</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setExtensionPanel("Chat")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}
            className="
          rounded-r-none dark:border-zinc-700 border-zinc-500 focus:z-10 bg-transparent space-x-2 items-center">
            <ChatBubbleIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Chat</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <ToolTip text={"Copy Video URL"}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border border-zinc-500 dark:border-zinc-700 ">
            <Link2Icon className="h-4.5 w-4.5 opacity-60" />
          </Button>
        </ToolTip>

        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border border-zinc-500 dark:border-zinc-700 ">
            <CaretSortIcon className="h-4.5 w-4.5 opacity-60" />
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
  )
}
