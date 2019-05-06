/**
 * 
 */
package com.fsd.program.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fsd.program.entity.User;

/**
 * @author kj
 *
 */
public interface UserRepository extends MongoRepository<User, String> {

}
