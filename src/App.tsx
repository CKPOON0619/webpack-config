import * as React from "react"

const App = () => {
    // This to test react-refresh
    const [clickState,setClickState]=React.useState<boolean>(false)
    const handleAppClick=React.useCallback(()=>setClickState(!clickState),[clickState])
    return (
        <div onClick={handleAppClick}>
            {clickState?"App":"App~~~p"}
        </div>
    )
}

export default App