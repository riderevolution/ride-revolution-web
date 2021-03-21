<template>
    <div class="test">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Message</th>
                    <th>Date/Time</th>
                    <th>Link to Post</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(post, key) in posts" :key="key">
                    <td>{{ post.id }}</td>
                    <td>{{ post.message }}</td>
                    <td>{{ post.formatted_time }}</td>
                    <td><a :href="post.permalink_url">{{ post.permalink_url }}</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        layout: 'test',
        data () {
            return {
                posts: []
            }
        },
        mounted () {
            const me = this
            me.$axios.get('https://graph.facebook.com/v8.0/100255384876524_276986283870099/comments?fields=permalink_url%2Cmessage%2Ccreated_time%2Cfrom%2Cattachment&limit=1000&access_token=EAAEXNjJYc8gBAPxzQtPtltEPb93aaNDb7sm5HJE2P7usAqIx9DJIz8sbv038CiNhDZAKQEd4t37T99DZBxLNMybZA2vkCUeZAYgM7mAsPqVv1fZCBhruWA4L7ZASHXt8HZBSgtSKrPNkvr0W7uTzZA6VwrSFTIQJls4mlQ3y1CcZCZBAZDZD').then(res => {

                let posts = []

                res.data.data.forEach((post, index) => {
                    if (!post.from && !post.attachment) {
                        post.formatted_time = me.$moment(post.created_time).format('MMM DD, YYYY hh:mm:ss A')
                        posts.push(post)
                    }
                })

                me.posts = posts.sort((a, b) => new Date(b.formatted_time) - new Date(a.formatted_time))

            })
        }
    }
</script>
