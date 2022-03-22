import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
    name: 'instructions',
    stateFactory: true,
    namespaced: true,
})
export default class MyModule extends VuexModule {
    currentId: string
    instructions: IInstruction[]

    @Mutation
    push(data: IInstruction) {
        this.instructions.push(data)
    }

    @Mutation
    of(data: IInstruction[]) {
        this.instructions = data
    }

    @Mutation
    setCurrentId(id: string) {
        this.currentId = id
    }
}

//TODO: export from "types"
export interface IInstruction {
    id: string;
    name: string;
    html: string;
}

