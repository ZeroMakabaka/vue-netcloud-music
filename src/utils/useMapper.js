import { useStore } from 'vuex'
import { computed } from 'vue'

export function useStateMapper(mapper, mapFn) {
    const store = useStore();

    const storeStateFns = mapFn(mapper);

    const storeState = {};
    Object.keys(storeStateFns).forEach(fnKey => {
        // vuex源码中mapState和mapGetters的方法中使用的是this.$store,所以更改this绑定
        const fn = storeStateFns[fnKey].bind({ $store: store });
        storeState[fnKey] = computed(fn)

    })

    console.log(storeState);

    return storeState
}

export function useActionMapper(mapper, mapFn) {
    const store = useStore();
    
    const storeActionsFns = mapFn(mapper);

    const storeAction = {};

    Object.keys(storeActionsFns).forEach(fnKey => {
        storeAction[fnKey] = storeActionsFns[fnKey].bind({ $store: store })
    })

    return storeAction
}

export function useMutationMapper(mapper, mapFn) {
    const store = useStore();
    
    const storeMutationsFns = mapFn(mapper);

    const storeMutation = {};

    Object.keys(storeMutationsFns).forEach(fnKey => {
        storeMutation[fnKey] = storeMutationsFns[fnKey].bind({ $store: store })
    })

    return storeMutation
}
