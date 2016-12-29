package com.lombard.app.controllers

import com.google.gson.JsonParser
import com.lombard.app.Repositorys.Lombard.*
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
import com.lombard.app.models.Lombard.MovementModels.UzrunvelyofaMovement
import com.lombard.app.models.Lombard.TypeEnums.LoanStatusTypes
import com.lombard.app.models.Lombard.TypeEnums.UzrunvelyofaStatusTypes
import com.lombard.app.models.UserManagement.Session
import com.lombard.app.scheduledtasks.ScheduledTasks
import org.joda.time.DateTime
import org.slf4j.LoggerFactory
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
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
                           val paymentRepo: LoanPaymentRepo,
                           val uzrunvelyofaRepo: UzrunvelyofaRepo,
                           val clientsRepo: ClientsRepo) {

    private val log = LoggerFactory.getLogger(LoanControllerKotlin::class.java)


    @GetMapping("/addInterestToLoan/{id}")
    fun getKtData(@PathVariable id: Long, @CookieValue("projectSessionId") sessionId: Long): JsonMessage? {
        val session = sessionRepo.findOne(sessionId)
        val loan = loanRepo.findOne(id)
        loan.addInterest()
        loanRepo.save(loan)
        //StaticData.mapLoan(loan)
        return JsonMessage(JsonReturnCodes.Ok.code, "ok")
    }


    @GetMapping("payUzrunvelyofaSum")
    fun payUzrunvelyofaSum(@CookieValue("projectSessionId") sessionId: Long, id: Long, sum: Float): Any {
        val session = sessionRepo.findOne(sessionId);
        if (session.isIsactive) {
            var uzrunvelyo = uzrunvelyofaRepo.findOne(id);
            if (session.user.filial.id == uzrunvelyo.loan.filial.id) {
                if (uzrunvelyo.leftToPay >= sum && sum > 0) {
                    uzrunvelyo.paySum(sum);
                    uzrunvelyofaRepo.save(uzrunvelyo);
                    return mapOf("code" to JsonReturnCodes.Ok.code)
                } else {
                    return mapOf("code" to JsonReturnCodes.LOGICERROR.code)
                }
            } else {
                return mapOf("code" to JsonReturnCodes.DONTHAVEPERMISSION.code)
            }
        } else {
            return mapOf("code" to JsonReturnCodes.SESSIONEXPIRED.code)
        }
    }

    @GetMapping("payUzrunvelyofaInt")
    fun payUzrunvelyofaInt(@CookieValue("projectSessionId") sessionId: Long, id: Long, sum: Float): Any {
        val session = sessionRepo.findOne(sessionId);
        if (session.isIsactive) {
            var uzrunvelyo = uzrunvelyofaRepo.findOne(id);
            if (session.user.filial.id == uzrunvelyo.loan.filial.id) {
                if (sum > 0) {
                    uzrunvelyo.payInt(sum);
                    uzrunvelyofaRepo.save(uzrunvelyo);
                    return mapOf("code" to JsonReturnCodes.Ok.code)
                } else {
                    return mapOf("code" to JsonReturnCodes.LOGICERROR.code)
                }
            } else {
                return mapOf("code" to JsonReturnCodes.DONTHAVEPERMISSION.code)
            }
        } else {
            return mapOf("code" to JsonReturnCodes.SESSIONEXPIRED.code)
        }
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

                                calLoanDate.time = loan.value.createDate
                                calLoanDate.set(Calendar.HOUR_OF_DAY, 1)
                                calLoanDate.set(Calendar.MINUTE, 1)
                                calLoanDate.set(Calendar.SECOND, 1)
                                calLoanDate.set(Calendar.MILLISECOND, 1)
                                val timeLong: Long = calLoanDate.time.time;
                                if (valMap.containsKey(timeLong)) {
                                    val newVal: Float = (valMap.get(timeLong) as Float) + loan.value.loanSum
                                    valMap.put(timeLong, newVal)
                                } else {
                                    valMap.put(timeLong, loan.value.loanSum)
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

                                calLoanDate.time = payment.value.createDate
                                calLoanDate.set(Calendar.HOUR_OF_DAY, 1)
                                calLoanDate.set(Calendar.MINUTE, 1)
                                calLoanDate.set(Calendar.SECOND, 1)
                                calLoanDate.set(Calendar.MILLISECOND, 1)
                                val timeLong: Long = calLoanDate.time.time;
                                if (valMap.containsKey(timeLong)) {
                                    val newVal: Float = (valMap.get(timeLong) as Float) + payment.value.sum
                                    valMap.put(timeLong, newVal)
                                } else {
                                    valMap.put(timeLong, payment.value.sum)
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

                                calLoanDate.time = interest.value.createDate
                                calLoanDate.set(Calendar.HOUR_OF_DAY, 1)
                                calLoanDate.set(Calendar.MINUTE, 1)
                                calLoanDate.set(Calendar.SECOND, 1)
                                calLoanDate.set(Calendar.MILLISECOND, 1)
                                val timeLong: Long = calLoanDate.time.time;
                                if (valMap.containsKey(timeLong)) {
                                    val newVal: Float = (valMap.get(timeLong) as Float) + interest.value.sum
                                    valMap.put(timeLong, newVal)
                                } else {
                                    valMap.put(timeLong, interest.value.sum)
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
                "loans" to (loanRepo.loansToday(session.user.filial, from, to) ?: 0),
                "interestsMade" to (interestsRepo.interestsTodayMade(session.user.filial, from, to) ?: 0),
                "interestsPay" to (interestsRepo.interestsTodayPay(session.user.filial, from, to) ?: 0),
                "payments" to (paymentRepo.payedToday(session.user.filial, from, to) ?: 0))
    }

    @GetMapping("/getTodayPayLoans")
    fun getTodayPayLoans(@CookieValue("projectSessionId") sessionId: Long): Any {
        val session = sessionRepo.findOne(sessionId);
        val cal: Calendar = Calendar.getInstance() // locale-specific
        cal.time = Date()
        cal.set(Calendar.HOUR_OF_DAY, 0)
        cal.set(Calendar.MINUTE, 0)
        cal.set(Calendar.SECOND, 0)
        val from = cal.time
        val to = DateTime(from).plusDays(1).toDate()
        val statuses = ArrayList<Int>()
        statuses.add(LoanStatusTypes.ACTIVE.code)
        statuses.add(LoanStatusTypes.PAYMENT_LATE.code)
        return loanRepo.findTodayPay(from, to, session.user.filial, statuses);
    }

    @GetMapping("/tt")
    fun tt(@CookieValue("projectSessionId") sessionId: Long): Any {
        val session = sessionRepo.findOne(sessionId);
        return StaticData.getLoansByMonthFromHash(Date(), session.user.filial);
    }

    @GetMapping("/getClientUzrunvelyofa/{id}/{page}")
    fun getClientUzrunvelyofa(@PathVariable("id") id: Long,
                              @PathVariable("page") page: Int,
                              @CookieValue("projectSessionId") sessionId: Long): Any? {
        val session = sessionRepo.findOne(sessionId)
        val client = clientsRepo.findOne(id)
        if (session.user.filial.id == client.filial.id)
            return uzrunvelyofaRepo.findClientsUzrunvelyofa(client, constructPageSpecification(pageIndex = page, size = 10))
        else
            return null
    }

    @GetMapping("/getClientPayments/{id}/{page}")
    fun getClientPayments(@PathVariable("id") id: Long,
                          @PathVariable("page") page: Int,
                          @CookieValue("projectSessionId") sessionId: Long): Any? {
        val session = sessionRepo.findOne(sessionId)
        val client = clientsRepo.findOne(id)
        if (session.user.filial.id == client.filial.id)
            return paymentRepo.findClientPayments(client, constructPageSpecification(pageIndex = page, size = 10))
        else
            return null
    }

    @GetMapping("/getClientProfileInfo/{id}")
    fun getClientProfileInfo(@PathVariable("id") id: Long,
                             @CookieValue("projectSessionId") sessionId: Long): Any {
        val session = sessionRepo.findOne(sessionId)
        val client = clientsRepo.findOne(id)
        return mapOf(
                "loanSum" to (loanRepo.clientLoanSum(client) ?: 0),
                "interestsSum" to (interestsRepo.clientInterest(client) ?: 0),
                "paymentsSum" to (paymentRepo.clientPayments(client) ?: 0),
                "firstLoan" to ((loanRepo.findFirstByClientAndIsActiveOrderByCreateDateAsc(client, true)?.createDate)),
                "unpaied" to (interestsRepo.getUnpaied(client.id) ?: 0)
        )
    }

    @GetMapping("/sendItemsToSell")
    fun sendItemsToSell(@CookieValue("projectSessionId") sessionId: Long, @RequestParam(value = "json") jsonString: String): Any {

        val session = sessionRepo.findOne(sessionId)

        if (!session.isIsactive)
            return mapOf(
                    "message" to "NotLoggedIn",
                    "code" to JsonReturnCodes.NOTLOGGEDIN.code
            )


        val jsonParser = JsonParser()
        val mainObject = jsonParser.parse(jsonString).asJsonArray


        try {
            mainObject.forEach { obj ->
                run {
                    var uzrunvelyofa = uzrunvelyofaRepo.findOne(obj.asLong)
                    uzrunvelyofa.status = UzrunvelyofaStatusTypes.GASAYIDAD_GADAGZAVNILI.code
                    uzrunvelyofaRepo.save(uzrunvelyofa);
                }
            }
            return mapOf(
                    "message" to "OK",
                    "code" to JsonReturnCodes.ERROR.code
            )
        } catch (e: Exception) {
            return mapOf(
                    "message" to e.printStackTrace(),
                    "code" to JsonReturnCodes.ERROR.code
            )
        }

        /*for (i in 0..mainObject.size()){


        }*/

    }

    @PostMapping("/giveClientUz/{id}")
    public fun giveClientUz(@PathVariable("id") id: Long,
                            @CookieValue("projectSessionId") sessionId: Long): Any {


        try {
            val session = sessionRepo.findOne(sessionId);
            var uz = uzrunvelyofaRepo.findOne(id);
            if (session.isIsactive && uz.isActive &&
                    uz.loan.filial.id == session.user.filial.id && ( uz.status == UzrunvelyofaStatusTypes.GATAVISUFLEBULI.code || uz.isReadyToFree)

            ) {
                uz.status = UzrunvelyofaStatusTypes.GATANILI_PATRONIS_MIER.code
                uz.uzrunvelyofaMovements.add(UzrunvelyofaMovement("გადაეცა პატრონს", UzrunvelyofaStatusTypes.GATANILI_PATRONIS_MIER.code, uz))
                uz = uzrunvelyofaRepo.save(uz)
                StaticData.mapLoan(uz.loan);
                return mapOf("code" to JsonReturnCodes.Ok.code, "message" to "OK")
            }
        } catch(e: Exception) {
            e.printStackTrace()
            return mapOf("code" to JsonReturnCodes.ERROR.code, "message" to e.message)
        }
        return false;
    }

    @RequestMapping("/addSumToInterest")
    @ResponseBody
    fun addSumToInterest(@CookieValue("projectSessionId") sessionId: Long,
                         @RequestParam(value = "id", required = true, defaultValue = "0") id: Long,
                         @RequestParam(value = "sum", required = true, defaultValue = "0") sum: Float): Any {

        val session = sessionRepo.findOne(sessionId)
        var uzrunvelyofa = uzrunvelyofaRepo.findOne(id)
        if (session.isIsactive &&
                session.user.filial.id == uzrunvelyofa.loan.filial.id &&
                uzrunvelyofa.status == UzrunvelyofaStatusTypes.DATVIRTULI.code
        ) {
            try {
                uzrunvelyofa.sum = uzrunvelyofa.sum + sum
                uzrunvelyofa.loan.loanSum = uzrunvelyofa.loan.loanSum + sum
                uzrunvelyofaRepo.save(uzrunvelyofa);
                return mapOf("code" to JsonReturnCodes.Ok.code);
            } catch(e: Exception) {
                e.printStackTrace();
                return mapOf("code" to JsonReturnCodes.ERROR.code);
            }
        } else {
            return mapOf("code" to JsonReturnCodes.DONTHAVEPERMISSION.code);
        }

    }

    @RequestMapping("/closeLoanWithPayment/{id}")
    @ResponseBody
    fun closeLoanWithPayment(@CookieValue("projectSessionId") sessionId: Long, @PathVariable("id") id: Long): Any {

        val session = sessionRepo.findOne(sessionId);
        val loan: Loan = loanRepo.findOne(id);
        if (session.isIsactive && loan.filial.id == session.user.filial.id && loan.status == LoanStatusTypes.ACTIVE.code) {
            try {

                loan.uzrunvelyofas.filter {
                    uz->
                    uz.status==UzrunvelyofaStatusTypes.DATVIRTULI.code
                }.forEach {
                    uz ->

                    uz.payInt(uz.interestsLeftToPay)
                    uz.paySum(uz.leftToPay)
                }
                loan.recalculateInterestPayments()

                loanRepo.save(loan);




                return mapOf("code" to JsonReturnCodes.Ok.code)
            } catch(e: Exception) {

                e.printStackTrace()
                return mapOf("code" to JsonReturnCodes.ERROR.code)
            }


        } else {
            return mapOf("code" to JsonReturnCodes.DONTHAVEPERMISSION.code)
        }
    }

    private fun constructPageSpecification(pageIndex: Int, size: Int): Pageable {
        return PageRequest(pageIndex, size)
    }


}