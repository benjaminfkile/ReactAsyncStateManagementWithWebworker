// ComponentA.tsx
import { FunctionComponent, useEffect, useState } from 'react'
import stateService from '../StateManagement/StateService'
import ComponentATypes from './ComponentATypes'

const ComponentA: FunctionComponent = () => {
    const { updateState, manageSubscriptionAndStateUpdate } = stateService
    const [state, setState] = useState<ComponentATypes>(stateService.state.componetAState)

    useEffect(() => {
        manageSubscriptionAndStateUpdate(setState, "componentAState")
    }, [])

    console.log("ComponentA rendered", state)

    return (
        <div className="ComponentA">
            {`A count: ${state.aCount}`}
            <br></br>
            <button onClick={() => updateState("componentAState", [{ key: "aCount", value: state.aCount + 1 }])}>aCount ++</button>
            <br></br>
            <button onClick={() => updateState("componentAState", [{ key: "aCount", value: state.aCount - 1 }])}>aCount --</button>
            <br></br>
            <br></br>
        </div>
    )
}

export default ComponentA
