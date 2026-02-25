package com.example.taskmanager.dto;

import java.time.LocalDate;

public class DailyProductivityDTO {

    private LocalDate date;
    private Long count;

    public DailyProductivityDTO(LocalDate date, Long count) {
        this.date = date;
        this.count = count;
    }

    public LocalDate getDate() { return date; }
    public Long getCount() { return count; }
}