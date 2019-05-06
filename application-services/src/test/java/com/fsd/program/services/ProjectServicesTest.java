/**
 * 
 */
package com.fsd.program.services;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.fsd.program.entity.Project;

/**
 * @author kj
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { TestConfig.class })
@ActiveProfiles("junit-tests")
public class ProjectServicesTest {

	@Autowired
	private ProjectServices testCase;

	/**
	 * Test method for
	 * {@link com.fsd.program.services.ProjectServices#getProjects()}.
	 */
	@Test
	public void testGetProjects() {
		assertNotNull(testCase.getProjects());
	}

	/**
	 * Test method for
	 * {@link com.fsd.program.services.ProjectServices#addUpdateProject(java.util.Map)}.
	 */
	@Test
	public void testAddUpdateProject() {
		Map<String, String> requestMap = new HashMap<>();
		requestMap.put("priority", "1");
		requestMap.put("managerId", "1111");
		try {
			assertNotNull(testCase.addUpdateProject(requestMap));
		} catch (ParseException e) {
			fail("Unexpected Parse error");
		}
	}
	
	@Test(expected = RuntimeException.class)
	public void testAddUpdateProject_Error() {
		Map<String, String> requestMap = new HashMap<>();
		requestMap.put("priority", "1");
		requestMap.put("managerId", "1212");
		try {
			assertNotNull(testCase.addUpdateProject(requestMap));
		} catch (ParseException e) {
			fail("Unexpected Parse error");
		}
	}

	/**
	 * Test method for
	 * {@link com.fsd.program.services.ProjectServices#deleteProject(com.fsd.program.entity.Project)}.
	 */
	@Test
	public void testDeleteProject() {
		testCase.deleteProject(new Project());
	}

}
