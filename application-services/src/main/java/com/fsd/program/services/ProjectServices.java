/**
 * 
 */
package com.fsd.program.services;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

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
@RequestMapping("/projects")
public class ProjectServices {

	private static final Logger logger = LoggerFactory.getLogger(ProjectServices.class);

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TaskRepository taskRepository;

	@RequestMapping("/getProjects")
	public List<Project> getProjects() {
		logger.info("Method getproject() executed");
		List<Project> projects = projectRepository.findAll();
		projects.stream().forEach((project) -> {
			String projectId = project.getId();
			List<Task> tasks = taskRepository.findByProjectId(projectId);
			project.setTasksCount(tasks.size());

		});
		return projects;
	}

	@RequestMapping("/addUpdate")
	public List<Project> addUpdateProject(@RequestBody Map<String, String> requestMap) throws ParseException {

		Project projectEntity = new Project();
		projectEntity.setId(requestMap.get("id"));
		projectEntity.setEndDate(requestMap.get("endDate"));
		projectEntity.setStartDate(requestMap.get("startDate"));
		projectEntity.setProjectname(requestMap.get("projectName"));
		projectEntity.setPriority(Integer.parseInt(requestMap.get("priority")));

		String managerId = requestMap.get("managerId");
		User user = userRepository.findById(managerId).get();
		projectEntity.setManagerId(managerId);
		projectEntity.setManagerName(user.getFirstName() + " " + user.getLastName());
		projectRepository.save(projectEntity);
		return projectRepository.findAll();
	}

	@RequestMapping("/deleteProject")
	public List<Project> deleteProject(@RequestBody Project project) {
		projectRepository.delete(project);
		return projectRepository.findAll();
	}

}
