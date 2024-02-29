/* Ham validate email*/
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
/* Ham validate password*/
export const validatePassword = (password) => {
    var errPassMsg = "";
    var lowerCaseLetters = /[a-z]/g;
    if (!password.match(lowerCaseLetters)) errPassMsg += " Password phải có ít nhất 1 ký tự thường <br/>"


    var upperCaseLetters = /[A-Z]/g;
    if (!password.match(upperCaseLetters)) errPassMsg += " Password phải có  ít nhất 1 ký tự hoa <br/>"
    var numbers = /[0-9]/g;
    if (!password.match(numbers)) errPassMsg += " Password phải có ít nhất 1 số <br/>"


    if (password.length <= 8) errPassMsg += " Password phài ít nhất 8 ký tự <br/>"


    return errPassMsg;
};
export const validateProduct = (data) => {
    var errPassMsg = "";
    if (data.productName === '') errPassMsg += 'Bạn cần nhập tên sản phẩm <br />'
    if (data.category === '') errPassMsg += 'Bạn cần nhập category <br />'
    if (data.price === '') errPassMsg += 'Bạn cần nhập giá sản phẩm <br />'
    if (data.price < 0 || data.price > 1000000) errPassMsg += 'Giá sale phải nhỏ hơn giá sản phẩm <br/>'
    if (data.description === '') errPassMsg += 'Bạn cần chọn một Brand <br />'
    // if (data.image[0] === '') errPassMsg += 'Bạn cần hai  hình sản<br />'
    // if (data.image[1] === '') errPassMsg += 'Bạn cần hai  hình sản <br />'
    return errPassMsg;
}