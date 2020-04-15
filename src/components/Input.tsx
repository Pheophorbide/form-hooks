import * as React from 'react';
import {memo, FC, useState, useEffect} from 'react';
import {MaskedInput} from "./MaskedInput";
import classnames from 'classnames';

export interface InputInterface {
    name: string,
    placeholder?: string,
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'hidden',
    className?: string,
    readOnly?: boolean,
    mask?: string,
}

interface InputComponentInterface extends InputInterface {
    defaultValue: number | string | null,
    onChange: (e) => void | Promise<void>,
    onFocus: (e) => void | Promise<void>,
}

const InputComp: FC<InputComponentInterface> = (
    {
        placeholder,
        mask,
        readOnly,
        name,
        onChange,
        onFocus,
        defaultValue,
        type
    }) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    function onHandleChange(e) {
        onChange({name: e.target.name, value: e.target.value});
        setValue(e.target.value);
    }

    function onMaskedHandleChange(e) {
        onChange({name: e.target.name, value: e.target.value.replace(/\D/g, '')});
        setValue(e.target.value);
    }

  return (
      mask ?
          <MaskedInput
              name={name}
              className={"form__input"}
              placeholder={placeholder}
              onChange={onMaskedHandleChange}
              onFocus={onMaskedHandleChange}
              value={value}
              mask={mask}
              readOnly={readOnly}
          />
          : <input
              name={name}
              className={classnames("form__input", readOnly ? "form__input_readonly" : "")}
              placeholder={placeholder}
              onChange={onHandleChange}
              onFocus={onHandleChange}
              type={type}
              value={value}
              readOnly={readOnly}
          />
  )
};

export const Input = memo(InputComp);