import { create } from 'zustand'

interface RegisterModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log('onOpen');
    set({ isOpen: true })
  },
  onClose: () => {
    console.log('onClose');
    set({ isOpen: false })
  }


}))

export default useModal;


