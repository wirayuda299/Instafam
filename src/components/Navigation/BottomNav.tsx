import { useState } from "react"
import { NavbarList } from "./Lists"

export default function BottomNav() {
  const [extraListOpen, setExtraListOpen] = useState(false)
  return (
    <nav className="fixed w-full h-14 bottom-0 flex items-center left-0 bg-white z-50 md:hidden">
      <NavbarList
        extraListOpen={extraListOpen}
        setExtraListOpen={setExtraListOpen}
      />
    </nav>
  )
}
