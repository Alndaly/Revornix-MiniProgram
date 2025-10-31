import type { PrivateUserInfo, UserFileSystemInfo } from '@/generated'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: ref<PrivateUserInfo | null>(null),
        userFileSystem: ref<UserFileSystemInfo | null>(null),
    }),
    actions: {
        setUserInfo(userInfo: PrivateUserInfo) {
            this.userInfo = userInfo
        },
        setUserFileSystem(userFileSystem: UserFileSystemInfo) {
            this.userFileSystem = userFileSystem
        }
    }
})