package com.takamul.tekamulbackend.repository;

import com.takamul.tekamulbackend.model.Chat;
import com.takamul.tekamulbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT c FROM Chat c WHERE (c.sender = :u1 AND c.receiver = :u2) OR (c.sender = :u2 AND c.receiver = :u1) ORDER BY c.timestamp ASC")
    List<Chat> findConversation(@Param("u1") User u1, @Param("u2") User u2);

    List<Chat> findByReceiverAndReadFalse(User receiver);
}
