package com.example.taskmanager.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.taskmanager.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.status = 'COMPLETED'")
    List<Task> findCompletedTasks();

    List<Task> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    @Query("SELECT t FROM Task t WHERE t.deadline < CURRENT_DATE AND t.completed = false")
    List<Task> findOverdueTasks();
    @Query("SELECT t.deadline, COUNT(t) FROM Task t GROUP BY t.deadline")
    List<Object[]> countTasksByDeadline();

}