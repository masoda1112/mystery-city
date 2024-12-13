const TopPop = ({ component: Component, state , setState}) => {
    const close = () => {
        setState(false)
    }
    return (
        <div className={`pop ${state ? 'shown' : ''}`}>              
            <div className="pop-content signup-pop-content">
                <div className="close-button-wrap" onClick={close}>
                    <p className='close-button'>×</p>
                </div>      
                <Component />
            </div>
        </div>
    )
}

export default TopPop