package com.lombard.app.Functions

import com.lombard.app.Repositorys.FilialRepository
import com.lombard.app.Repositorys.Lombard.LoanRepo
import com.lombard.app.StaticData
import com.lombard.app.StaticData.activeLoans
import com.lombard.app.StaticData.log
import com.lombard.app.models.Lombard.Loan
import org.joda.time.DateTime
import java.util.*

/**
 * Created by kaxa on 12/4/16.
 */
class KotlinFunc{

    public fun initData(loanRepo: LoanRepo,filialRepository: FilialRepository){
        var i=0;
        for(filial in filialRepository.findAll()){
            for(loan in loanRepo.findByFilialAndIsActiveOrderByCreateDate(filial,true)){
                i++;
                val date=DateTime(loan.createDate.time)
                if(activeLoans[filial.id]==null) {
                    activeLoans[filial.id] = HashMap<Int,HashMap<Int,HashMap<Int,List<Loan>>>>();
                }
                if(activeLoans[filial.id]!![date.year]==null){
                    activeLoans[filial.id]!![date.year]= HashMap<Int,HashMap<Int,List<Loan>>>()
                }
                if(activeLoans[filial.id]!![date.year]!![date.monthOfYear]==null){
                    activeLoans[filial.id]!![date.year]!![date.monthOfYear]=HashMap<Int,List<Loan>>()
                }
                if(activeLoans[filial.id]!![date.year]!![date.monthOfYear]!![date.dayOfMonth]==null){
                    activeLoans[filial.id]!![date.year]!![date.monthOfYear]!![date.dayOfMonth]==ArrayList<Loan>()
                }
                activeLoans[filial.id]!![date.year]!![date.monthOfYear]!![date.dayOfMonth]!!.add(loan)
            }
        }
        log.info("LoansInHash $i")
    }
}