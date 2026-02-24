package com.example.taskmanager.dto;

public class DashboardSummaryDTO {

    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;

    public DashboardSummaryDTO(long totalTasks, long completedTasks, long pendingTasks) {
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.pendingTasks = pendingTasks;
    }

    public long getTotalTasks() { return totalTasks; }
    public long getCompletedTasks() { return completedTasks; }
    public long getPendingTasks() { return pendingTasks; }
}