package com.lombard.app.controllers

import com.lombard.app.Repositorys.Lombard.BrandRepo
import com.lombard.app.Repositorys.Lombard.LoanInterestRepo
import com.lombard.app.Repositorys.Lombard.LoanPaymentRepo
import com.lombard.app.Repositorys.Lombard.LoanRepo
import com.lombard.app.Repositorys.SessionRepository
import com.lombard.app.Repositorys.UserRepository
import com.lombard.app.StaticData
import com.lombard.app.StaticData.*
import com.lombard.app.models.Enum.JsonReturnCodes
import com.lombard.app.models.Enum.ReportPeriodType
import com.lombard.app.models.Enum.ReportType
import com.lombard.app.models.JsonMessage
import com.lombard.app.models.Lombard.Dictionary.Brand
import com.lombard.app.models.Lombard.Loan
import com.lombard.app.scheduledtasks.ScheduledTasks
import org.joda.time.DateTime
import org.slf4j.LoggerFactory
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.ThreadLocalRandom

/**
 * Created by kaxa on 12/3/16.
 */

@RestController

class LoanControllerKotlin(val brandRepo: BrandRepo,
                           val loanRepo: LoanRepo,
                           val userRepository: UserRepository,
                           val sessionRepo: SessionRepository,
                           val interestsRepo: LoanInterestRepo,
                           val paymentRepo: LoanPaymentRepo) {

    private val log = LoggerFactory.getLogger(LoanControllerKotlin::class.java)


    @GetMapping("/addInterestToLoan/{id}")
    fun getKtData(@PathVariable id: Long, @CookieValue("projectSessionId") sessionId: Long): JsonMessage? {
        val session = sessionRepo.findOne(sessionId)
        val loan = loanRepo.findOne(id)
        loan.addInterest()
        loanRepo.save(loan)
        return JsonMessage(JsonReturnCodes.Ok.code, "ok")
    }

    @GetMapping("/ktl/{t}")
    fun getkkk(@PathVariable("t") t: String): List<Any> {
        when (t) {
            "b" -> return brandRepo.findAll()
            "s" -> return sessionRepo.findAll()
        }
        return userRepository.findAll();
    }

    @GetMapping("/filialReport/{type}")
    fun filialReport(@PathVariable type: Int, @RequestParam(value = "last", required = true, defaultValue = "1") last: Int,
                     @CookieValue("projectSessionId") sessionId: Long): Any {

        val session = sessionRepo.findOne(sessionId);


        var fromDate: Date = Date();
        val cal: Calendar = Calendar.getInstance() // locale-specific
        cal.time = Date()
        cal.set(Calendar.HOUR_OF_DAY, 0)
        cal.set(Calendar.MINUTE, 0)
        cal.set(Calendar.SECOND, 0)

        cal.set(Calendar.MILLISECOND, 0)
        val toDate = cal.time;

        var valMap: HashMap<Long, Float> = HashMap<Long, Float>();
        var resMap: HashMap<String, Float> = HashMap<String, Float>();

        when (last) {
            ReportPeriodType.LastDay.type -> {
                fromDate = DateTime(toDate.time).minusDays(1).toDate()
            }
            ReportPeriodType.CurrentMonth.type -> {
                cal.set(Calendar.DAY_OF_MONTH, 0);
                fromDate = cal.time
            }
            ReportPeriodType.LastMonth.type -> {
                fromDate = DateTime(toDate.time).minusMonths(1).toDate();
            }
            ReportPeriodType.ThisYear.type -> {
                cal.set(Calendar.DAY_OF_YEAR, 1);
                fromDate = cal.time
            }
        }
        var loansForReport: List<Loan> = ArrayList<Loan>()

        when (type) {
            ReportType.LoansGiven.type -> {
                for (i in DateTime(fromDate.time).year..DateTime(toDate.time).year) {
                    for (monthItem in activeLoans[session.user.filial.id]!![i]!!) {
                        for (dayItem in monthItem.value) {
                            for (loan in dayItem.value) {
                                val calLoanDate: Calendar = Calendar.getInstance()
                                calLoanDate.time = loan.createDate
                                calLoanDate.set(Calendar.HOUR_OF_DAY, 0)
                                calLoanDate.set(Calendar.MINUTE, 0)
                                calLoanDate.set(Calendar.SECOND, 0)
                                calLoanDate.set(Calendar.MILLISECOND, 0)
                                val timeLong: Long = calLoanDate.time.time;
                                if (valMap.containsKey(timeLong)) {
                                    val newVal: Float = (valMap.get(timeLong) as Float) + loan.loanSum
                                    valMap.put(timeLong, newVal)
                                } else {
                                    valMap.put(timeLong, loan.loanSum)
                                }
                            }
                        }
                    }
                }







                /*
                                loansForReport  = loanRepo.findByCreateDateBetween(fromDate,toDate,session.user.filial);
                                for(loan in loansForReport){
                                    val calLoanDate:Calendar = Calendar.getInstance()
                                    calLoanDate.time = loan.createDate
                                    calLoanDate.set(Calendar.HOUR_OF_DAY, 0)
                                    calLoanDate.set(Calendar.MINUTE, 0)
                                    calLoanDate.set(Calendar.SECOND, 0)
                                    calLoanDate.set(Calendar.MILLISECOND, 0)
                                    val  timeLong:Long = calLoanDate.time.time;
                                    if(valMap.containsKey(timeLong)){
                                        val newVal:Float= (valMap.get(timeLong) as Float)+loan.loanSum
                                        valMap.put(timeLong,newVal)
                                    }else{
                                        valMap.put(timeLong,loan.loanSum)
                                    }
                                }*/
                /* for(item in valMap){
                     resMap.put(Date(item.key).toString(dateParser),item.value)
                 }*/

            }
            ReportType.PaymentsGot.type -> {
                for (i in DateTime(fromDate.time).year..DateTime(toDate.time).year) {
                    for (monthItem in activePayments[session.user.filial.id]!![i]!!) {
                        for (dayItem in monthItem.value) {
                            for (payment in dayItem.value) {
                                val calLoanDate: Calendar = Calendar.getInstance()
                                calLoanDate.time = payment.createDate
                                calLoanDate.set(Calendar.HOUR_OF_DAY, 0)
                                calLoanDate.set(Calendar.MINUTE, 0)
                                calLoanDate.set(Calendar.SECOND, 0)
                                calLoanDate.set(Calendar.MILLISECOND, 0)
                                val timeLong: Long = calLoanDate.time.time;
                                if (valMap.containsKey(timeLong)) {
                                    val newVal: Float = (valMap.get(timeLong) as Float) + payment.sum
                                    valMap.put(timeLong, newVal)
                                } else {
                                    valMap.put(timeLong, payment.sum)
                                }
                            }
                        }
                    }
                }
            }
            ReportType.InterestsMade.type -> {
                for (i in DateTime(fromDate.time).year..DateTime(toDate.time).year) {
                    for (monthItem in activeInterests[session.user.filial.id]!![i]!!) {
                        for (dayItem in monthItem.value) {
                            for (interest in dayItem.value) {
                                val calLoanDate: Calendar = Calendar.getInstance()
                                calLoanDate.time = interest.createDate
                                calLoanDate.set(Calendar.HOUR_OF_DAY, 0)
                                calLoanDate.set(Calendar.MINUTE, 0)
                                calLoanDate.set(Calendar.SECOND, 0)
                                calLoanDate.set(Calendar.MILLISECOND, 0)
                                val timeLong: Long = calLoanDate.time.time;
                                if (valMap.containsKey(timeLong)) {
                                    val newVal: Float = (valMap.get(timeLong) as Float) + interest.sum
                                    valMap.put(timeLong, newVal)
                                } else {
                                    valMap.put(timeLong, interest.sum)
                                }
                            }
                        }
                    }
                }
            }
        }
        return valMap;
    }

    @GetMapping("/pop")
    fun pop(): Any {

        var cal: Calendar = Calendar.getInstance()
        val loans: List<Loan> = loanRepo.findByNumber();
        var i = 0L;
        for (loan in loans) {
            i++;
            cal.time = loan.createDate;
            cal.set(Calendar.DAY_OF_MONTH, ThreadLocalRandom.current().nextInt(1, 27 + 1))
            loan.createDate = cal.time
            loanRepo.save(loan);
            log.info("Done $i from ${loans.size}")
        }
        return true;
    }

    @GetMapping("/getTodayData")
    fun getTodayData(@CookieValue("projectSessionId") sessionId: Long): Any {
        val session = sessionRepo.findOne(sessionId);
        val cal: Calendar = Calendar.getInstance() // locale-specific
        cal.time = Date()
        cal.set(Calendar.HOUR_OF_DAY, 0)
        cal.set(Calendar.MINUTE, 0)
        cal.set(Calendar.SECOND, 0)
        val from = cal.time
        val to = DateTime(from).plusDays(1).toDate();
        return mapOf(
                "loans" to loanRepo.loansToday(session.user.filial, from, to),
                "interestsMade" to interestsRepo.interestsTodayMade(session.user.filial,from,to),
                "interestsPay" to interestsRepo.interestsTodayPay(session.user.filial,from,to),
                "payments" to paymentRepo.payedToday(session.user.filial,from,to))
    }
}