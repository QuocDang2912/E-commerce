import React from 'react'
import { Link } from 'react-router-dom';

export default function Pagination({ totalPage, currentPage, basePath }) {

    let currentPageInt = parseInt(currentPage)


    if (isNaN(currentPageInt)) {

        currentPageInt = 1;
    }




    let allLi = [];
    // trang đầu
    if (currentPageInt !== 1) {
        allLi.push(
            <li>
                <Link to={basePath + 1}>
                    First
                </Link>
            </li>
        )
    }
    if (currentPageInt > 1) {
        allLi.push(
            <li>
                <Link to={basePath + (currentPageInt - 1)}>
                    PRE
                </Link>
            </li>
        )
    }
    //  xuất ra  5 trang nhỏ hơn trang hiện tại
    for (let i = currentPageInt - 5; i <= currentPageInt - 1; i++) {
        if (i >= 1) {
            allLi.push(
                <li>
                    <Link to={basePath + 1}>
                        {i}
                    </Link>
                </li>
            )
        }

    }
    // trang hiện tại
    allLi.push(
        <li>
            <Link style={{ color: 'red' }} to={basePath + currentPageInt}>
                {currentPageInt}
            </Link>
        </li>
    )
    // xuất ra 5 trang sau trang hiện tại
    for (let i = 1 + currentPageInt; i <= 5 + currentPageInt; i++) {
        if (i <= totalPage) {
            allLi.push(
                <li>
                    <Link to={basePath + i}>
                        {i}
                    </Link>
                </li>
            )
        }
    }
    // xuất ra trang kế tiếp
    if (currentPageInt < totalPage) {
        allLi.push(
            <li>
                <Link to={basePath + (currentPageInt + 1)}> Next</Link>
            </li>
        )
    }
    // link đến trang cuối
    if (currentPageInt !== totalPage) {
        allLi.push(
            <li>
                <Link to={basePath + totalPage}>
                    Last
                </Link>
            </li>
        )
    }
    return (
        <div className="pagination pagination-centered">
            <ul>
                {allLi}
            </ul>
        </div>

    )
}
