package com.luv2code.crud;

import com.luv2code.crud.dao.AppDAO;
import com.luv2code.crud.entity.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class CrudDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudDemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(AppDAO appDAO){
		return runner ->{
			//createInstructor(appDAO);
			//findInstructorById(appDAO);
			//deleteInstructor(appDAO);
			//findInstructorDetail(appDAO);
			//deleteInstructorDetail(appDAO);

			//createInstructorWithCourses(appDAO);
			//findInstructorWithCourses(appDAO);
			//findCoursesForInstructor(appDAO);
			//findInstructorUsingJoinFetch(appDAO);
			//updateInstructor(appDAO);
			//updateCourse(appDAO);
			//deleteInstructorById(appDAO);
			//deleteCourseById(appDAO);

			//createCourseAndReviews(appDAO);
			//findCourseAndReview(appDAO);
			//deleteCourseById(appDAO);

			//createCourseAndStudents(appDAO);
			//findCourseAndStudent(appDAO);
			//findStudentAndCourse(appDAO);
			//addCoursesForStudent(appDAO);
			//deleteCourseById(appDAO);
			deleteStudentById(appDAO);
		};
	}

	private void deleteStudentById(AppDAO appDAO) {
		int id = 1;
		appDAO.deleteStudentById(id);
		System.out.println("Deleted!!!!!!");
	}

	private void addCoursesForStudent(AppDAO appDAO) {
		int id = 2;

		Student student = appDAO.findCourseAndStudentByStudentId(id);
		Course course = Course.builder()
				.title("How to speed cube")
				.build();
		Course course1 = Course.builder()
				.title("Game development")
				.build();
		student.addCourse(course);
		student.addCourse(course1);
		appDAO.update(student);

		System.out.println("Updated!!!!!!!");
	}

	private void findStudentAndCourse(AppDAO appDAO) {
		int id = 2;

		Student student = appDAO.findCourseAndStudentByStudentId(id);

		System.out.println(student);
		System.out.println(student.getCourses());
	}

	private void findCourseAndStudent(AppDAO appDAO) {
		int id = 1;

		Course course = appDAO.findCourseAndStudentByCourseId(id);

		System.out.println(course);
		System.out.println(course.getStudents());
	}

	private void createCourseAndStudents(AppDAO appDAO) {
		Course course = Course.builder()
				.title("How to score 1M points")
				.build();

		Student student1 = Student.builder()
				.firstName("Vignesh")
				.lastName("M")
				.email("vignesh@gmail.com")
				.build();
		Student student2 = Student.builder()
				.firstName("Ram")
				.lastName("M")
				.email("ram@gmail.com")
				.build();
		Student student3 = Student.builder()
				.firstName("Kamal")
				.lastName("K")
				.email("kamal@gmail.com")
				.build();
		course.addStudent(student1);
		course.addStudent(student2);
		course.addStudent(student3);

		appDAO.saveCourse(course);

		System.out.println("Done!!!");
	}

	private void findCourseAndReview(AppDAO appDAO) {
		int id = 4;
		Course course = appDAO.findCourseAndReviews(id);

		System.out.println(course);
	}

	private void createCourseAndReviews(AppDAO appDAO) {

		Review review1 = Review.builder()
				.comment("Great Course")
				.build();
		Review review2 = Review.builder()
				.comment("Cool Course")
				.build();
		Review review3 = Review.builder()
				.comment("Dumb Course")
				.build();

		Course course = Course.builder()
				.title("How to score 1M points")
				.build();
		course.addReview(review1);
		course.addReview(review2);
		course.addReview(review3);

		appDAO.saveCourse(course);
		System.out.println("Course saved successfully");
	}

	private void deleteCourseById(AppDAO appDAO) {
		int id = 2;
		appDAO.deleteCourseById(id);
		System.out.println("Deleted!!!");
	}

	private void deleteInstructorById(AppDAO appDAO) {
		int id = 1;
		System.out.println("Deleting Instructor for id: "+id);

		appDAO.deleteInstructorById(id);

		System.out.println("Deleted!!!");
	}

	private void updateCourse(AppDAO appDAO) {
		int id = 1;
		Course course = appDAO.findCourseById(id);
		course.setTitle("Enjoy the simple things");
		appDAO.updateCourse(course);
	}

	private void updateInstructor(AppDAO appDAO) {
		int id = 1;
		Instructor instructor = appDAO.findByInstructorId(id);
		instructor.setLastName("Random");

		appDAO.updateInstructor(instructor);
		System.out.println("Done!!!!!!!!");
	}

	private void findInstructorUsingJoinFetch(AppDAO appDAO) {
		int id = 1;
		System.out.println("Finding instructor for: "+id);

		Instructor instructor = appDAO.findInstructorUsingJoinFetch(id);

		System.out.println("Instructor: "+instructor);
		System.out.println("Courses: "+instructor.getCourses());
	}

	private void findCoursesForInstructor(AppDAO appDAO) {
		int id = 1;
		System.out.println("Finding instructor for: "+id);
		List<Course> courses = appDAO.findCoursesForInstructor(id);
		Instructor instructor = appDAO.findByInstructorId(id);
		instructor.setCourses(courses);

		System.out.println("Instructor: "+instructor);
		System.out.println("Courses: "+instructor.getCourses());

	}

	private void findInstructorWithCourses(AppDAO appDAO) {
		int id = 1;
		System.out.println("Finding instructor for: "+id);

		Instructor instructor = appDAO.findByInstructorId(id);

		System.out.println("Instructor: "+instructor);
		System.out.println("Courses: "+instructor.getCourses());

	}

	private void createInstructorWithCourses(AppDAO appDAO) {

		Course course1 = Course.builder()
				.title("Dance practice guide")
				.build();
		Course course2 = Course.builder()
				.title("Singing practice guide")
				.build();

		InstructorDetail instructorDetail = InstructorDetail.builder()
				.youtubeChannel("http://www.ram/youtube")
				.hobby("Dancing")
				.build();

		Instructor instructor = Instructor.builder()
				.firstName("Ram")
				.lastName("M")
				.email("ram@gmail.com")
				.instructorDetail(instructorDetail)
				.build();
		instructor.add(course1);
		instructor.add(course2);

		System.out.println("Saving Instructor: "+instructor);
		System.out.println("Saving Courses: "+instructor.getCourses());
		appDAO.save(instructor);

		System.out.println("Done!!!");
	}

	private void deleteInstructorDetail(AppDAO appDAO) {

		int id = 3;
		System.out.println("Deleting Instructor for id: "+id);
		appDAO.deleteInstructorDetailById(id);
		System.out.println("Deleted!!!!");
	}

	private void findInstructorDetail(AppDAO appDAO) {
		int id = 1;
		InstructorDetail instructorDetail = appDAO.findInstructorDetailById(id);

		System.out.println("instructorDetail: "+instructorDetail);
		System.out.println("Instructor: "+instructorDetail.getInstructor());
	}

	private void deleteInstructor(AppDAO appDAO) {
		int id = 2;
		System.out.println("Deleting Instructor for id: "+id);

		appDAO.deleteById(id);

		System.out.println("Deleted!!!");
	}

	private void findInstructorById(AppDAO appDAO) {
		int id = 2;
		System.out.println("Finding Instructor for id: "+id);
		Instructor instructor = appDAO.findByInstructorId(id);

		System.out.println("Instructor: "+instructor);
		System.out.println("Instructor Detail: "+instructor.getInstructorDetail());
	}

	private void createInstructor(AppDAO appDAO) {

		InstructorDetail instructorDetail = InstructorDetail.builder()
				.youtubeChannel("http://www.ram/youtube")
				.hobby("Dancing")
				.build();

		Instructor instructor = Instructor.builder()
				.firstName("Ram")
				.lastName("M")
				.email("ram@gmail.com")
				.instructorDetail(instructorDetail)
				.build();

		System.out.println("Saving Instructor: "+instructor);
		appDAO.save(instructor);
		System.out.println("Done!!!");
	}

}
