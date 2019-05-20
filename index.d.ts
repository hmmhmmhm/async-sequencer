declare module 'async-sequencer' {

    const main: {
        Sequencer: (
            modules: ((data) => void)[], 
            callback: (result: {
                sequenceNumber: number
                isSequenceSuccess: boolean
                isEndOfSequence: boolean
            }) => void,
            data?) => void

        Sequence: (
            option: {
                resolve: () => void
                reject: () => void
                data
            }) => void
    }

    export = main
}