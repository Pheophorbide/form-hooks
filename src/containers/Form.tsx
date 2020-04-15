import * as React from "react";
import {FC, memo} from "react";
import {Field} from "../components/Field";
import {Button} from "../components/Button";
import {Colors} from "../config/colors";
import {useForm} from "../useForm";

interface FormInterface {
    title: string
}

const scheme = {
    required: new Map([['name', true], ['phone', true]]),
    phone: new Map([['phone', true]]),
    email: new Map([['email', true]]),
    custom: new Map([['name', {
        callback: (value) => {
            return value.length < 7
        }, msg: 'Поле не моежт быть меньше 7 символов'
    }]])
};

const FormComp: FC<FormInterface> = ({title}) => {
    const {form, onSubmit} = useForm(onHandleSubmit, scheme);
    const {isValid} = form;

    function onHandleSubmit(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject({name: 'Неправильное имя пользователя', email: 'Неверный адрес электронной почты'})
            }, 1000)
        })
    }

    return (
        <form className={"form"} onSubmit={onSubmit}>
            <div className={"form__title"}>
                <h2>{title}</h2>
            </div>
            <div className={"form__content"}>
                <Field
                    label={"Имя"}
                    name={"name"}
                    placeholder={"Введите имя"}
                    form={form}
                />
                <Field
                    label={"Номер телефона"}
                    name={"phone"}
                    mask={"+7(999) 999-99-99"}
                    placeholder={"Введите номер телефона"}
                    form={form}
                />
                <Field
                    label={"Электронная почта"}
                    name={"email"}
                    placeholder={"Введите электронную почту"}
                    form={form}
                />
            </div>
            <div className={"form__footer"}>
                <Button
                    className={"form__button"}>
                    Отмена
                </Button>
                <Button
                    color={Colors.success}
                    className={"form__button"}
                    type={"submit"}
                    disabled={!isValid}
                >
                    Сохранить
                </Button>
            </div>
        </form>
    )
};

export const Form = memo(FormComp);