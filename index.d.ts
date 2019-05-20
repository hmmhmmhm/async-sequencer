declare module 'async-sequencer' {

    const main: {
        Sequencer: (
            modules: ((data) => void)[], 
            callback: (result: {
                sequenceNumber: number
                sequenceResult: any
                isSequenceSuccess: boolean
                isEndOfSequence: boolean
            }) => void,
            data?) => void

        Sequence: (
            callback: (option: {
                resolve: (result?: any) => void
                reject: (result?: any) => void
                data
            }) => void ) => void
    }

    export = main
}