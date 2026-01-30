package com.takamul.tekamulbackend.controller;

import com.takamul.tekamulbackend.model.ProjectRequest;
import com.takamul.tekamulbackend.model.User;
import com.takamul.tekamulbackend.repository.UserRepository;
import com.takamul.tekamulbackend.service.FileStorageService;
import com.takamul.tekamulbackend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/request")
    public ResponseEntity<?> submitRequest(
            @RequestParam("planOfArgument") MultipartFile planOfArgument,
            @RequestParam(value = "lease", required = false) MultipartFile lease) {
        UserDetails userPrincipal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User client = userRepository.findByUsername(userPrincipal.getUsername()).get();

        String planPath = fileStorageService.storeFile(planOfArgument);
        String leasePath = (lease != null && !lease.isEmpty()) ? fileStorageService.storeFile(lease) : null;

        ProjectRequest projectRequest = ProjectRequest.builder()
                .client(client)
                .planOfArgumentPath(planPath)
                .leasePath(leasePath)
                .build();

        projectService.createProjectRequest(projectRequest);
        return ResponseEntity.ok("Project request submitted successfully!");
    }

    @GetMapping("/my")
    public ResponseEntity<List<ProjectRequest>> getMyProjects() {
        UserDetails userPrincipal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User client = userRepository.findByUsername(userPrincipal.getUsername()).get();
        return ResponseEntity.ok(projectService.getProjectsByClient(client));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProjectRequest>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateProjectStatus(@PathVariable Long id, @RequestParam("status") String status) {
        projectService.updateStatus(id, status);
        return ResponseEntity.ok("Project status updated to " + status);
    }
}
