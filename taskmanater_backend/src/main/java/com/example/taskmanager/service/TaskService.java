package com.example.taskmanager.service;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.example.taskmanager.dto.DailyProductivityDTO;
import com.example.taskmanager.dto.DashboardSummaryDTO;
import com.example.taskmanager.dto.CategoryAnalyticsDTO;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        task.setStatus("PENDING");
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setCategory(updatedTask.getCategory());
        task.setStatus(updatedTask.getStatus());

        if ("COMPLETED".equals(updatedTask.getStatus())) {
            task.setCompletedAt(LocalDateTime.now());
        }

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
    public List<DailyProductivityDTO> getDailyProductivity() {

        List<Task> completedTasks = taskRepository.findAll()
                .stream()
                .filter(task -> "COMPLETED".equals(task.getStatus()))
                .toList();

        Map<LocalDate, Long> grouped =
                completedTasks.stream()
                        .collect(Collectors.groupingBy(
                                task -> task.getCompletedAt().toLocalDate(),
                                Collectors.counting()
                        ));

        return grouped.entrySet()
                .stream()
                .map(entry -> new DailyProductivityDTO(entry.getKey(), entry.getValue()))
                .toList();
    }
    public List<CategoryAnalyticsDTO> getCategoryAnalytics() {

        List<Task> completedTasks = taskRepository.findAll()
                .stream()
                .filter(task -> "COMPLETED".equals(task.getStatus()))
                .toList();

        Map<String, Long> grouped =
                completedTasks.stream()
                        .collect(Collectors.groupingBy(
                                Task::getCategory,
                                Collectors.counting()
                        ));

        return grouped.entrySet()
                .stream()
                .map(entry -> new CategoryAnalyticsDTO(entry.getKey(), entry.getValue()))
                .toList();
    }
    public int getCurrentStreak() {

        List<LocalDate> dates = taskRepository.findAll()
                .stream()
                .filter(task -> "COMPLETED".equals(task.getStatus()))
                .map(task -> task.getCompletedAt().toLocalDate())
                .distinct()
                .sorted((d1, d2) -> d2.compareTo(d1))
                .toList();

        int streak = 0;
        LocalDate today = LocalDate.now();

        for (LocalDate date : dates) {
            if (date.equals(today.minusDays(streak))) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }
        
        public DashboardSummaryDTO getDashboardSummary() {

            long total = taskRepository.count();

            long completed = taskRepository.findAll()
                    .stream()
                    .filter(task -> "COMPLETED".equals(task.getStatus()))
                    .count();

            long pending = total - completed;

            return new DashboardSummaryDTO(total, completed, pending);
        }
        public List<Task> getTasksByDateRange(LocalDateTime start, LocalDateTime end) {
            return taskRepository.findByCreatedAtBetween(start, end);
        }
        
        public Page<Task> getTasksWithPagination(int page, int size) {

            Pageable pageable = PageRequest.of(page, size);

            return taskRepository.findAll(pageable);
        }
        public List<Task> getTasksSorted(String field) {

            return taskRepository.findAll(Sort.by(Sort.Direction.ASC, field));
        }
    }