package com.takamul.tekamulbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "project_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @Column(name = "plan_of_argument_path", nullable = false)
    private String planOfArgumentPath;

    @Column(name = "lease_path")
    private String leasePath;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status = ProjectStatus.REQUEST_SUBMITTED;

    @Column(name = "prepayment_screenshot_path")
    private String prepaymentScreenshotPath;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
