// composables/useModal.ts
export const useModal = () => {
  const isModalOpen = useState('modal-open', () => false)

  const openModal = () => {
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
  }

  return {
    isModalOpen,
    openModal,
    closeModal
  }
}
