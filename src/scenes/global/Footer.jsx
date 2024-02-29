import React from 'react'
import FooterBox from './FooterBox'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="row-fluid">

                <FooterBox />
                <FooterBox />
                <FooterBox />
                <div className="span6">
                    <h5>The standard chunk of Lorem</h5>
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
                    those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                    Malorum" by Cicero are also reproduced in their exact original form,
                    accompanied by English versions from the 1914 translation by H. Rackham.
                </div>
            </div>
        </footer>

    )
}
