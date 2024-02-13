package com.luv2code.crud;

import com.luv2code.crud.dao.AppDAO;
import com.luv2code.crud.entity.Course;
import com.luv2code.crud.entity.Instructor;
import com.luv2code.crud.entity.InstructorDetail;
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
			deleteCourseById(appDAO);
		};
	}

	private void deleteCourseById(AppDAO appDAO) {
		int id = 1;
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
