import { create } from "zustand"

interface ExtensionState {
  extensionContainer: any
  extensionIsOpen: boolean
  extensionTheme: string | null
  extensionIsLoading: boolean
  extensionPanel: string
  extensionVideo: string
  extensionData: any
}

interface ExtensionAction {
  setExtensionContainer: (container: any) => void
  setExtensionIsOpen: (isOpen: boolean) => void
  setExtensionTheme: (theme: string | null) => void
  setExtensionLoading: (loading: boolean) => void
  setExtensionPanel: (panel: string) => void
  setExtensionVideoId: (videoId: string) => void
  setExtensionData: (data: any) => void
  resetExtension: () => void
}

const initialState: ExtensionState = {
  extensionContainer: null,
  extensionIsOpen: false,
  extensionTheme: null,
  extensionIsLoading: false,
  extensionPanel: "Summary",
  extensionVideo: "",
  extensionData: null
}

const useExtensionStore = create<ExtensionState & ExtensionAction>((set) => ({
  ...initialState,
  setExtensionContainer: (container) => set({ extensionContainer: container }),
  setExtensionIsOpen: (isOpen) => set({ extensionIsOpen: isOpen }),
  setExtensionTheme: (theme) => set({ extensionTheme: theme }),
  setExtensionLoading: (loading) => set({ extensionIsLoading: loading }),
  setExtensionPanel: (panel) => set({ extensionPanel: panel }),
  setExtensionVideoId: (videoId) => set({ extensionVideo: videoId }),
  setExtensionData: (data) => set({ extensionData: data }),
  resetExtension: () => set({ ...initialState })
}))

export default useExtensionStore
