import { persist } from 'zustand/middleware'
import { create } from 'zustand'

interface CardInfo {
  number: string
  name: string
  validity: string
  cvv: string
  document: string
  email: string
}

interface PlanState {
  plan: 'trial' | 'business' | null
  hasSubscribed: boolean
  cardInfo: CardInfo | null
  setPlan: (plan: 'trial' | 'business') => void
  setHasSubscribed: (status: boolean) => void
  setCardInfo: (info: CardInfo) => void
  reset: () => void
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      plan: 'trial',
      hasSubscribed: false,
      cardInfo: null,
      setPlan: (plan) => set({ plan }),
      setHasSubscribed: (status) => set({ hasSubscribed: status }),
      setCardInfo: (info) => set({ cardInfo: info }),
      reset: () =>
        set({
          plan: 'trial',
          hasSubscribed: false,
          cardInfo: null,
        }),
    }),
    {
      name: 'plan-storage-1',
    }
  )
)
