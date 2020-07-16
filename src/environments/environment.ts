// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl :"http://localhost:8000/api/login",
  logoutUrl :"http://localhost:8000/api/logout",
  registerUrl : "http://localhost:8000/api/student_register",
  registerAdminUrl :"http://localhost:8000/api/admin_register",
  fetchCourse : "http://localhost:8000/api/fetch_course",
  startExam : "http://localhost:8000/api/start_exam",
  fetchCode: "http://localhost:8000/api/fetch_source_code",
  run: "http://localhost:8000/api/run",
  submit: "http://localhost:8000/api/final_submission",
  updateDuration: "http://localhost:8000/api/update_duration",
  saveSource: "http://localhost:8000/api/save_source",
  //admin routes
  noOfOnline: "http://localhost:8000/api/number_of_online_users",
  onlineUser: "http://localhost:8000/api/list_online_users",
  createExam: "http://localhost:8000/api/create_exam",
  listExam: "http://localhost:8000/api/list_exam",
  addQuestion: "http://localhost:8000/api/add_question",
  viewQuestion: "http://localhost:8000/api/view_question",
  updateInstructor: "http://localhost:8000/api/update_instructor",
  adminData: "http://localhost:8000/api/admin_data",
  nextExam: "http://localhost:8000/api/next_exam",
  deleteExam: "http://localhost:8000/api/delete_exam",
  deleteQuestion: "http://localhost:8000/api/delete_question",
  qByID: "http://localhost:8000/api/fetch_question_by_id",
  editQuestion: "http://localhost:8000/api/edit_question",
  viewSubmission: "http://localhost:8000/api/view_submission",
  checkStudentSub: "http://localhost:8000/api/check_student_submission",
  checkQuestion: "http://localhost:8000/api/check_question",
  updateMarks: "http://localhost:8000/api/update_marks",
  // updateInstructor: "http://localhost:8000/api/update_instructor",


  // check_student_submission
  

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
