import type { Context } from '@nuxt/types'
import type { MutationTree, ActionTree } from 'vuex'

export const namespace = 'instructions'

//TODO: export from "types"
export interface IInstruction {
    id: string;
    name: string;
    html: string;
}

export interface InstructionsState {
    currentId: string
    instructions: IInstruction[]
}

export const state = (): InstructionsState => ({
    currentId: "",
    instructions: []
})

export const MutationType = {
    OF: 'of',
    SET_CURRENT_ID: "setCurrentId"
}

export const mutations: MutationTree<InstructionsState> = {
    [MutationType.OF]: (state, data: IInstruction[]) => { state.instructions = data },
    [MutationType.SET_CURRENT_ID]: (state, id: string) => { state.currentId = id }
}

export const actions: ActionTree<InstructionsState, InstructionsState> = {
    async requestInstructions({ commit, state }, _context: string) {
        try {
            if (state.instructions.length == 0) {
                const data = await this.$api.getKnoweldge()
                commit("of", data)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
