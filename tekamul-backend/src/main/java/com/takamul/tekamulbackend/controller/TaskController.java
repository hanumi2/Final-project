package com.takamul.tekamulbackend.controller;

import com.takamul.tekamulbackend.dto.TaskAssignmentRequest;
import com.takamul.tekamulbackend.model.*;
import com.takamul.tekamulbackend.repository.UserRepository;
import com.takamul.tekamulbackend.service.FileStorageService;
import com.takamul.tekamulbackend.service.ProjectService;
import com.takamul.tekamulbackend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/assign")
    public ResponseEntity<?> assignTask(@RequestBody TaskAssignmentRequest request) {
        ProjectRequest project = projectService.getProjectById(request.getProjectId());
        User user = userRepository.findById(request.getUserId()).get();

        Task task = Task.builder()
                .project(project)
                .assignedTo(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .type(TaskType.valueOf(request.getType()))
                .build();

        taskService.createTask(task);
        return ResponseEntity.ok("Task assigned successfully!");
    }

    @GetMapping("/my")
    public ResponseEntity<List<Task>> getMyTasks() {
        UserDetails userPrincipal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userPrincipal.getUsername()).get();
        return ResponseEntity.ok(taskService.getTasksByUser(user));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam("status") String status) {
        taskService.updateTaskStatus(id, TaskStatus.valueOf(status));
        return ResponseEntity.ok("Task status updated!");
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<?> uploadResult(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        String path = fileStorageService.storeFile(file);
        taskService.updateTaskFile(id, path);
        return ResponseEntity.ok("File uploaded successfully!");
    }
}
