import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
    state: () => ({
        selected: 0,
    }),
    actions: {
        switchTab(index: number) {
            this.selected = index
        }
    }
})