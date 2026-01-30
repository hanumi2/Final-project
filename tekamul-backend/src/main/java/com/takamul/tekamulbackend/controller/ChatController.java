package com.takamul.tekamulbackend.controller;

import com.takamul.tekamulbackend.model.Chat;
import com.takamul.tekamulbackend.model.User;
import com.takamul.tekamulbackend.repository.UserRepository;
import com.takamul.tekamulbackend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestParam("receiverId") Long receiverId,
            @RequestParam("message") String message) {
        UserDetails userPrincipal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User sender = userRepository.findByUsername(userPrincipal.getUsername()).get();
        User receiver = userRepository.findById(receiverId).get();

        Chat chat = Chat.builder()
                .sender(sender)
                .receiver(receiver)
                .message(message)
                .build();

        chatService.sendMessage(chat);
        return ResponseEntity.ok("Message sent");
    }

    @GetMapping("/conversation/{partnerId}")
    public ResponseEntity<List<Chat>> getConversation(@PathVariable Long partnerId) {
        UserDetails userPrincipal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User me = userRepository.findByUsername(userPrincipal.getUsername()).get();
        User partner = userRepository.findById(partnerId).get();

        return ResponseEntity.ok(chatService.getConversation(me, partner));
    }
}
