import Extension from "@/components/Extension"
import cssText from "data-text:~styles.css"
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

export const getStyle = () => {
  const baseFontSize = 12
  let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
    const pixels = parseFloat(remValue) * baseFontSize
    return `${pixels}px`
  })
  const style = document.createElement("style")
  style.textContent = updatedCssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(ELEMENT_ID),
  insertPosition: "afterbegin"
})

export const getShadowHostId: PlasmoGetShadowHostId = () => "plasmo-inline"

export default function PlasmoMainUI() {
  return <Extension />
}
