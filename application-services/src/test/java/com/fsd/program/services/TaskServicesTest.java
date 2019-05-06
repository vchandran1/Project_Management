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

import com.fsd.program.entity.Task;

/**
 * @author mmurugesan1
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { TestConfig.class })
@ActiveProfiles("junit-tests")
public class TaskServicesTest {

	@Autowired
	private TaskServices testCase;

	@Test
	public void test() {
		assertNotNull(testCase.getTasks());
	}

	@Test
	public void test_getParentTasks() {
		assertNotNull(testCase.getParentTasks());
	}

	@Test
	public void test_addUpdateTask() {
		Map<String, String> requestMap = new HashMap<>();
		requestMap.put("priority", "1");
		try {
			assertNotNull(testCase.addUpdateTask(requestMap));
		} catch (ParseException e) {
			e.printStackTrace();
			fail("Unexcpected error");
		}
	}
	
	@Test
	public void test_addUpdateTask_1() {
		Map<String, String> requestMap = new HashMap<>();
		requestMap.put("priority", "1");
		requestMap.put("parentId","ewf34t43yt4yt");
		try {
			assertNotNull(testCase.addUpdateTask(requestMap));
		} catch (ParseException e) {
			e.printStackTrace();
			fail("Unexcpected error");
		}
	}

	@Test
	public void test_addUpdateTask_2() {
		Map<String, String> requestMap = new HashMap<>();
		requestMap.put("priority", "1");
		requestMap.put("isParentTask", "true");
		try {
			assertNotNull(testCase.addUpdateTask(requestMap));
		} catch (ParseException e) {
			e.printStackTrace();
			fail("Unexcpected error");
		}
	}

	@Test
	public void test_endTask() {
		Map<String, String> requestMap = new HashMap<>();
		requestMap.put("priority", "1");
		try {
			assertNotNull(testCase.endTask(requestMap));
		} catch (ParseException e) {
			e.printStackTrace();
			fail("Unexcpected error");
		}
	}

	@Test
	public void test_deleteTask() {
		assertNotNull(testCase.deleteTask(new Task()));
	}

}
