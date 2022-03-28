
import type { MutationTree } from 'vuex'

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

