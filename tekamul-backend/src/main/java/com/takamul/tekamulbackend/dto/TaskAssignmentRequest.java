package com.takamul.tekamulbackend.dto;

import lombok.Data;

@Data
public class TaskAssignmentRequest {
    private Long projectId;
    private Long userId;
    private String title;
    private String description;
    private String type;
}
