import { Text } from 'react-native';
import React from 'react';

import { Control, Controller, FieldError } from "react-hook-form";

import { CheckBoxProps, CheckBoxWeekDays } from '../CheckBoxWeekDays';

import { styles } from './styles';

type Props = CheckBoxProps & {
    control: Control<any>;
    name: string;
    error?: FieldError;
}

export function ControlledCheckBoxWeekDays({ control, name, error, ...rest }: Props) {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={() => (
                    <CheckBoxWeekDays
                        {...rest}
                    />
                )}
            />

            {
                error && <Text style={styles.error}>{error.message}</Text>
            }
        </>
    );
}