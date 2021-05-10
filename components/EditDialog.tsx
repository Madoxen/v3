import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, Dialog, Paragraph, Portal, Switch, TextInput } from "react-native-paper";
import { RowData } from "./ItemRow";


interface IProps {
    OnEditPressed: (params: RowData) => void,
    OnDeletePressed: (params: RowData) => void,
    visible: boolean,
    hideDialog: () => void,
    showDialog: () => void,
    startingState: RowData
}

const EditDialog: React.FC<IProps> = (props) => {

    const [description, setDescription] = React.useState<string>(props.startingState.desc);
    const [title, setTitle] = React.useState<string>(props.startingState.title);
    const [isSeen, setIsSeen] = React.useState<boolean>(props.startingState.isSeen);

    const onToggleSwitch = () => setIsSeen(!isSeen);

    useEffect(() => {
        setDescription(props.startingState.desc)
        setTitle(props.startingState.title)
        setIsSeen(props.startingState.isSeen)
    }, [props])


    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={() => props.hideDialog()}>
                <Dialog.Title>Update Item</Dialog.Title>
                <Dialog.Content>
                    {/* {Title} */}
                    <TextInput
                        label="Title"
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                    {/* {Description} */}
                    <TextInput
                        multiline={true}
                        label="Description"
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                    {/* {Switch} */}
                    <View>
                        <Paragraph>{isSeen ? `Seen` : `Unseen`}</Paragraph>
                        <Switch value={isSeen} onValueChange={onToggleSwitch} />
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => {
                        if (props.OnEditPressed !== undefined)
                            props.OnEditPressed({title: title, desc: description, isSeen: isSeen, id: props.startingState.id});
                        props.hideDialog()
                    }}>Done</Button>
                    <Button onPress={() => {
                        if (props.OnDeletePressed !== undefined)
                            props.OnDeletePressed({title: title, desc: description, isSeen: isSeen, id: props.startingState.id});
                        props.hideDialog()
                    }}>Delete</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default EditDialog;