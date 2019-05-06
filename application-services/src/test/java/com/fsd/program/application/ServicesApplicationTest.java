package com.fsd.program.application;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { ServicesApplication.class })
public class ServicesApplicationTest {

	@Test
	public void contextLoads() {
	}

	@Test
	public void testMain() {
		ServicesApplication.main(new String[] { "--spring.main.web-environment=false" });
	}

}
