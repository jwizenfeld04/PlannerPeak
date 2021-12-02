import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import { AuthContext } from "../components/context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const { SignOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [url, setUrl] = useState(null);

  AsyncStorage.getItem("userToken").then((res) => {
    setToken(res);
  });
  if (token) {
    axios
      .get("http://192.168.81.59:8000/api/dj-rest-auth/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setUserEmail(response.data.email);
        setUserFirstName(response.data.first_name);
        setUserLastName(response.data.last_name);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const authorizeSchoology = (token) => {
    axios
      .get("http://192.168.81.59:8000/api/schoology-authorize/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data["authUrl"]);
        console.log(response);
        setUrl(response.data["authUrl"]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const verifySchoology = (token) => {
    axios
      .post(
        "http://192.168.81.59:8000/api/schoology-authorize/",
        { verify: true },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const coursesSchoology = (token) => {
    axios
      .get("http://192.168.81.59:8000/api/schoology-courses/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const gradesSchoology = (token) => {
    axios
      .get("http://192.168.1.25:8000/api/schoology-grades/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const assignmentsSchoology = (token) => {
    axios
      .get("http://192.168.1.25:8000/api/schoology-assignments/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const loadInBrowser = () => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const getCourses = (token) => {
    axios
      .get("http://192.168.1.25:8000/api/user-courses/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createCourse = (token, courseName, courseSubject) => {
    axios
      .post(
        "http://192.168.1.25:8000/api/user-courses/",
        {
          name: courseName,
          subject: courseSubject,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCourse = (token, courseName, courseSubject, courseId) => {
    axios
      .put(
        `http://192.168.1.25:8000/api/user-courses-update/${courseId}`,
        {
          name: courseName,
          subject: courseSubject,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCourse = (token, courseId) => {
    axios
      .delete(`http://192.168.1.25:8000/api/user-courses-update/${courseId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createAssignment = (
    token,
    assignmentName,
    assignmnetDescription,
    dueDate,
    course_id
  ) => {
    axios
      .post(
        `http://192.168.1.25:8000/api/user-assignments/${course_id}`,
        {
          name: assignmentName,
          description: assignmnetDescription,
          due_date: dueDate,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAssignments = (token, course_id) => {
    // Pass the Course Id that is saved in state from getCourses
    axios
      .get(`http://192.168.1.25:8000/api/user-assignments/${course_id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateAssignment = (
    token,
    assignmentName,
    assignmentDescription,
    dueDate,
    assignmentId
  ) => {
    axios
      .put(
        `http://192.168.1.25:8000/api/user-assignments-update/${assignmentId}`,
        {
          name: assignmentName,
          description: assignmentDescription,
          due_date: dueDate,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteAssignment = (token, assignmentId) => {
    axios
      .delete(
        `http://192.168.1.25:8000/api/user-assignments-update/${assignmentId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Welcome {userFirstName + " " + userLastName}</Text>
      <Text>{url ? loadInBrowser() : null}</Text>

      <Button
        title="Authorize"
        onPress={() => {
          verifySchoology(token);
        }}
      />

      <Button
        title="Sign Out"
        onPress={() => {
          SignOut();
        }}
      />
      <Button
        title="Get Courses"
        onPress={() => {
          getCourses(token);
        }}
      />
      <Button
        title="Get Assignments"
        onPress={() => {
          getAssignments(token, 1);
        }}
      />
      <Button
        title="Create Course"
        onPress={() => {
          createCourse(token, "Physics", "Science");
        }}
      />
      <Button
        title="Create Assignment"
        onPress={() => {
          createAssignment(
            token,
            "HW TEST",
            "Just a Test",
            "2021-08-21 00:00:00.000000",
            3
          );
        }}
      />
      <Button
        title="Update Course"
        onPress={() => {
          updateCourse(token, "Coding", "Tech", 8);
        }}
      />
      <Button
        title="Delete Course"
        onPress={() => {
          deleteCourse(token, 8);
        }}
      />
      <Button
        title="Update Assignment"
        onPress={() => {
          updateAssignment(
            token,
            "Related Rates",
            "Absolute Shit",
            "2021-08-27 00:00:00.000000",
            5
          );
        }}
      />
      <Button
        title="Delete Assignment"
        onPress={() => {
          deleteAssignment(token, 5);
        }}
      />
      <Button
        title="Schoology Authorize"
        onPress={() => {
          authorizeSchoology(token);
        }}
      />
      <Button
        title="Schoology Courses"
        onPress={() => {
          coursesSchoology(token);
        }}
      />
      <Button
        title="Schoology Grades"
        onPress={() => {
          gradesSchoology(token);
        }}
      />
      <Button
        title="Schoology Assignments"
        onPress={() => {
          assignmentsSchoology(token);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
