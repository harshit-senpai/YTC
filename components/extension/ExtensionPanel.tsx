import useExtensionStore from "@/store/extensionStore"

export default function ExtensionPanel() {
  const { extensionPanel } = useExtensionStore()

  return (
    <div>
      {extensionPanel === "Summary" && <h1>Summary</h1>}
      {extensionPanel === "Transcript" && <h1>Transcript</h1>}
      {extensionPanel === "Chat" && <h1>Chat</h1>}
    </div>
  )
}
