/**
 * 
 */
package com.fsd.program.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fsd.program.entity.ParentTask;

/**
 * @author kj
 *
 */
public interface ParentTaskRepository extends MongoRepository<ParentTask, String> {

	public ParentTask findByParentId(String parentId);
	
}
