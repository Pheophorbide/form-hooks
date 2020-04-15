import * as React from 'react';
import {FC, memo, ReactNode} from 'react';
import classnames from 'classnames';
import {Colors} from "../config/colors";

interface ButtonInterface {
    children?: string | ReactNode,
    color?: Colors,
    onClick?: () => void | Promise<void>
    outline?: boolean,
    type?: "submit" | "button",
    disabled?: boolean,
    className?: string
}

const ButtonComp: FC<ButtonInterface> = (
    {
        children,
        color = Colors.secondary,
        onClick,
        outline = false,
        type = "button",
        disabled = false,
        className
    }) => {
    return (
        <button
            className={classnames(
                "button",
                `button_${color}`,
                outline ? "button_outline" : "",
                disabled ? "button_disabled" : "",
                className
            )}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
};

export const Button = memo(ButtonComp);
