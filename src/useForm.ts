import {useState, useEffect} from 'react';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type SchemeValidationMap = Map<string, boolean>;
type CustomValidationMap = Map<string, { callback: (value) => boolean, msg: string }>

type SchemeType = {
    required?: SchemeValidationMap,
    phone?: SchemeValidationMap,
    email?: SchemeValidationMap,
    custom?: CustomValidationMap
}

enum ValidationField {
    required = 'Поле не может быть пустым',
    phone = 'Введите корректный номер телефона',
    email = 'Введите корректный адресс электронной почты'
}

export function useForm(callback, schema?: SchemeType) {
    const [inputs, setInputs] = useState({});
    const [errors, setError] = useState({});
    const [isClear, setIsClear] = useState(true);
    const [isValid, setIsValid] = useState(false);

    const errorLength = Object.keys(errors).length;

    useEffect(() => {
        if (!schema) {
            setIsValid(true)
        }
    }, []);

    useEffect(() => {
        if (isClear) return;
        setIsValid(errorLength === 0)
    }, [errorLength]);

    function requiredValidation(name, value) {
        const updateErrors = {...errors};

        if (value.length === 0) {
            setError({...updateErrors, [name]: ValidationField.required});
        } else {
            delete updateErrors[name];
            setError(updateErrors);
        }
    }

    function phoneValidation(name, value) {
        if (value.length === 0) return;
        const updateErrors = {...errors};

        if (value.length < 11) {
            setError({...updateErrors, [name]: ValidationField.phone})
        } else {
            delete updateErrors[name];
            setError(updateErrors);
        }
    }

    function mailValidation(name, value) {
        if (value.length === 0) return;
        const updateErrors = {...errors};

        if (!EMAIL_REGEXP.test(value)) {
            setError({...updateErrors, [name]: ValidationField.email})
        } else {
            delete updateErrors[name];
            setError(updateErrors);
        }
    }

    function customValidation({callback, msg}, name, value) {
        if (value.length === 0) return;

        const updateErrors = {...errors};

        if (callback(value)) {
            setError({...updateErrors, [name]: msg})
        } else {
            delete updateErrors[name];
            setError(updateErrors);
        }
    }

    function onChangeValidation(name, value) {
        if (schema.required && schema.required.has(name)) {
            requiredValidation(name, value);
        }

        if (schema.phone && schema.phone.has(name)) {
            phoneValidation(name, value);
        }

        if (schema.email && schema.email.has(name)) {
            mailValidation(name, value);
        }

        if (schema.custom && schema.custom.has(name)) {
            customValidation(schema.custom.get(name), name, value)
        }
    }

    function submitValidation(errorsObj) {
        const updateErrors = {...errors};

        for (let key in errorsObj) {
            if (errorsObj.hasOwnProperty(key)) {
                updateErrors[key] = errorsObj[key]
            }
        }

        setError(updateErrors);
    }

    function onChange({name, value}) {
        setIsClear(false);

        if (schema) {
            onChangeValidation(name, value);
        }

        setInputs({...inputs, [name]: value})
    }

    async function onSubmit(e) {
        e.preventDefault();

        try {
            await callback(inputs);
        } catch (e) {
            console.error(e);
            submitValidation(e);
        }
    }

    return {
        form: {
            isValid,
            isClear,
            onChange,
            inputs,
            errors
        },
        onSubmit
    }
}