package com.example.taskmanager.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

import com.example.taskmanager.dto.CategoryAnalyticsDTO;
import com.example.taskmanager.dto.DailyProductivityDTO;
import com.example.taskmanager.dto.DashboardSummaryDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
    @GetMapping("/analytics/daily")
    public List<DailyProductivityDTO> getDailyAnalytics() {
        return taskService.getDailyProductivity();
    }

    @GetMapping("/analytics/category")
    public List<CategoryAnalyticsDTO> getCategoryAnalytics() {
        return taskService.getCategoryAnalytics();
    }

    @GetMapping("/analytics/streak")
    public int getStreak() {
        return taskService.getCurrentStreak();
    }
    
    @GetMapping("/analytics/dashboard")
    public DashboardSummaryDTO getDashboardSummary() {
        return taskService.getDashboardSummary();
    }
    
    @GetMapping("/filter")
    public List<Task> filterByDate(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {

        return taskService.getTasksByDateRange(start, end);
    }
    
    @GetMapping("/paged")
    public Page<Task> getPagedTasks(
            @RequestParam int page,
            @RequestParam int size) {

        return taskService.getTasksWithPagination(page, size);
    }
    
    @GetMapping("/sorted")
    public List<Task> getSortedTasks(@RequestParam String field) {
        return taskService.getTasksSorted(field);
    }
}