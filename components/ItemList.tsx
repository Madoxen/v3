import React from 'react'
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import EditDialog from './EditDialog';
import ItemRow, { RowData } from './ItemRow';

const styles = StyleSheet.create({
    containerStyle:
    {
        margin: 10,
    }
});

interface IProps {
    data: [];
    collectionID: string,
    onRowLongPress: (params: RowData) => void,
}

const ItemList: React.FC<IProps> = (props) => {

    return (
        <View>
            <FlatList style={styles.containerStyle} data={props.data} renderItem={({ item }) => <ItemRow collectionID={props.collectionID} onLongPress={props.onRowLongPress} id={item.key} {...item}></ItemRow>}>
            </FlatList>
        </View>

    );

}
export default ItemList;