package com.takamul.tekamulbackend.config;

import com.takamul.tekamulbackend.model.Role;
import com.takamul.tekamulbackend.model.User;
import com.takamul.tekamulbackend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            seedUser(userRepository, passwordEncoder, "admin", "admin@tekamul.com", "password123", "System Admin",
                    Role.ADMIN);
            seedUser(userRepository, passwordEncoder, "manager", "manager@tekamul.com", "password123",
                    "Project Manager", Role.PROJECT_MANAGER);
            seedUser(userRepository, passwordEncoder, "architect", "arch@tekamul.com", "password123", "Lead Architect",
                    Role.ARCHITECT);
            seedUser(userRepository, passwordEncoder, "messenger", "msg@tekamul.com", "password123", "Site Messenger",
                    Role.MESSENGER);
            seedUser(userRepository, passwordEncoder, "client", "client@tekamul.com", "password123", "Property Owner",
                    Role.CLIENT);
        };
    }

    private void seedUser(UserRepository userRepository, PasswordEncoder passwordEncoder, String username, String email,
            String password, String fullName, Role role) {
        if (!userRepository.existsByUsername(username)) {
            User user = User.builder()
                    .username(username)
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .fullName(fullName)
                    .role(role)
                    .active(true)
                    .build();
            userRepository.save(user);
            System.out.println("Seeded user: " + username + " with role: " + role);
        }
    }
}
