export default function Stack(){
    const style = {
        display: "flex",
        gap: `${spacing * 0.25} rem`,
        flexWrap: wrap ? "wrap" : "nowrap",
        flexDirection: direction
    }
    
    return (
        <div style={style} >
            {children}
        </div>    
    )
}