<template>
    <div class="card">
        <div class="cards">
            <div class="ci_header">
                <h2>Credit/Debit Cards</h2>
                <div class="default_btn nmt" @click="addPaymayaCard()">Add credit/debit Card</div>
            </div>
            <div class="card_item" v-for="(data, key) in cards" v-if="cards.length > 0">
                <div class="overlay">
                    <div class="ci_dot" :class="{ 'toggled': data.toggled }" @click="toggleDot(data, key)"></div>
                    <transition name="slideAlt">
                        <ul class="menu_dot_list" v-if="data.toggled" v-click-outside="closeDot">
                            <li class="menu_dot_item" @click="cardAction(data, 'default')">Set as Default</li>
                            <li class="menu_dot_item red" @click="cardAction(data, 'delete')">Delete Card</li>
                        </ul>
                    </transition>
                </div>
                <div class="c_type" v-html="cardType(data)"></div>
                <div class="c_number">
                    **** **** **** {{ data.last4 }}
                </div>
                <div class="c_date">Exp. {{ data.expiry_month }}/{{ $moment(data.expiry_year, 'YYYY').format('YY') }}</div>
                <div class="c_default">
                    <div class="d_status" v-if="data.default">Default</div>
                </div>
            </div>
            <div class="no_results" v-if="cards.length == 0">
                <div class="text">You don't have any cards.</div>
            </div>
        </div>
        <button type="button" id="sc" class="hidden" @click="initialization()"></button>
        <transition name="fade">
            <add-card v-if="add_card" />
        </transition>
        <transition name="fade">
            <prompt-card v-if="prompt_card" />
        </transition>
        <transition name="fade">
            <action-card v-if="card_action" :type="action_type" :card="card" />
        </transition>
        <transition name="fade">
            <success-card v-if="card_success" :message="card_message" />
        </transition>
    </div>
</template>

<script>
    import AddCard from '~/components/modals/AddCard'
    import PromptCard from '~/components/modals/PromptCard'
    import ActionCard from '~/components/modals/ActionCard'
    import SuccessCard from '~/components/modals/SuccessCard'

    export default {
        layout: 'fish',
        components: {
            AddCard,
            PromptCard,
            ActionCard,
            SuccessCard
        },
        data () {
            return {
                cards: [],
                card_success: false,
                add_card: false,
                prompt_card: false,
                card_action: false
            }
        },
        computed: {
            populateCards () {
                const me = this
                let result = []
                for (let i = 0, len = me.cards.length; i < len; i++) {
                    result.push(me.cards[i])
                }
                return result
            }
        },
        methods: {
            cardAction (data, type) {
                const me = this
                me.card = data
                me.action_type = type
                me.card_action = true
            },
            addPaymayaCard () {
                const me = this
                me.prompt_card = true
            },
            toggleDot (data, unique = null) {
                const me = this
                me.closeDot()
                if (unique != null) {
                    me.card_unique = unique
                }
                data.toggled = true
            },
            closeDot () {
                const me = this
                if (me.card_unique != null) {
                    if (me.cards[me.card_unique]) {
                        me.cards[me.card_unique].toggled = false
                    }
                }
            },
            initialization () {
                const me = this
                let token = me.$route.query.token
                me.loader(true)
                me.$axios.get('api/paymaya/cards', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {

                    for (let i = 0, len = res.data.cards.length; i < len; i++) {
                        res.data.cards[i].toggled = false
                    }
                    me.cards = res.data.cards
                    me.cards.sort(function(x, y) {
                        return (x.default === y.default) ? 0 : (x.default ? -1 : 1)
                    })
                }).catch((err) => {
                    error({ statusCode: 404, message: 'Page not found' })
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            }
        },
        mounted () {
            const me = this
            me.initialization()
        }
    }
</script>
