<template>
    <div class="test">
        <form class="test_form" @submit.prevent="getPosts()">
            <input type="text" name="post_id" v-model="post_id" placeholder="Enter post id">
            <button type="submit" class="button">Submit</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Message</th>
                    <th>Date/Time</th>
                    <th>Link to Post</th>
                </tr>
            </thead>
            <tbody v-if="posts.length > 0">
                <tr v-for="(post, key) in posts" :key="key">
                    <td>{{ post.id }}</td>
                    <td>{{ post.message }}</td>
                    <td>{{ post.formatted_time }}</td>
                    <td><a :href="post.permalink_url">{{ post.permalink_url }}</a></td>
                </tr>
            </tbody>
            <tbody class="no_results" v-else>
                <tr>
                    <td colspan="4" class="text">Enter Post ID first.</td>
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
                post_id: null,
                posts: []
            }
        },
        methods: {
            getPosts () {
                const me = this
                if (me.post_id) {
                    me.$axios.get(`https://graph.facebook.com/v8.0/100255384876524_${me.post_id}/comments?fields=permalink_url%2Cmessage%2Ccreated_time%2Cfrom%2Cattachment&limit=1000&access_token=EAAEXNjJYc8gBAHahs8ZBoRRNViflPZBDSaXZBo8CvBMetkjcQq6GZCTiIutANWkwuKIn5tY8mMuPQ2Q8IzhRGvZAZBbcnwX1ZADrT44ZB3NTehgYZB5QpGZArxfRaZCGFFzb3B6MiidMqV2P6uInwYKSiahOtFwF4dgWXNzAURDZA7HfqwZDZD`).then(res => {

                        let posts = []

                        res.data.data.forEach((post, index) => {
                            if (!post.from && !post.attachment) {
                                post.formatted_time = me.$moment(post.created_time).format('MMM DD, YYYY hh:mm:ss A')
                                posts.push(post)
                            }
                        })

                        me.posts = posts.sort((a, b) => new Date(b.formatted_time) - new Date(a.formatted_time))

                    })
                } else {
                    alert('Enter Post ID')
                }
            }
        }
    }
</script>
