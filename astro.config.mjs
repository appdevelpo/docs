import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

export const locales = {
    root: {
        label: '繁體中文',
        lang: 'zh-TW',
    },
    'zh-CN': {
        label: '简体中文',
        lang: 'zh-CN',
    },
    en: {
        label: 'English',
        lang: 'en',
    }
}

// https://astro.build/config
export default defineConfig({
    site: 'https://appdevelpo.github.io',
    base: '/docs',
    integrations: [
        starlight({
            title: "Miru Alpha",
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/miru-project/miru-alpha' },
            ],
            customCss: [
                // Relative path to your custom CSS file
                "./src/assets/landing.css",
            ],
            sidebar: [
                {
                    label: "開發指南",
                    translations: {
                        'zh-CN': '开发指南',
                        en: 'Developer Guide',
                    },
                    items: [
                        { label: "介紹", link: "/developer/", translations: { 'zh-CN': '介绍', en: "Introduction" } },
                        { label: "環境搭建", link: "/developer/1-environment/", translations: { 'zh-CN': '环境搭建', en: "Environment" } },
                        { label: "開始開發", link: "/developer/2-extension/", translations: { 'zh-CN': '开始开发', en: "Getting Started" } },
                        {
                            label: "JavaScript 插件",
                            translations: { 'zh-CN': 'JavaScript 扩展', en: "JavaScript Extensions" },
                            items: [
                                { label: "快速開始（V2）", link: "/developer/js/1-get-started/", translations: { 'zh-CN': '快速开始（V2）', en: "Get Started (V2)" } },
                                { label: "舊版 V1", link: "/developer/js/2-legacy-v1/", translations: { 'zh-CN': '旧版 V1', en: "Legacy V1" } },
                                { label: "資料格式（V2 / V1 舊版）", link: "/developer/5-data/", translations: { 'zh-CN': '数据格式（V2 / V1 旧版）', en: "Data Formats (V2 / V1 legacy)" } },
                            ],
                        },
                        {
                            label: "Go 插件",
                            translations: { 'zh-CN': 'Go 扩展', en: "Go Extensions" },
                            items: [
                                { label: "快速開始", link: "/developer/go/1-get-started/", translations: { 'zh-CN': '快速开始', en: "Get Started" } },
                                { label: "詳細用法", link: "/developer/go/2-detail-usage/", translations: { 'zh-CN': '详细用法', en: "Detail Usage" } },
                                { label: "原生 Go 運行", link: "/developer/go/3-running-native/", translations: { 'zh-CN': '原生 Go 运行', en: "Running with Native Go" } },
                                { label: "Scriggo 運行", link: "/developer/go/4-running-scriggo/", translations: { 'zh-CN': 'Scriggo 运行', en: "Running with Scriggo" } },
                                { label: "資料格式", link: "/developer/5-data/", translations: { 'zh-CN': '数据格式', en: "Data Formats" } },
                            ],
                        },
                    ],
                },
            ],
            defaultLocale: 'root',
            locales: locales
        }),
        react(),
        mdx(),
    ],
    // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
    image: {
        service: {
            entrypoint: "astro/assets/services/sharp",
        },
    },
});
