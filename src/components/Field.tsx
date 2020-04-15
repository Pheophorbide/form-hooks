import * as React from 'react';
import {memo, FC} from 'react';
import classnames from 'classnames';
import {InputInterface} from "./Input";
import {Input} from "./Input";

interface FieldInterface extends InputInterface{
    className?: string,
    Component?: React.ComponentType,
    mask?: string,
    label: string,
    form: {
        isValid: boolean,
        isClear: boolean,
        onChange: (e) => void,
        errors: {string} | {}
    }
}

const FieldComp: FC<FieldInterface> = (
    {
        label,
        Component = Input,
        className,
        placeholder,
        mask,
        type,
        readOnly,
        name,
        form
    }
) => {
    const {onChange, errors} = form;

    return (
        <div className={classnames(className)}>
            <label className={"form__label"}>
                {label}
            </label>
            <div className={classnames(classnames("form__field", readOnly ? "form__field_readonly" : ""))}>
                <Component
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={onChange}
                    mask={mask}
                    type={type}
                    defaultValue={""}
                    readOnly={readOnly}
                />
            {errors[name] && <span className={"form__error"}>{errors[name]}</span>}
            </div>
        </div>
    )
};

export const Field = memo(FieldComp);