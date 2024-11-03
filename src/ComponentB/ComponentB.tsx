// ComponentB.tsx
import { FunctionComponent, useEffect, useState } from 'react'
import stateService from '../StateManagement/StateService'
import ComponentBTypes from './ComponentBTypes'

const ComponentB: FunctionComponent = () => {

    const { updateState, manageSubscriptionAndStateUpdate } = stateService
    const [state, setState] = useState<ComponentBTypes>(stateService.state.componentBState)

    useEffect(() => {
        manageSubscriptionAndStateUpdate(setState, "componentBState")
    }, [])

    console.log("ComponentB rendered", state)

    return (
        <div className="ComponentB">
            {`B count: ${state.bCount}`}
            <br></br>
            <button onClick={() => updateState("componentBState", [{ key: "bCount", value: state.bCount + 1 }])}>aCount ++</button>
            <br></br>
            <button onClick={() => updateState("componentBState", [{ key: "bCount", value: state.bCount - 1 }])}>aCount --</button>
            <br></br>
            <br></br>
        </div>
    )
}

export default ComponentB