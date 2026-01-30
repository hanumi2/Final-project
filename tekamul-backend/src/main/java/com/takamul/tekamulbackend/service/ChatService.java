package com.takamul.tekamulbackend.service;

import com.takamul.tekamulbackend.model.Chat;
import com.takamul.tekamulbackend.model.User;
import com.takamul.tekamulbackend.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public Chat sendMessage(Chat chat) {
        return chatRepository.save(chat);
    }

    public List<Chat> getConversation(User u1, User u2) {
        List<Chat> conv = chatRepository.findConversation(u1, u2);
        // Mark as read
        conv.forEach(c -> {
            if (c.getReceiver().getId().equals(u1.getId())) {
                c.setRead(true);
            }
        });
        chatRepository.saveAll(conv);
        return conv;
    }

    public List<Chat> getUnreadMessages(User receiver) {
        return chatRepository.findByReceiverAndReadFalse(receiver);
    }
}
