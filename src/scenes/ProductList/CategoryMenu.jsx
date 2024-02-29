import React from 'react'
import { Link } from 'react-router-dom'

export default function CategoryMenu({ category, handleFilterByCategory }) {
    let view = category.map(cate => (
        <li key={cate.id}>

            <Link onClick={handleFilterByCategory} to='/product' >{cate.attributes.categoryName}</Link>
        </li>
    ))
    return (
        <div className="well well-small">
            <nav className="megamenu">
                <ul className="nav nav-list">
                    <li >
                        <Link onClick={handleFilterByCategory} to='/product' >All Category</Link>
                    </li>
                    {
                        view
                    }
                </ul>
            </nav>
        </div>

    )
}
