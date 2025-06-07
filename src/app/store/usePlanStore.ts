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
  getPlanPrice: () => number
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      plan: 'trial',
      hasSubscribed: false,
      cardInfo: null,
      setPlan: (plan) => set({ plan }),
      setHasSubscribed: (status) => set({ hasSubscribed: status }),
      setCardInfo: (info) => {
      if (get().hasSubscribed) {
        set({ cardInfo: info });
      }
    },

      reset: () =>
        set({
          plan: 'trial',
          hasSubscribed: false,
          cardInfo: null,
        }),
      getPlanPrice: () => {
        const plan = get().plan
        switch (plan) {
          case 'business':
            return 3990
          case 'trial':
          default:
            return 0
        }
      },
    }),
    {
      name: 'plan-storage-5',
    }
  )
)
