import React from 'react'

export default function Checkout() {
    return (
        <div>
            <table classname="table table-bordered">
                <tbody>
                    <tr><td>ESTIMATE YOUR SHIPPING &amp; TAXES</td></tr>
                    <tr>
                        <td>
                            <form classname="form-horizontal">
                                <div classname="control-group">
                                    <label classname="span2 control-label">Name</label>
                                    <div classname="controls">
                                        <input type="text" placeholder="Name" />
                                    </div>
                                </div>
                                <div classname="control-group">
                                    <label classname="span2 control-label">address</label>
                                    <div classname="controls">
                                        <input type="text" placeholder="Address" />
                                    </div>
                                </div>
                                <div classname="control-group">
                                    <label classname="span2 control-label">phone</label>
                                    <div classname="controls">
                                        <input type="text" placeholder="Phone" />
                                    </div>
                                </div>
                                <div classname="control-group">
                                    <div classname="controls">
                                        <button type="submit" classname="shopBtn">Click checkout</button>
                                    </div>
                                </div>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
