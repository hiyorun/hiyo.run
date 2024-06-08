<script setup>
import { ArrowDownCircleIcon } from '@heroicons/vue/24/solid'
import { useBusy } from '@/states/busy.js'
import { onMounted } from 'vue';
import Pixiv from '@/assets/imgs/icons/Pixiv.vue';
import Reddit from '@/assets/imgs/icons/Reddit.vue';
import Twitter from '@/assets/imgs/icons/Twitter.vue';
import Misskey from '@/assets/imgs/icons/Misskey.vue';
import Waves from './Waves.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const busy = useBusy()
const socials = [
    {
        name: 'Pixiv',
        icon: Pixiv,
        link: 'https://www.pixiv.net/en/users/28906889'
    },
    {
        name: 'Reddit',
        icon: Reddit,
        link: 'https://www.reddit.com/u/ldy3112'
    },
    {
        name: 'Misskey',
        icon: Misskey,
        link: 'https://misskey.art/@hiyorun@misskey.art'
    },
    {
        name: 'Twitter',
        icon: Twitter,
        link: 'https://x.com/hiyorrun'
    },
]

function toProject() {
    router.replace("/#project")
}

onMounted(() => {
    busy.setBusy(false)
    console.log("mounted")
})
</script>

<template>
    <div
        class="h-screen mx-6 flex flex-col justify-around md:items-center md:text-center md:max-w-screen-md md:mx-auto">
        <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold tracking-tighter">
                Take
                a <u class="decoration-wavy">dive</u> into my little world,</h1>
            <div class="text-kikyou-600">or
                <span class="bg-kikyou-600 text-kikyou-50 px-1">peek on</span>
                my social media:
            </div>
            <div class="flex gap-2 md:justify-center">
                <a v-for="social in socials" :href="social.link" :title="social.name"
                    class="transition-colors duration-200 bg-kikyou-700 hover:bg-kikyou-600 dark:bg-kikyou-50 hover:dark:bg-kikyou-200 rounded-full p-3 text-kikyou-50 dark:text-kikyou-700">
                    <component :is="social.icon" class="w-7 h-7 flex items-center" />
                </a>
            </div>
        </div>
    </div>
    <div class="absolute bottom-24 flex justify-center items-center w-full translate-y-[50%]">
        <button class="h-10 w-10 hover:w-12 hover:h-12 transition-transform duration-200" @click="toProject()">
            <ArrowDownCircleIcon />
        </button>
    </div>
    <Waves class="absolute top-[100vh] right-0 translate-y-[-100%]" />
</template>
