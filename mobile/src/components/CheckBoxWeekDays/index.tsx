import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { styles } from './styles';

interface OptionsProps {
    id: number;
    text: string;
    value: string;
}

export type CheckBoxProps = {
    options: Array<OptionsProps>,
    onChange: any;
    multiple: boolean;
}

export function CheckBoxWeekDays({ options, onChange, multiple = false, ...rest }: CheckBoxProps) {
    const [selected, setSelected] = useState([]);

    function toggle(value: string) {
        let index = selected.findIndex(i => i === value);
        let arrSelected = [...selected]

        if (index !== -1) {
            arrSelected.splice(index, 1);
        } else {
            arrSelected.push((value));
        }
        setSelected(arrSelected);
    }

    useEffect(() => onChange(selected), [selected])

    return (
        <View style={styles.container}>
            {options.map((op, index) => (
                <View key={op.id} style={styles.days}>
                    <TouchableOpacity
                        style={
                            selected.findIndex(i => i === op.value) !== -1
                                ? styles.checked
                                : styles.touchable
                        }
                        onPress={() => toggle(op.value)}
                        {...rest}
                    >
                    <Text style={styles.title}>{op?.text}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}