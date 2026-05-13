import { create } from "zustand"

import { SelectCommunity } from "../types/community.types"



type Store = {
  open: boolean
  community: SelectCommunity | null,
  setOpen: (open: boolean) => void,
  setCommunity: (community: SelectCommunity | null) => void,
}

export const useCommunityStore = create<Store>((set, get) => ({
  open: false,
  community: null,
  setOpen: (open) => {
    set({open})
  },
  setCommunity: (community) => {
    set({community})
  }
}))