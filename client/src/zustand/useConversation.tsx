import { create } from 'zustand'

interface ConversationState {
  selectedConversation: any
  setSelectedConversation: (selectedConversation: any) => void
  messages: string[]
  setMessages: (messages: string[]) => void
}
const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: any) => set({ selectedConversation }),
  messages: [],
  setMessages : (messages:any)=>set({messages})
}))

export default useConversation