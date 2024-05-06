// App.tsx

import { FunctionComponent, useEffect, useState } from "react"
import ComponentA from "../ComponentA/ComponentA"
import ComponentB from "../ComponentB/ComponentB"
import stateService from "../StateManagement/StateService"
import AppTypes from "./AppTypes"
import ClassComponent from "../ClassComponent/ClassComponent"

const App: FunctionComponent<{}> = () => {
  // Destructure the updateState and manageSubscriptionAndStateUpdate functions from stateService
  const { updateState, manageSubscriptionAndStateUpdate } = stateService

  // State hook to maintain and display the appState locally within the component
  const [state, setState] = useState<AppTypes>(stateService.state.appState)

  // useEffect to set up state subscriptions when the component mounts
  useEffect(() => {
    // Calls manageSubscriptionAndStateUpdate to handle state updates from stateService
    // This function subscribes to the 'appState' updates and sets local state accordingly
    const unsubscribe = manageSubscriptionAndStateUpdate(setState, "appState")

    // Cleanup function to unsubscribe from state updates when the component unmounts
    return () => {
      unsubscribe()
    }
  }, []) // Empty dependency array ensures this effect runs only once after the initial render

  console.log("App rendered", state)

  return (
    <div className="App">
      {/* Display the current count from the app state */}
      {`appCount ${state.appCount}`}
      <br></br>
      {/* Button to increment the appCount */}
      {/* Calls updateState with the new value to be set for appCount */}
      <button onClick={() => updateState("appState", [{ key: "appCount", value: state.appCount + 1 }])}>
        appCount ++
      </button>
      <br></br>
      {/* Button to decrement the appCount */}
      {/* Each click will call updateState, decreasing the appCount by 1 */}
      <button onClick={() => updateState("appState", [{ key: "appCount", value: state.appCount - 1 }])}>
        appCount --
      </button>
      <br></br>
      <br></br>
      {/* Including ComponentA and ComponentB which may use similar patterns for state management */}
      <ComponentA />
      <br></br>
      <ComponentB />
      <br></br>
      <ClassComponent/>
    </div>
  )
}

/*
How updateState Works
When you call updateState("appState", [{ key: "appCount", value: state.appCount + 1 }]) from a component:

"appState" tells updateState that the changes are to be applied to the appState segment of the overall state managed by stateService.
[{ key: "appCount", value: state.appCount + 1 }] is an array containing one object specifying that the appCount property of appState should be incremented by 1.
This setup allows for a dynamic and flexible approach to state management, where components can request updates to specific parts of the state as needed, without affecting or even knowing about other parts of the state.

Example Usage
When you click the button in the App.tsx to increase the appCount, it effectively communicates this change request to the stateService, which then:

Applies the mutation to the current state using the mutate function.
Sets the new state in the stateService.
Uses the webWorker to potentially handle more complex or asynchronous state transformations or to offload processing from the main thread.
Notifies all components subscribed to the appState changes that there has been an update, prompting them to re-render with the new state if necessary.
This method ensures that your state changes are centrally managed and efficiently propagated throughout your React application, maintaining consistency and reactivity.
*/

export default App
