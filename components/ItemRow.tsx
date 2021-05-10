import React, { useEffect } from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Checkbox, Divider, Text } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import EditDialog from './EditDialog';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        width: "100%",
    },
});

interface IProps {
    title: string,
    desc: string,
    isSeen: boolean,
    id: string,
    collectionID: string,
    onLongPress: (params: RowData) => void,
}

export interface RowData
{
    title: string,
    desc: string,
    isSeen: boolean,
    id: string,
}

//TODO: callbacks and shit props
const ItemRow: React.FC<IProps> = (props) => {
    const [checked, setChecked] = React.useState(props.isSeen);


    useEffect(() => { 
        setChecked(props.isSeen);
    }, [props])

    const updateChecked = async (value: boolean) => {
        await firestore()
            .collection('users')
            .doc(auth().currentUser?.uid).collection(props.collectionID)
            .doc(props.id)
            .update({
                isSeen: value,
            });
        setChecked(value);
    }


    return (
        <TouchableWithoutFeedback onLongPress={() => props.onLongPress({
            title: props.title, desc: props.desc, isSeen: checked, id: props.id })} >
            <View>
                <View style={styles.containerStyle}>
                    <View style={{ flex: 1, alignSelf: "flex-start", flexDirection: "column" }}>
                        <Text style={{ flex: 1, }}>{props.title}</Text>
                        <Text style={{ flex: 1, color: "#777777", fontSize: 11 }}>{props.desc}</Text>
                    </View>

                    <View style={{ alignSelf: "flex-end" }}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                updateChecked(!checked);
                            }} />
                    </View>
                </View>
                <Divider style={{ backgroundColor: "#000000" }}></Divider>
            </View>
        </TouchableWithoutFeedback>


    );

}
export default ItemRow;