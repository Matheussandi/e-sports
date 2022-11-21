import { Check } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';


interface OptionsProps {
    text: string;
    id: number;
}

interface Props {
    options: Array<OptionsProps>,
    onChange: any;
}

export function CheckBox({ options, onChange }: Props) {
    const [selected, setSelected] = useState([]);

    function toggle(id: number) {
        let index = selected.findIndex(i => i === id);
        let arrSelected = [...selected]

        if (index !== -1) {
            arrSelected.splice(index, 1);
        } else {
            arrSelected.push(id);
        }

        setSelected(arrSelected);
    }

    useEffect(() => onChange(selected), [selected])

    return (
        <View>
            {options.map((op, index) => (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => toggle(op.id)}
                    >
                        {
                            selected.findIndex(i => i === op.id) !== -1
                            ? <Check size={20} color={"#3EDB93"} />
                            : null
                        }
                    </TouchableOpacity>

                    <Text style={styles.title}>{op?.text}</Text>
                </View>
            ))}
        </View>
    );
}