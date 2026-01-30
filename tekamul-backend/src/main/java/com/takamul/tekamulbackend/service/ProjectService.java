package com.takamul.tekamulbackend.service;

import com.takamul.tekamulbackend.model.ProjectRequest;
import com.takamul.tekamulbackend.model.ProjectStatus;
import com.takamul.tekamulbackend.model.User;
import com.takamul.tekamulbackend.repository.ProjectRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRequestRepository projectRequestRepository;

    public ProjectRequest createProjectRequest(ProjectRequest request) {
        return projectRequestRepository.save(request);
    }

    public List<ProjectRequest> getProjectsByClient(User client) {
        return projectRequestRepository.findByClient(client);
    }

    public List<ProjectRequest> getAllProjects() {
        return projectRequestRepository.findAll();
    }

    public ProjectRequest updateStatus(Long id, String status) {
        ProjectRequest request = getProjectById(id);
        request.setStatus(ProjectStatus.valueOf(status));
        return projectRequestRepository.save(request);
    }

    public ProjectRequest getProjectById(Long id) {
        return projectRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }
}
