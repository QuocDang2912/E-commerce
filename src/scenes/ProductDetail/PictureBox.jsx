import React from 'react'
import { AppUrl } from '../../Api/AppUrl'

export default function PictureBox({ image }) {
    let myView = image.map((img, key) => {
        if (key === 0) return (
            <div className="item active">
                <a href="#st"> <img src={AppUrl.ImageUrl + img.attributes.url} alt='tam' style={{ width: '100%' }} /></a>
            </div>
        )
        else return (
            <div div className="item" >
                <a href="#st"> <img src={AppUrl.ImageUrl + img.attributes.url} alt='tam' style={{ width: '100%' }} /></a>
            </div >
        )


    })
    return (
        <div id="myCarousel" className="carousel slide cntr">
            <div className="carousel-inner">
                {myView}

            </div>
            <a className="left carousel-control" href="#myCarousel" data-slide="prev">‹</a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">›</a>
        </div>

    )
}
