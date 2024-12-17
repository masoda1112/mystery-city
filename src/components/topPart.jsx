const TopPart = (props) => {
    return (
        <div className='part'>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <div className='images'>
                <div className='image-wrap'>
                    <div className='image first-image loc_1'></div>
                </div>
                <div className='image-wrap'>
                    <div className='image second-image loc_2'></div>
                </div>
            </div>
        </div>
    )
}

export default TopPart