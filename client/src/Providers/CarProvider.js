// import React, { Component } from "react";
// import axios from "axios";

// const CourseContext = React.createContext();
// export const CourseConsumer = CourseContext.Consumer;

// export class CarProvider extends Component {
//  state = { courses: [], lessons: [] }
//  componentDidMount() {
//    axios.get("/api/courses")
//      .then( res => {
//        this.setState({ courses: res.data })
//      })
//      .catch( err => {
//        console.log(err)
//      })
//  }
//  updateCourse = (course) => {
//    const { id }  = course
//    axios.put(/api/courses/${id}, course)
//    .then(res => {
//      const courses = this.state.courses.map( c => {
//         if (c.id === id)
//           return res.data
//           return c
//       })
//       this.setState({ courses })
//       window.location.href = '/admin-courses'
//     })
//  }
//  deleteCourse = (id) => {
//    axios.delete(api/courses/${id})
//     .then( res => {
//       const { courses } = this.state
//       this.setState({ courses: courses.filter( c=> c.id !==id )})
//       window.location.href = '/admin-courses'
//     })
//  }
//  addCourse = (course) => {
//    axios.post('/api/courses', { course } )
//     .then( res => {
//       const { courses  } = this.state
//       this.setState({ courses: [...courses, res.data] })
//       window.location.href = '/admin-courses'
//     })
//     .catch( err => {
//       console.log(err)
//     })
//   }
//   addLesson = (lesson) => {
//     axios.post(/api/courses/${lesson.course_id}/lessons, { lesson } )
//     .then( res => {
//       const { lessons } = this.state
//       this.setState({ lessons: [...lessons, res.data] })
//       window.location.href = '/admin-courses'
//     })
//     .catch( err => {
//       console.log(err)
//     })
//   }
//   deleteLesson = (courseId, id) => {
//    axios.delete(/api/courses/${courseId}/lessons/${id})
//     .then( res => {
//       const { lessons } = this.state
//       this.setState({ lessons: lessons.filter( c=> c.id !==id)})
//       window.location.href = '/admin-courses'
//     })
//   }
//   updateLesson = (lesson) => {
//    const { id, course_id }  = lesson
//    axios.put(/api/courses/${course_id}/lessons/${id}, lesson)
//    .then(res => {
//      const lesson = this.state.lessons.map( c => {
//         if (c.id === id)
//           return res.data
//           return c
//       })
//       this.setState({ lesson })
//       window.location.href = '/admin-courses'
//     })
//   }
//  render() {
//    return (
//      <CourseContext.Provider value={{
//        ...this.state,
//        deleteCourse: this.deleteCourse,
//        updateCourse: this.updateCourse,
//        addCourse: this.addCourse,
//        addLesson: this.addLesson,
//        deleteLesson: this.deleteLesson,
//        updateLesson: this.updateLesson,
//      }}>
//        { this.props.children }
//      </CourseContext.Provider>
//    )
//  }
// }