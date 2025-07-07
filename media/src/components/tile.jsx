function Tile({image, description, name}) {
    return (
        <div className="tile">
            <img src={image} alt={description} className="tile-image"></img>
            <div className="tile-text">
                <p className="tile-description">{description}</p>
                <hr className="tile-hr"></hr>
                <p className="tile-name"> ~ {name}</p>
            </div>
        </div>
    );
}

export default Tile;
