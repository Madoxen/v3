import { types } from '@babel/core';

import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, Image, Text } from 'react-native';
import { Checkbox, FAB, Portal } from 'react-native-paper';
import ItemList from '../components/ItemList';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AddDialog from '../components/AddDialog';
import EditDialog from '../components/EditDialog';
import { RowData } from '../components/ItemRow';

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})


//TODO: callbacks and shit props
//TODO: FAB onPress change scene to Add Item View
//TODO: Hook up to firebase 
const FirebaseListScene: React.FC<any> = ({ route, navigation }) => {

    const currentUser = auth().currentUser;
    const [listData, setListData] = useState<any>([]);
    const collectionRef = firestore().collection("users").doc(currentUser?.uid).collection(route.params.collectionName);
    const [isAddDialogOpened, setIsAddDialogOpened] = useState<boolean>(false);
    const [isEditDialogOpened, setIsEditDialogOpened] = useState<boolean>(false);
    const [startingDialogState, setStartingDialogState] = useState<RowData>(
        {
            title: "",
            desc: "",
            isSeen: false,
            id: ""
        }
    );

    //setup
    useEffect(() => {
        const sub = collectionRef.onSnapshot(querySnapshot => {
            const users: any[] = [];

            querySnapshot.forEach(documentSnapshot => {
                users.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setListData(users);
            //setLoading(false);
        });
        return () => sub();
    }, []);


    const hideDialog = () => setIsAddDialogOpened(false);
    const showDialog = () => setIsAddDialogOpened(true);
    const onAddPressed = async (title: string, desc: string, isSeen: boolean) => {
        const docRef = await collectionRef.add({ title, desc, isSeen });
    };

    const onLongRowClick = (params: RowData) => {
        console.log(params)
        setStartingDialogState(params)
        setIsEditDialogOpened(true)
    };

    const onEditPressed = (params: RowData) => {
        firestore()
        collectionRef.doc(params.id)
            .update({
                title: params.title,
                desc: params.desc,
                isSeen: params.isSeen,
            });

    };
    const OnDeletePressed = async (params: RowData) => {
        collectionRef.doc(params.id).delete();
    };


    return (
        <View style={{ flex: 1 }}>
            <Text>{ }</Text>
            <ItemList onRowLongPress={onLongRowClick} collectionID={route.params.collectionName} data={listData}></ItemList>
            <FAB onPress={() => { showDialog() }} style={styles.fab} icon="plus"></FAB>
            <AddDialog showDialog={showDialog} hideDialog={hideDialog} visible={isAddDialogOpened} OnAddPressed={onAddPressed}></AddDialog>
            <EditDialog startingState={startingDialogState}
                showDialog={() => setIsEditDialogOpened(true)}
                hideDialog={() => setIsEditDialogOpened(false)}
                visible={isEditDialogOpened} OnDeletePressed={OnDeletePressed}
                OnEditPressed={onEditPressed} ></EditDialog>
        </View>
    );

}
export default FirebaseListScene;