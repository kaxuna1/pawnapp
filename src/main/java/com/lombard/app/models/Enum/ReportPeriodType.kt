package com.lombard.app.models.Enum

/**
 * Created by kaxa on 12/4/16.
 */
enum class ReportPeriodType (val type:Int){
    LastDay(1),
    LastMonth(2),
    CurrentMonth(3),
    CurrentYear(4),
    LastYear(5),
    CustomFromTo(6),
    ThisYear(7)
}