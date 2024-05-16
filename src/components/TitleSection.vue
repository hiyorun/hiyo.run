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
        link: 'https://pixiv.net'
    },
    {
        name: 'Reddit',
        icon: Reddit,
        link: 'https://reddit.com'
    },
    {
        name: 'Misskey',
        icon: Misskey,
        link: 'https://misskey.art'
    },
    {
        name: 'Twitter',
        icon: Twitter,
        link: 'https://twitter.com'
    },
]

function toProject(){
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
        <div><!---spacer--></div>
        <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-extrabold">
                Take
                a <u class="decoration-wavy">dive</u> into my little world.</h1>
            <div class="text-arisu-600">or
                <span class="bg-arisu-600 text-arisu-100 p-1">peek on</span>
                my social media:
            </div>
            <div class="flex gap-2 md:justify-center">
                <a v-for="social in socials" :href="social.link" :title="social.name"
                    class="transition-all duration-500 bg-arisu-700 hover:bg-arisu-600 dark:bg-arisu-100 hover:dark:bg-arisu-200 rounded-full p-3 text-arisu-100 dark:text-arisu-700">
                    <component :is="social.icon" class="w-7 h-7 flex items-center" />
                </a>
            </div>
        </div>
        <button class="h-10 w-10 hover:w-12 hover:h-12 transition-all duration-500" @click="toProject()">
            <ArrowDownCircleIcon/>
        </button>
    </div>
    <Waves class="absolute bottom-0 right-0" />
</template>