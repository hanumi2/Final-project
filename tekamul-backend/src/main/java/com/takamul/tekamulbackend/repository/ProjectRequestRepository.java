package com.takamul.tekamulbackend.repository;

import com.takamul.tekamulbackend.model.ProjectRequest;
import com.takamul.tekamulbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRequestRepository extends JpaRepository<ProjectRequest, Long> {
    List<ProjectRequest> findByClient(User client);
}
