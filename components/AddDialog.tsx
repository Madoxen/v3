import React from "react";
import { View } from "react-native";
import { Button, Dialog, Paragraph, Portal, Switch, TextInput } from "react-native-paper";


interface IProps {
    OnAddPressed?: (title: string, desc: string, isSeen: boolean) => void,
    visible: boolean,
    hideDialog: () => void,
    showDialog: () => void,
}

const AddDialog: React.FC<IProps> = (props) => {

    const [description, setDescription] = React.useState<string>("");
    const [title, setTitle] = React.useState<string>("");
    const [isSeen, setIsSeen] = React.useState<boolean>(false);

    const onToggleSwitch = () => setIsSeen(!isSeen);


    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={() => props.hideDialog()}>
                <Dialog.Title>Add Item</Dialog.Title>
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
                        if(props.OnAddPressed !== undefined)
                            props.OnAddPressed(title, description, isSeen); 
                            props.hideDialog() }}>Add</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default AddDialog;