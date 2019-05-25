module.exports = {
    Sequencer: (modules = [], callback, data = {}) => {

        if(!Array.isArray(modules) || typeof data != 'object') throw new Error('Wrong Parameter')

        return (async ()=>{
            let sequenceNumber = 0
            async function Sequencer(module){

                let isSequenceSuccess = true
                let sequenceResult = undefined
                try{
                    sequenceNumber++
                    if(typeof(module['default']) != 'undefined'){
                        sequenceResult = await module.default(data)
                    }else{
                        sequenceResult = await module(data)
                    }
                }catch(e){
                    isSequenceSuccess = false
                }

                if(typeof(callback) == 'function') {
                    const isEndOfSequence = modules.length == sequenceNumber
                    let callbackResult = await callback({
                        sequenceNumber,
                        sequenceResult,
                        isSequenceSuccess,
                        isEndOfSequence
                    })

                    if(isEndOfSequence || !isSequenceSuccess) return callbackResult
                    return false
                }
            }

            for(let module of modules){
                let sequencerResult = await Sequencer(module)
                if(sequencerResult) return sequencerResult
            }

            if(modules.length == 0){
                return await callback({
                    sequenceNumber: 0,
                    sequenceResult: undefined,
                    isSequenceSuccess: true,
                    isEndOfSequence: true
                })
            }
        })()
    },

    Sequence: (callback)=>{
        return (data)=>{
            return new Promise((resolve, reject)=>{
                if(typeof(callback) == 'function')
                    return callback({data, resolve, reject})
            })
        }
    }
}