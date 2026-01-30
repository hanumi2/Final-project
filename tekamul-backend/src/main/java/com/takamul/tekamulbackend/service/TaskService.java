package com.takamul.tekamulbackend.service;

import com.takamul.tekamulbackend.model.Task;
import com.takamul.tekamulbackend.model.User;
import com.takamul.tekamulbackend.model.TaskStatus;
import com.takamul.tekamulbackend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getTasksByUser(User user) {
        return taskRepository.findByAssignedTo(user);
    }

    public Task updateTaskStatus(Long taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId).get();
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public Task updateTaskFile(Long taskId, String filePath) {
        Task task = taskRepository.findById(taskId).get();
        task.setFilePath(filePath);
        return taskRepository.save(task);
    }
}
