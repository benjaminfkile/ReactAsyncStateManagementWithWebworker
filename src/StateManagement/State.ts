// Imports states from different components to combine them into a single state object.

import appState from "../App/AppState"
import classComponentState from "../ClassComponent/ClassComponentState"
import componetAState from "../ComponentA/ComponetAState"
import componentBState from "../ComponentB/ComponetBState"

const state = {
    appState: appState,
    componetAState: componetAState,
    componentBState: componentBState,
    classComponentState: classComponentState
}

export default state