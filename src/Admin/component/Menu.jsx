import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="../index3.html" className="brand-link">
                <img src="/admin/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item menu-is-opening menu-open">
                            <a href="#st" className="nav-link">
                                <i className="nav-icon fas fa-table" />
                                <p>
                                    Quan Ly
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview" style={{ display: 'block' }}>
                                <li className="nav-item">
                                    <Link to="/admin/product" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Quản lý product</p>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>

    )
}
