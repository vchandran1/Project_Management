/**
 * 
 */
package com.fsd.program.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import com.fsd.program.entity.ParentTask;
import com.fsd.program.entity.Project;
import com.fsd.program.entity.Task;
import com.fsd.program.entity.User;
import com.fsd.program.repo.ParentTaskRepository;
import com.fsd.program.repo.ProjectRepository;
import com.fsd.program.repo.TaskRepository;
import com.fsd.program.repo.UserRepository;
import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;

/**
 * @author kj
 *
 */
@Configuration
@Profile("junit-tests")
@ComponentScan(basePackages = { "com.fsd.program.services", "com.fsd.program.repo" })
public class TestConfig {

	@Bean
	@Primary
	public UserRepository userRepository() throws IOException {
		UserRepository mock = Mockito.spy(UserRepository.class);
		String contentFromJSON = new String(Files.readAllBytes(Paths.get("src/test/resources/users.json")));
		Gson gson = new Gson();
		@SuppressWarnings("unchecked")
		List<User> users = gson.fromJson(contentFromJSON, List.class);
		Mockito.when(mock.findAll()).thenReturn(users);
		Mockito.when(mock.save(Mockito.any(User.class))).thenReturn(new User());
		Mockito.doNothing().when(mock).delete(Mockito.any(User.class));

		String testUserContentFromJSON = new String(Files.readAllBytes(Paths.get("src/test/resources/testUser.json")));
		User testuser = gson.fromJson(testUserContentFromJSON, User.class);
		Optional<User> optionaluser = Optional.of(testuser);
		Mockito.when(mock.findById("1111")).thenReturn(optionaluser);

		Optional<User> optionaluser2 = Optional.ofNullable(null);
		Mockito.when(mock.findById("2222")).thenReturn(optionaluser2);

		return mock;
	}

	@Bean
	@Primary
	public ProjectRepository projectRepository() throws IOException {
		ProjectRepository mock = Mockito.spy(ProjectRepository.class);
		String contentFromJSON = new String(Files.readAllBytes(Paths.get("src/test/resources/projects.json")));
		Gson gson = new Gson();
		List<Project> projects = new ArrayList<>();
		@SuppressWarnings({ "unchecked", "rawtypes" })
		List<LinkedTreeMap> tasksJson = gson.fromJson(contentFromJSON, List.class);
		for (LinkedTreeMap<?, ?> jsonElement : tasksJson) {
			projects.add(gson.fromJson(gson.toJson(jsonElement), Project.class));
		}
		Mockito.when(mock.findAll()).thenReturn(projects);
		Mockito.when(mock.findByManagerId("1111111")).thenReturn(projects);
		Mockito.when(mock.save(Mockito.any(Project.class))).thenReturn(new Project());
		Mockito.doNothing().when(mock).delete(Mockito.any(Project.class));
		String projectContentFromJSON = new String(
				Files.readAllBytes(Paths.get("src/test/resources/testProject.json")));
		Project project = gson.fromJson(projectContentFromJSON, Project.class);
		Optional<Project> optionalProject = Optional.ofNullable(project);
		Mockito.when(mock.findById(Mockito.anyString())).thenReturn(optionalProject);
		return mock;
	}

	@Bean
	@Primary
	public TaskRepository taskRepository() throws IOException {
		TaskRepository mock = Mockito.spy(TaskRepository.class);
		String contentFromJSON = new String(Files.readAllBytes(Paths.get("src/test/resources/tasks.json")));
		Gson gson = new Gson();
		List<Task> tasks = new ArrayList<>();
		@SuppressWarnings({ "unchecked", "rawtypes" })
		List<LinkedTreeMap> tasksJson = gson.fromJson(contentFromJSON, List.class);
		for (LinkedTreeMap<?, ?> jsonElement : tasksJson) {
			tasks.add(gson.fromJson(gson.toJson(jsonElement), Task.class));
		}
		Mockito.when(mock.findAll()).thenReturn(tasks);

		Mockito.when(mock.save(Mockito.any(Task.class))).thenReturn(new Task());
		
		Mockito.when(mock.findByProjectId("1111111")).thenReturn(tasks);
		
		Mockito.when(mock.findByUserId("1111111")).thenReturn(tasks);
		
		Mockito.doNothing().when(mock).delete(Mockito.any(Task.class));
		return mock;
	}

	@Bean
	@Primary
	public ParentTaskRepository parentTaskRepository() throws IOException {
		ParentTaskRepository mock = Mockito.spy(ParentTaskRepository.class);
		String contentFromJSON = new String(Files.readAllBytes(Paths.get("src/test/resources/parentTasks.json")));
		Gson gson = new Gson();
		@SuppressWarnings("unchecked")
		List<ParentTask> parentTasks = gson.fromJson(contentFromJSON, List.class);
		Mockito.when(mock.findAll()).thenReturn(parentTasks);

		Mockito.when(mock.save(Mockito.any(ParentTask.class))).thenReturn(new ParentTask());
		String parentTaskContentFromJSON = new String(
				Files.readAllBytes(Paths.get("src/test/resources/parentTask.json")));
		ParentTask parentTask = gson.fromJson(parentTaskContentFromJSON, ParentTask.class);
		Optional<ParentTask> optionalPTask = Optional.ofNullable(parentTask);
		Mockito.when(mock.findById(Mockito.anyString())).thenReturn(optionalPTask);

		return mock;
	}

}
