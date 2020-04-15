import * as React from 'react';
import {forwardRef, memo} from 'react';
import * as InputMask from 'react-input-mask';
import {Input, InputInterface} from './Input';

interface MaskedInputProps extends InputInterface{
    mask: string,
    value: string | number | null,
    onChange: (e) => void | Promise<void>,
    onFocus?: (e) => void | Promise<void>,
}

const MaskedInputComp: React.FC<MaskedInputProps> = forwardRef((props, ref) => {
    return (
        <InputMask {...props}
        >
            {inputProps => (
                <input
                    {...inputProps}
                    ref={ref}
                />
            )}
        </InputMask>
    );
});

export const MaskedInput = memo(MaskedInputComp);
