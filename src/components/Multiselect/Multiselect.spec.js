import { shallowMount, createLocalVue } from '@vue/test-utils';
import Multiselect from './Multiselect.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Multiselect.vue', () => {

    let getters;
    let store;
    let wrapper;
    let input;
    let contentWrapper;

    beforeEach(() => {
        getters = {
            tags: () => {
                return {
                    "id": 1,
                    "name": "Leanne Graham",
                    "selected": true
                }
            }
        }

        store = new Vuex.Store({
            getters
        })
    })

    it('should render a multiselect component', () => {
        wrapper = shallowMount(Multiselect, {
            propsData: {
                options: [
                    {
                        "id": 1,
                        "name": "Leanne Graham",
                    },
                    {
                        "id": 2,
                        "name": "Ervin Howell",
                    },
                    {
                        "id": 3,
                        "name": "Clementine Bauch",
                    },
                    {
                        "id": 4,
                        "name": "Patricia Lebsack",
                    },
                ]
            }, store, localVue
        });
        input = wrapper.find('.multiselect__input');
        contentWrapper = wrapper.find('.multiselect__content-wrapper');

        expect(wrapper).toBeDefined();
        expect(input).toBeDefined();
        expect(input.name()).toBe('input');
        expect(contentWrapper).toBeDefined();
        expect(contentWrapper.name()).toBe('ul');
    });

    describe('When the user focus the input', () => {
        it('then i should see options to appear', () => {
            input.trigger('focus');
            expect(wrapper.isVisible()).toBe(true);
            const labels = wrapper.findAll('.multiselect__element');

            wrapper.props().options.forEach((item, index) => {
                expect(labels.at(index).text()).toMatch(item.name);
            })
        });
        it('then i should see options to disappear', () => {
            wrapper.vm.toggle();
            expect(wrapper.vm.isOpened).toBe(false);
        });
    });

    describe('When the user autocomplete a search', () => {
        it('then i should see Leanne Graham to appear', () => {
            input.trigger('focus');
            wrapper.setData({ search: 'Le' });
            wrapper.vm.autocomplete();
            expect(wrapper.vm.search).toBe('Leanne Graham');
        });
    });
});
