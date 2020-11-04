module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username cannot be empty.";
    }
    if (email.trim() === "") {
        errors.email = "Email cannot be empty.";
    } else {
        const regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        if (!email.match(regEx)) {
            errors.email = "Email must be a valid email address.";
        }
    }
    if (password === "") {
        errors.password = "Password cannot be empty.";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Password must match.";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username cannot be empty.";
    }
    if (password.trim() === "") {
        errors.password = "Password cannot be empty.";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
