<template>
    <div class="multiselect">
        <ul class="multiselect__tags">
            <li class="multiselect__tag" v-for="tag in tags">
                {{tag.name}}
                <button class="multiselect__destroyTag" @click.prevent="deleteTag(tag)">X</button>
            </li>
        </ul>
        <input
                class="multiselect__input"
                type="text"
                placeholder="Veuillez taper votre recherche"
                v-model="search"
                @focus="toggle()"
                @blur="toggle()"
                @keydown.tab.prevent="autocomplete()"
                @keyup.enter="submit()"/>
        <ul class="multiselect__content-wrapper" v-bind:class="{ opened: isOpened }">
            <li v-for="user in filteredNames" v-show="!user.selected">
                <label class="multiselect__element">
                    <input type="checkbox" v-model="user.selected" @change="check(user)" class="multiselect__checkbox">
                    {{user.name}}
                </label>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mapGetters} from 'vuex';

    export default ({
        name: 'Multiselect',
        props: {
            options: {
                type: Array,
                default: () => [],
            }
        },
        data() {
            return {
                users: this.options,
                isOpened : false,
                search: '',
            }
        },
        methods: {
            deleteTag(user) {
                user.selected = false;
                this.$store.dispatch('remove:tag', user);
            },
            toggle() {
                this.isOpened = !this.isOpened;
            },
            check(user) {
                this.$store.dispatch('add:tags', user);
            },
            submit() {
                this.options.filter(item => item.name === this.search).map(user => {
                    this.$store.dispatch('add:tags', user);
                });
                this.search = '';
            },
            autocomplete() {
                this.search = this.filteredNames[0].name;
            },
        },
        computed: {
            ...mapGetters(['tags']),
            filteredNames() {
                return this.options.filter(item => {
                    return item.name.toLowerCase().startsWith(this.search.toLowerCase()); //with a regex, the result would be more relevant
                });
            }
        }
    });
</script>
<style src="./Multiselect.scss" lang="scss"></style>
