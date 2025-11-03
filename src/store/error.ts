import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', {
    state: () => ({
        title: ref<string | null>(null),
        description: ref<string | null>(null),
    }),
    actions: {
        setTitle(title: string) {
            this.title = title
        },
        set(description: string) {
            this.description = description
        }
    }
})