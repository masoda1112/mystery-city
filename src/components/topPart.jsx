const TopPart = ({name}) => {
    const explanation ={
        go: {title: 'Go', explain: 'Reach out for more information.'},
        solve: {title: 'Solve', explain: 'Reach out for more information.'}
    }
    return (
        <div className='part'>
            <h2>{explanation[name].title}</h2>
            <p>{explanation[name].explain}</p>
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