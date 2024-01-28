
export const Card = ({children, handleClick}) => {
    return (
        <div className="card" onClick={handleClick}>{children}</div>
    )
}


