/**
 * 
 */
package com.fsd.program.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.program.entity.Project;
import com.fsd.program.entity.Task;
import com.fsd.program.entity.User;
import com.fsd.program.repo.ProjectRepository;
import com.fsd.program.repo.TaskRepository;
import com.fsd.program.repo.UserRepository;

/**
 * @author kj
 *
 */
@RestController
@RequestMapping("/users")
public class UserServices {

	private static final Logger logger = LoggerFactory.getLogger(UserServices.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@RequestMapping("/getAllUsers")
	public List<User> getAllUsers() {
		logger.info("Method getAllUsers() executed");
		return userRepository.findAll();
	}

	@RequestMapping("/addUpdate")
	public List<User> addUpdateUser(@RequestBody User user) {
		userRepository.save(user);
		return userRepository.findAll();
	}

	@RequestMapping("/deleteUser")
	public List<User> deleteUser(@RequestBody User user) {
		userRepository.delete(user);
		List<Task> tasks = taskRepository.findByUserId(user.getId());
		for (Task task : tasks) {
			task.setUserId("");
			taskRepository.save(task);
		}
		List<Project> projects = projectRepository.findByManagerId(user.getId());
		for (Project project : projects) {
			project.setManagerId("");
			project.setManagerName("");
			projectRepository.save(project);
		}
		return userRepository.findAll();
	}

}
