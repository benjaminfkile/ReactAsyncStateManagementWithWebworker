import { Component } from 'react'
import stateService from '../StateManagement/StateService'
import ClassComponentTypes from './ClassComponentTypes'


class ClassComponent extends Component {

    // Initialize state
    state = {
        classState: stateService.state.classComponentState
    }

    // Method to update state based on new data from the state service
    handleUpdate = (newState: ClassComponentTypes) => {
        this.setState({ classState: newState })
    }

    componentDidMount() {
        // Subscribe to state updates
        stateService.subscribe('classComponentState', this.handleUpdate)
    }

    componentWillUnmount() {
        // Unsubscribe to avoid memory leaks
        stateService.unsubscribe('classComponentState', this.handleUpdate)
    }

    render() {

        console.log("ClassComponent rendered", this.state.classState)

        const { ccCount } = this.state.classState
        const { updateState } = stateService
        return (
            <div>
                {`Class Component count: ${ccCount}`}
                <br></br>
                <button onClick={() => updateState('classComponentState', [{ key: 'ccCount', value: this.state.classState.ccCount + 1 }])}>ccCount ++</button>
                <br></br>
                <button onClick={() => updateState('classComponentState', [{ key: 'ccCount', value: this.state.classState.ccCount - 1 }])}>ccCount --</button>
            </div>
        )
    }
}

export default ClassComponent
