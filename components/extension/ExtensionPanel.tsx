import useExtensionStore from "@/store/extensionStore"

import Summary from "./Summary"

export default function ExtensionPanel() {
  const { extensionPanel } = useExtensionStore()

  return (
    <div>
      {extensionPanel === "Summary" && <Summary />}
      {extensionPanel === "Transcript" && <h1>Transcript</h1>}
      {extensionPanel === "Chat" && <h1>Chat</h1>}
    </div>
  )
}
