import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteListScreen from "@/screens/NoteListScreen";
import NoteEditorScreen from "@/screens/NoteEditorScreen";

type NoteListStackParamList = {
  NoteListScreen: undefined;
  NoteEditorScreen: undefined;
};

const NoteStack = createNativeStackNavigator<NoteListStackParamList>();

const NoteListStack = () => {
  return (
    <NoteStack.Navigator>
      <NoteStack.Screen
        name="NoteListScreen"
        options={{ headerShown: false }}
        component={NoteListScreen}
      />
      <NoteStack.Screen
        name="NoteEditorScreen"
        options={{ headerShown: false }}
        component={NoteEditorScreen}
      />
    </NoteStack.Navigator>
  );
};

export default NoteListStack;
