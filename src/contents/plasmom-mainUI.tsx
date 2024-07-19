import Extension from "@/components/Extension"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetShadowHostId
} from "plasmo"

const ELEMENT_ID = "#secondary.style-scope.ytd-watch-flexy"
// id to inject the chatUI

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/watch?v=*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(ELEMENT_ID),
  insertPosition: "afterbegin"
})

export const getShadowHostId: PlasmoGetShadowHostId = () => "plasmo-inline"


export default function PlasmoMainUI() {
  return <Extension />
}
