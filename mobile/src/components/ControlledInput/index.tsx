import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Input, InputProps } from "../Input";

import { Text } from 'react-native';

import { styles } from './styles';

type Props = InputProps & {
    control: Control<any>;
    name: string;
    error?: FieldError;
}

export function ControlledInput({ control, name, error, ...rest }: Props) {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
            />

            {
                error && <Text style={styles.error}>{error.message}</Text>
            }

        </>
    )
}