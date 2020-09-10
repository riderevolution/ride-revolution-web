<template lang="html">
    <div class="skeleton" v-if="page == 'default'">
        <section class="sklt_banner skeleton_el" v-if="has_banner"></section>
        <section :class="`sklt_body ${(!has_banner) ? 'pd' : ''}`">
            <div class="sklt_header" v-if="has_header">
                <div class="sklt_header_l">
                    <div class="sklt_body_title skeleton_el"></div>
                    <div class="sklt_body_title skeleton_el sub"></div>
                </div>
                <div class="sklt_header_r">
                    <div class="sklt_body_title skeleton_el"></div>
                </div>
            </div>
            <div class="sklt_content" v-if="has_col">
                <div :class="`sklt_content_col ${col.class} skeleton_el`" v-for="(n, key) in col.count" :key="key"></div>
            </div>
        </section>
    </div>
    <div class="skeleton centered" v-else-if="page == 'default_centered'">
        <section class="sklt_banner skeleton_el" v-if="has_banner"></section>
        <section :class="`sklt_body ${(!has_banner) ? 'pd' : ''}`">
            <div class="sklt_header" v-if="has_header">
                <div class="sklt_header_l">
                    <div class="sklt_body_title skeleton_el"></div>
                    <div class="sklt_body_title skeleton_el sub"></div>
                    <div class="sklt_body_title skeleton_el sub_second"></div>
                </div>
            </div>
            <div class="sklt_content" v-if="has_col">
                <div :class="`sklt_content_col ${col.class} skeleton_el`" v-for="(n, key) in col.count" :key="key"></div>
            </div>
        </section>
    </div>
    <div class="skeleton circle" v-else-if="page == 'default_centered_circle'">
        <section class="sklt_banner skeleton_el" v-if="has_banner"></section>
        <section :class="`sklt_body ${(!has_banner) ? 'pd' : ''}`">
            <div class="sklt_content">
                <div class="sklt_content_l">
                    <div class="sklt_content_g" v-for="(n, key) in 3" :key="key">
                        <div class="sklt_body_title skeleton_el"></div>
                        <div class="sklt_body_title skeleton_el sub"></div>
                        <div class="sklt_body_title skeleton_el sub_second"></div>
                    </div>
                </div>
                <div class="sklt_content_r">
                    <div class="sklt_circle skeleton_el"></div>
                </div>
            </div>
        </section>
    </div>
    <div class="skeleton inner" v-else-if="page == 'default_inner'">
        <section class="sklt_banner skeleton_el" v-if="has_banner"></section>
        <section :class="`sklt_body ${(!has_banner) ? 'pd' : ''}`">
            <div class="sklt_content">
                <div class="sklt_content_l">
                    <div class="sklt_content_g">
                        <div class="sklt_body_title skeleton_el"></div>
                        <div class="sklt_body_title skeleton_el sub"></div>
                        <div class="sklt_body_title skeleton_el sub_second"></div>
                    </div>
                    <div class="sklt_content_g">
                        <div class="sklt_body_title skeleton_el"></div>
                        <div class="sklt_body_title skeleton_el sub"></div>
                    </div>
                </div>
                <div class="sklt_content_r">
                    <div class="sklt_body_title skeleton_el sub nmt"></div>
                    <div class="sklt_body_title skeleton_el sub_second"></div>
                </div>
            </div>
        </section>
        <section class="sklt_body"  v-if="has_col">
            <div class="sklt_content">
                <div :class="`sklt_content_col ${col.class} skeleton_el`" v-for="(n, key) in col.count" :key="key"></div>
            </div>
        </section>
    </div>
    <div class="skeleton box" v-else-if="page == 'default_box'">
        <section class="sklt_banner skeleton_el" v-if="has_banner"></section>
        <section :class="`sklt_body ${(!has_banner) ? 'pd' : ''} ${layout}`">
            <div class="sklt_content" v-if="layout == 'one'">
                <div class="sklt_content_l">
                    <div class="sklt_content_g">
                        <div class="sklt_body_title skeleton_el"></div>
                        <div class="sklt_body_title skeleton_el sub"></div>
                        <div class="sklt_body_title skeleton_el sub_second"></div>
                    </div>
                </div>
                <div class="sklt_content_r">
                    <section class="sklt_body"  v-if="has_col">
                        <div class="sklt_content">
                            <div :class="`sklt_content_col ${col.class} skeleton_el`" v-for="(n, key) in col.count" :key="key"></div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="sklt_content" v-else-if="layout == 'two'">
                <div class="sklt_content_l">
                    <div class="content_box skeleton_el">
                    </div>
                </div>
                <div class="sklt_content_r">
                    <div class="content_box skeleton_el">
                    </div>
                </div>
            </div>
            <div class="sklt_content" v-else-if="layout == 'three'">
                <div class="sklt_content_header">
                    <div class="content_box skeleton_el">
                    </div>
                </div>
                <div class="sklt_content_l">
                    <div class="content_box skeleton_el">
                    </div>
                </div>
                <div class="sklt_content_r">
                    <div class="content_box skeleton_el">
                    </div>
                </div>
                <div class="sklt_content_header">
                    <div class="content_box skeleton_el">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        props: {
            page: {
                type: String,
                default: 'default'
            },
            has_col: {
                type: Boolean,
                default: true
            },
            has_banner: {
                type: Boolean,
                default: true
            },
            has_header: {
                type: Boolean,
                default: true
            },
            col: {
                type: Object/Array,
                default: function () {
                    return {
                        class: 'three',
                        count: 3
                    }
                }
            },
            layout: {
                type: String,
                default: 'two'
            }
        }
    }
</script>
