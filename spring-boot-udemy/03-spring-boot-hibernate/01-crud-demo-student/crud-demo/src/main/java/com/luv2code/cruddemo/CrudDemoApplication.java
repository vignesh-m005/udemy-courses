package com.luv2code.cruddemo;

import com.luv2code.cruddemo.dao.StudentDAO;
import com.luv2code.cruddemo.entity.StudentEntity;
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
	public CommandLineRunner commandLineRunner(StudentDAO studentDAO){
		return runner -> {
			//createStudent(studentDAO);
			createMultipleStudent(studentDAO);
			//readStudent(studentDAO);
			//readAllStudent(studentDAO);
			//readByLastName(studentDAO);
			//updateStudents(studentDAO);
			//deleteStudent(studentDAO);
			//deleteAllStudent(studentDAO);
		};
	}

	private void deleteAllStudent(StudentDAO studentDAO) {
		int total = studentDAO.deleteAll();
		System.out.println("Rows deleted: "+total);
	}

	private void deleteStudent(StudentDAO studentDAO) {
		int id = 3006;
		studentDAO.deleteById(3006);
	}

	private void updateStudents(StudentDAO studentDAO) {
		//retrieve student by primary key
		int id = 3005;
		StudentEntity studentEntity=studentDAO.findById(id);

		//set fields
		studentEntity.setEmail("ram@gmail.com");

		//update the student
		studentDAO.update(studentEntity);

		//display
		System.out.println(studentEntity);
	}

	private void readByLastName(StudentDAO studentDAO) {
		//Get List
		List<StudentEntity> studentEntities = studentDAO.findByLastName("R");

		//Display list of students
		for(StudentEntity studentEntity:studentEntities) System.out.println(studentEntity);
	}

	private void readAllStudent(StudentDAO studentDAO) {
		//Get list of students
		List<StudentEntity> studentEntities = studentDAO.findAll();

		//Display list of students
		for(StudentEntity studentEntity:studentEntities)  System.out.println(studentEntity);
	}

	private void readStudent(StudentDAO studentDAO) {
		int id = 3004;
		//retrieve
		StudentEntity studentEntity = studentDAO.findById(id);

		//print the values
		System.out.println(studentEntity);
	}

	private void createMultipleStudent(StudentDAO studentDAO) {
		//create multiple student
		System.out.println("Creating new students");
		StudentEntity studentEntity = new StudentEntity("Kamal","K","kamal@gmail.com");
		StudentEntity studentEntity1 = new StudentEntity("Ram","M","ram@gmail.com");
		StudentEntity studentEntity2 = new StudentEntity("Mani","S","mani@gmail.com");
		StudentEntity studentEntity3 = new StudentEntity("Makesh","R","makesh@gmail.com");

		//save multiple Students
		studentDAO.save(studentEntity);
		studentDAO.save(studentEntity1);
		studentDAO.save(studentEntity2);
		studentDAO.save(studentEntity3);

		System.out.println("Generated");
	}

	private void createStudent(StudentDAO studentDAO) {
		//Create the student object
		StudentEntity studentEntity = new StudentEntity("Vignesh","M","vignesh@gmail.com");

		//save student object
		studentDAO.save(studentEntity);

		//print id of the student
		System.out.println("Generated id: "+studentEntity.getId());
	}

}
