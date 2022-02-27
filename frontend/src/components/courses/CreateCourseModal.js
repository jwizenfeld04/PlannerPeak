import courseScreenStyles from "../../styles/courseScreenStyles";
import { Ionicons } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { createUserCourse } from "../../redux/features/course/courseSlice";
import styles from "../../styles/styles";

const CreateCourseModal = (props) => {
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({});

  const ref_input2 = useRef();

  useEffect(() => {}, []);

  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      transparent={false}
    >
      <SafeAreaView>
        <TouchableOpacity onPress={props.onCreateModalPress}>
          <Ionicons name="arrow-back-outline" size={40} color="black" />
        </TouchableOpacity>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Course Name"
            returnKeyType="next"
            onSubmitEditing={() => ref_input2.current.focus()}
            textAlign="center"
            onChangeText={(text) =>
              setAuthData({
                ...courseData,
                name: text,
              })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Course Subject"
            textAlign="center"
            ref={ref_input2}
            onChangeText={(text) =>
              setAuthData({ ...courseData, subject: text })
            }
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(createUserCourse(courseData));
          }}
        >
          <Text>Create Course</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default CreateCourseModal;
