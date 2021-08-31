function MultiChoice(props){
    return (
        <select name={props.name} id={props.name}>
        {props.options.map((option,key)=>{
            return (
                <option key={key} value={option}>{option}</option>
            )
        })}
        </select>
    )
}

export {MultiChoice};