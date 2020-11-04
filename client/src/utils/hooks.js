import { useState } from "react";

export const useForm = (callback, inititalState = {}) => {
    const [values, setValue] = useState(inititalState);
    const onChange = (event) => {
        setValue({ ...values, [event.target.name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        values,
    };
};
